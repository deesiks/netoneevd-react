import React, {useState} from "react";
import {
    Chip, IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import UserDetailsDialogComponent from "./user.details.dialog.component";
import {UserPlusIcon} from "@heroicons/react/24/solid";

const UserDataComponent = (props) => {

   const {usersData, changePage, updateUser, saveUser, deleteUser} = props;

   const [openUserDataDialog, isUserDataDialogOpen] = useState(false);

   const [selected, setSelected] = useState(null);

   const [action, setAction] = useState('edit');

   const openNewUserDialog = () => {

       setAction('new');
       toggleUserDataDialog();

   }

   const toggleUserDataDialog = () => {
       isUserDataDialogOpen(prevState => !prevState);
   }

    const handleChangePage = (event, newPage) => {
        changePage(newPage - 1)

    };

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

    const modifyData = (user) => {

        user = {
            ...user,
            name : `${user.firstName} ${user.lastName}`,
            status : user.enabled ? 'ACTIVE' : 'INACTIVE'
        }

        return user;
    }

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
                        <IconButton onClick={openNewUserDialog}>
                            <UserPlusIcon className='w-5 h-5'/>
                        </IconButton>
                    </div>

                    <div className='ml-auto flex items-center'>
                        <Pagination showFirstButton showLastButton count={usersData.totalPages ? usersData.totalPages : 0 }
                                    page={ usersData.totalPages || usersData.totalPages !== 0 ? usersData.number + 1 : 0} onChange={handleChangePage}
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

                            {usersData.content && <TableBody>
                                {usersData.content.map((user) => modifyData(user))
                                    .map((user) => {
                                        return (
                                            user.role !== 'SUPER_ADMIN' &&
                                            <TableRow hover role="checkbox" tabIndex={-1} key={user.id}

                                                      onClick={() => {
                                                          setSelected(user);
                                                          setAction('edit');
                                                          toggleUserDataDialog();
                                                      }}

                                            >
                                                {columns.map((column) => {
                                                    const value = user[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'status' ?
                                                                <Chip
                                                                    label={user.status}
                                                                    color={user.enabled ? 'success' : 'error'}
                                                                    size='small'
                                                                    variant='outlined'
                                                                /> : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>}

                        </Table>
                    </TableContainer>

            </Paper>

            {openUserDataDialog && <UserDetailsDialogComponent
                action = {action}
                open ={openUserDataDialog}
                user = {selected}
                deleteUser = {deleteUser}
                saveUser = {action === 'edit' ? updateUser : saveUser}
                toggleDialog = {toggleUserDataDialog}/>}

        </div>)
}

export default UserDataComponent