import React from 'react'
import {
    Chip,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {PlusIcon, ArrowDownTrayIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import PrintComponent from "./print.component";
import {printAirtime, printBackCover} from "../services/transaction.service";
import LoadingIndicatorComponent from "../../../../../utilities/loading.indicator.component";
import NewTransactionDialog from "./new.transaction.dialog";
import {useAlert} from "react-alert";
import Skeleton from '@mui/material/Skeleton';

const TransactionDataComponent = (props) => {

    const alert = useAlert();

    const {transactionData, changePage, refresh, fetching} = props;
    const [openPrintTransactionDialog, isPrintTransactionDialogOpen] = useState(false);
    const [openNewTransactionDialog, isNewTransactionDialogOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [printLoading, isPrintLoading] = useState(false);

    const openTransactionDialog = () => {

        toggleTransactionDataDialog();

    }

    const openNewTransaction = () => {

        toggleNewTransactionDataDialog();

    }

    const toggleNewTransactionDataDialog = () => {
        isNewTransactionDialogOpen(prevState => !prevState);
    }

    const toggleTransactionDataDialog = () => {
        isPrintTransactionDialogOpen(prevState => !prevState);
    }
    const handleChangePage = (event, newPage) => {
        changePage(newPage)

    };

    const print = () => {

        toggleTransactionDataDialog();
        isPrintLoading(true);

            printAirtime(selected.id).then(
                () => {
                    isPrintLoading(false);
                }
            ).catch(err => {

                if (!err.response.data.message){
                    alert.error(err.message);
                }else{
                    alert.error(err.response.data.message);
                }

                isPrintLoading(false);
            });
    }

    const printBackCovers = () => {

        isPrintLoading(true);

        printBackCover().then(
            () => {
                isPrintLoading(false);
            }
        ).catch(err => {

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

            isPrintLoading(false);
        });

    }

    const columns = [
        { id: 'transactionDate', label: 'Date', minWidth: 150 },
        { id: 'amount', label: 'Amount', minWidth: 100, align: 'right' },
        { id: 'denomination', label: 'Denomination', minWidth: 150, align: 'right'},
        {
            id: 'denominationCount',
            label: 'Count',
            minWidth: 180,
            align: 'center',
        },
        {
            id: 'passed',
            label: 'Success',
            minWidth: 150,
            align: 'center'
        }
    ];

    return (
        <div className='w-full h-full'>
            <Paper
                elevation={1}
                sx = {{
                    width: '100%',
                    background: '#FCFCFC',
                    height: 'calc(100% - 20px)',
                    paddingBottom: '8px'
                }}
            >

                <div className='flex items-center justify-center px-2 pt-2 mb-2'>

                    <div>
                        <IconButton onClick={openNewTransaction}>
                            <PlusIcon className='w-5 h-5'/>
                        </IconButton>

                        <IconButton onClick={printBackCovers}>
                            <ArrowDownTrayIcon className='w-5 h-5'/>
                        </IconButton>

                    </div>

                    <div className='ml-auto flex items-center'>
                        <Pagination showFirstButton showLastButton count={transactionData?.totalPages ? transactionData.totalPages : 0 }
                                    page={transactionData?.totalPages !== 0 ? transactionData?.number + 1 : 0} onChange={handleChangePage}
                        />
                    </div>

                </div>

                <TableContainer sx={{ height: 'calc(100% - 50px)'}} >
                    <Table stickyHeader aria-label="sticky table" size='small'>
                        <TableHead
                            sx ={{
                                backgroundColor: "#222222"
                            }}
                        >
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <span className='font-semibold'>{column.label}</span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {transactionData.content && <TableBody>
                            {transactionData.content
                                .map((transaction) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={transaction.id}

                                                  onClick={() => {
                                                      setSelected(transaction);
                                                      toggleTransactionDataDialog();
                                                  }}
                                        >
                                            {columns.map((column) => {
                                               const value = fetching? '': transaction[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        { !fetching && ( column.id === "passed" ?

                                                            <Chip label={value} color={transaction.color}

                                                                  sx ={{
                                                                      width: '60px'
                                                                  }}

                                                            /> : value)}



                                                        {fetching && <Skeleton/>}

                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>}

                    </Table>
                </TableContainer>

                {openPrintTransactionDialog &&
                    <PrintComponent
                        selected = {selected}
                        print = {print}
                        open = {openPrintTransactionDialog}
                        handleClose = {toggleTransactionDataDialog}
                    />}

                {openNewTransactionDialog &&
                <NewTransactionDialog
                    handleOnClose = {toggleNewTransactionDataDialog}
                    refresh = {refresh}
                  />}

                <LoadingIndicatorComponent open = {printLoading} text = {'Downloading...'}/>

            </Paper>
    </div>
    )

}

export default TransactionDataComponent