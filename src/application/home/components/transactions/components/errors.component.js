import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";

const ErrorsComponent = (props) =>{

    const {errors, open, handleClose} = props;

    const columns = [
        { id: 'timestamp', label: 'Timestamp', width: 100 },
        { id: 'message', label: 'Error', minWidth: 150, align: 'left'}
    ];

    return (

        <Dialog
            maxWidth='xl'
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Errors</DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        height: '300px',
                        width: {
                            md: '600px',
                            xs: 'fit-content'
                        }
                    }}
                >

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

                            {errors && <TableBody>
                                {errors
                                    .map((transaction) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={transaction.id}>
                                                {columns.map((column) => {
                                                    const value = errors[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>}

                        </Table>
                    </TableContainer>


                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
            </DialogActions>
        </Dialog>
    )

}

export default ErrorsComponent