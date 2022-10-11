import React from "react";
import axiosInstance from "../../../../../utilities/axios.service";

const TRANSACTION_URL = '/admin/v1/transactions';
const AIRTIME_URL = '/admin/v1/transactions/{id}/airtime'
const AIRTIME_TICKET_URL = '/admin/v1/tickets/transaction/{id}'
import fileDownload from "js-file-download";

const getAllTransactions = (pageNumber) => {

    let newPageNumber = pageNumber - 1;

    return axiosInstance.get(`${TRANSACTION_URL}?page=${newPageNumber}&size=20`)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })

}

const getAirtime = (id, pageNumber) => {

    let newPageNumber = pageNumber - 1;

    return axiosInstance.get(`${AIRTIME_URL.replace('{id}', id)}?page=${newPageNumber}&size=20`)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })

}

const printAirtime = (transactionId) => {

    return axiosInstance.get(`${AIRTIME_TICKET_URL.replace('{id}',transactionId)}`, {responseType: 'blob'})
        .then(response => {
            fileDownload(response.data, 'airtime.pdf');
            return true;
        })
        .catch(err => {
            throw err
        })

}

const greatNewTransaction  = () => {



}

export {getAllTransactions, getAirtime, printAirtime}