import React from "react";
import {useAlert} from "react-alert";
import {useEffect, useState} from "react";
import {Toolbar} from "@mui/material";
import TransactionDataComponent from "./transaction.data.component";
import {getAllTransactions} from "../services/transaction.service";
import {connectAndSubscribe} from "../../../../../utilities/websocket.service";

const TransactionsComponent = () => {

    const alert = useAlert();

    const [transactionsData, setTransactionsData] = useState({
        totalPages:1,
        number:1
    });

    const [skeletonTransactionData, setSkeletonData] = useState( {  content: [
            {id:1},
            {id:2},
            {id:3}
        ],
        totalPages:1,
        number:1

    });

    const [page, setPage] = useState(1);
    const [refresh, isRefresh] = useState(false);
    const [fetching, isFetching] = useState(true);

    const toggleRefresh = () => {

        isRefresh(prevState => !prevState)

    }

    const handlePageChange = (newPage) =>{

        setPage(newPage)

    }

    const giveColor = (transaction) => {

        if (transaction.passed === transaction.denominationCount){
            return {
                ...transaction,
                color: 'success',
            };
        }

        if(transaction.passed === 0){
            return {
                ...transaction,
                color: 'error'
            };
        }

        if(transaction.passed < transaction.denominationCount){
            return {
                ...transaction,
                color: 'warning'
            };
        }

    }

    const giveColorOnMessage = (status) => {

        if (status === "PENDING"){
            return 'default'
        }

        if (status === "INCOMPLETE"){
            return 'warning'
        }

        if (status === "ERROR"){
            return 'error'
        }

        if (status === "DONE"){
            return 'success'
        }

    }

    const connectForNotification = (data) => {

        const endpoint = "/opn/v1/notifications/airtime";

        connectAndSubscribe(endpoint, "/user/topic/airtime",

            () => {
                setTransactionsData(prevState => {

                    const newContent = data.content.map(transaction => {

                        if(transaction.onGoing === true){
                            transaction = {
                                ...transaction,
                                onGoing: false,
                            }
                        }

                        return transaction;

                    })

                    return (
                        {
                            ...prevState,
                            content : newContent
                        }
                    )

                })
                alert.info("Reconnecting...");

            },

            (message) =>{

            const body = JSON.parse(message.body)

                setTransactionsData(prevState => {

                    const transaction = data.content
                        .find( transaction => transaction.id === body.id );

                    if (transaction === null){
                        return ;
                    }

                    const newContent = data.content.map(transaction => {

                        if(transaction.id === body.id){
                            transaction = {
                                ...transaction,
                                passed: body.passed,
                                color: giveColorOnMessage(body.status)
                            }
                        }

                        return transaction;

                    })

                    return (
                        {
                            ...prevState,
                            content : newContent
                        }
                    )

                })

            }

        )

    }

    useEffect(() => {

        isFetching(true)

        getAllTransactions(page).then(
            response => {

                const newTransactions = response.data.content.map(trans => giveColor(trans));
                setSkeletonData(prev => {
                    return {
                        ...prev,

                        totalPages: response.data.totalPages,
                        number: response.data.number
                    }
                })

                const newData = {
                    ...response.data,
                    content : newTransactions
                }
                setTransactionsData(newData);
                connectForNotification(newData);
                isFetching(false)
            }
        ).catch(err => {
            isFetching(false)
            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        });

    },[page, refresh])


    return (

        <div className='flex flex-col p-6 w-full'>
            <Toolbar
                variant='dense'/>
            <TransactionDataComponent
                transactionData = {fetching ? skeletonTransactionData : transactionsData}
                changePage ={handlePageChange}
                refresh = {toggleRefresh}
                fetching = {fetching}
            />
        </div>
    )
}

export default TransactionsComponent