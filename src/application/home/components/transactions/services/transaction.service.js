import React from "react";
import axiosInstance from "../../../../../utilities/axios.service";

const TRANSACTION_URL = '/admin/v1/transactions';
const AIRTIME_URL = '/admin/v1/transactions/{id}/airtime';
const AIRTIME_TICKET_URL = '/admin/v1/tickets/transaction/{id}';
const NEW_AIRTIME_TICKET_URL = '/admin/v1/tickets/transaction/generate/{id}';
const BACK_COVER_URL = '/admin/v1/tickets/back-cover';

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

const printSavedAirtime = (transactionId) => {

    return axiosInstance.get(`${NEW_AIRTIME_TICKET_URL.replace('{id}',transactionId)}`, {responseType: 'blob'})
        .then(response => {
            fileDownload(response.data, 'airtime.pdf');
            return true;
        })
        .catch(err => {
            throw err
        })

}

const printBackCover = () => {

    return axiosInstance.get(BACK_COVER_URL, {responseType: 'blob'})
        .then(response => {
            fileDownload(response.data, 'backcovers.pdf');
            return true;
        })
        .catch(err => {
            throw err
        })

}

const getNewTransaction  = (newTransaction) => {

    return axiosInstance.post(TRANSACTION_URL, newTransaction)
        .then(response => {
            return response
            }
        )
        .catch(err => {
            throw err
        })


}

export {getAllTransactions, getAirtime, printAirtime, getNewTransaction, printBackCover, printSavedAirtime}