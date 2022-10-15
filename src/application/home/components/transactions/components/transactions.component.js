import React from "react";
import {useAlert} from "react-alert";
import {useEffect, useState} from "react";
import {Toolbar} from "@mui/material";
import TransactionDataComponent from "./transaction.data.component";
import {getAllTransactions} from "../services/transaction.service";
import {connectAndSubscribe} from "../../../../../utilities/websocket.service";

const TransactionsComponent = () => {

    const alert = useAlert();

    const [transactionsData, setTransactionsData] = useState([]);

    const [page, setPage] = useState(1);
    const [refresh, isRefresh] = useState(false);

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
                                color: giveColorOnMessage(body.status),
                                onGoing: transaction.passed !== transaction.denominationCount
                            }
                        }

                        if(transaction.id !== body.id){
                            transaction = {
                                ...transaction,
                                onGoing: false
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

        getAllTransactions(page).then(
            response => {

                const newTransactions = response.data.content.map(trans => giveColor(trans));

                const newData = {
                    ...response.data,
                    content : newTransactions
                }
                setTransactionsData(newData);
                connectForNotification(newData);
            }
        ).catch(err => {

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
                transactionData = {transactionsData}
                changePage ={handlePageChange}
                refresh = {toggleRefresh}
            />
        </div>
    )
}

export default TransactionsComponent