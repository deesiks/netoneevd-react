import React from "react";
import {useAlert} from "react-alert";
import {useEffect, useState} from "react";
import {Toolbar} from "@mui/material";
import TransactionDataComponent from "./transaction.data.component";
import {getAllTransactions} from "../services/transaction.service";

const TransactionsComponent = () => {

    const alert = useAlert();

    const [transactionsData, setTransactionsData] = useState([]);

    const [page, setPage] = useState(1);

    const handlePageChange = (newPage) =>{

        setPage(newPage)

    }

    useEffect(() => {

        getAllTransactions(page).then(
            response => {
                setTransactionsData(response.data);
            }
        ).catch(err => {

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        });

    },[page])


    return (

        <div className='flex flex-col p-6 w-full'>
            <Toolbar
                variant='dense'/>
            <TransactionDataComponent
                transactionData = {transactionsData}
                changePage ={handlePageChange}
            />
        </div>
    )
}

export default TransactionsComponent