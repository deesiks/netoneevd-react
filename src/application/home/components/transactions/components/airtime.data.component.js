import React from "react";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const AirtimeDataComponent = (props) => {

    const {airtimeData, changePage, fetching} = props;

    const columns = [
        { id: 'serialNumber', label: 'Serial Number', minWidth: 150 },
        { id: 'rechargeID', label: 'Recharge ID', minWidth: 100 },
        { id: 'pin', label: 'Pin', minWidth: 100 },
        { id: 'amount', label: 'Amount', minWidth: 100, align: 'center'},
    ];

    return (<div

        className='h-[500px]'
    >

        <div className='flex items-center justify-center px-2 pt-2 mb-2'>
            <div className='ml-auto flex items-center'>
                <Pagination size = 'small' showFirstButton showLastButton count={airtimeData.totalPages ? airtimeData.totalPages : 0 }
                            page={ airtimeData.totalPages !== 0 ? airtimeData.number + 1 : 0} onChange={changePage}
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

                {airtimeData.content && <TableBody>
                    {airtimeData.content
                        .map((transaction) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={transaction.id}>
                                    {columns.map((column) => {
                                        const value = fetching ? '' : transaction[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {fetching ? <Skeleton/> : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>}

            </Table>
        </TableContainer>
    </div>)

}


export default AirtimeDataComponent