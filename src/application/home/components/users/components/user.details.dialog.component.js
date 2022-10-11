import React, {useState} from "react";
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider,
    IconButton, InputAdornment,
    Stack, Switch,
    TextField
} from "@mui/material";
import {TrashIcon} from "@heroicons/react/24/solid";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

const UserDetailsDialogComponent = (props) => {

    const {open, toggleDialog, saveUser, user, action, deleteUser} = props;

    const [_user, _setUser] = useState(action === 'edit'? user : {});

    const [isShowPassword, setShowPassword] = React.useState(false);

    const [edit, canEdit] = useState(false);
    const [deleteDialog, openDeleteDialog] = useState(false);
    const handleIconMouseDownEvent= () => {
        setShowPassword(true);
    }

    const handleIconMouseUpEvent= () => {
        setShowPassword(false);
    }

    const toggleDeleteDialog = () => {

        openDeleteDialog(prevState => !prevState)

    }

    const allowEdit = () => {

        canEdit(true)

    }

    const handleOnChange = (event) => {

        _setUser(
            prevState => {

                return  {
                    ...prevState,
                    [event.target.name] : event.target.value
                }

            });
    }

    const handleOnSwitchChanges = (event) => {

        _setUser(
            prevState => {

                return  {
                    ...prevState,
                    enabled : event.target.checked
                }

            });
    }

    return(
        <Dialog
            onClose={toggleDialog}
            maxWidth='xs'
            open={open}>
            <DialogTitle
                sx ={{
                    backgroundColor: '#f5f5f5'
                }}
            >{action === 'edit' ? user.name : 'New User'}</DialogTitle>

            <DialogContent>

                <Stack>
                    <div className='flex items-center h-[50px]'>
                        <h5 className='w-[130px]'>Active: </h5>
                        <Switch
                            sx = {{
                                marginLeft: 'auto'
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                            disabled={!edit}
                            checked={action === 'edit' ? _user.enabled : true}
                            onChange={handleOnSwitchChanges} color='success'/>
                    </div>

                        <TextField
                            InputProps={{
                                readOnly: !edit && action === 'edit',
                            }}
                            onChange={handleOnChange}
                            value={_user.firstName}
                            label='First Name'
                            name='firstName'
                            size="small"
                            margin='normal'
                            className='w-[250px]'
                        />

                        <TextField
                            InputProps={{
                                readOnly: !edit && action === 'edit',
                            }}
                            onChange={handleOnChange}
                            value={_user.lastName}
                            label='Last Name'
                            name='lastName'
                            size="small"
                            margin='normal'
                            className='w-[250px]'
                        />

                    <Divider sx ={{
                        marginTop : '10px'
                    }}/>

                        <TextField
                            InputProps={{
                                readOnly: action === 'edit',
                            }}
                            value={_user.username}
                            onChange={handleOnChange}
                            label='Username'
                            name='username'
                            size="small"
                            margin='normal'
                            className='w-[250px]'
                        />

                    { action === 'new' && <div className='flex flex-col'>

                        <TextField
                            label="Password"
                            name='password'
                            value={_user?.password}
                            size="small"
                            onChange={handleOnChange}
                            type={isShowPassword ? 'text' : 'password'}
                            margin='normal'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">

                                    <IconButton

                                        size='small'
                                        onMouseDown={handleIconMouseDownEvent}
                                        onMouseUp={handleIconMouseUpEvent}

                                    >
                                        {isShowPassword ?
                                            <EyeSlashIcon className='w-5 h-5'/> : <EyeIcon className='w-5 h-5'/> }
                                    </IconButton>

                                </InputAdornment>
                            }}
                            className='w-[250px]'
                        />

                        <TextField
                            label="Confirm Password"
                            name='confirmPassword'
                            value={_user?.confirmPassword}
                            size="small"
                            onChange={handleOnChange}
                            type={isShowPassword ? 'text' : 'password'}
                            margin='normal'
                            className='w-[250px]'
                        />
                    </div>}


                </Stack>
            </DialogContent>

            <DialogActions

                sx ={{
                    backgroundColor: '#fcfcfc'
                }}

            >
                {action === 'edit' &&
                <div className='mr-auto'>
                    <IconButton onClick={toggleDeleteDialog}>
                        <TrashIcon className={'w-5 h-5 text-red-700'}/>
                    </IconButton>
                </div>
                }
                <div>
                    <Button
                        onClick= {!edit && action === 'edit' ? allowEdit : () => {
                            saveUser(_user);
                            toggleDialog();
                        }}

                            sx = {{
                                marginRight: '8px'
                            }}
                    >
                        {edit || action === 'new' ? 'SAVE' : 'EDIT'}

                    </Button>

                    <Button
                        onClick={() =>
                        {
                            toggleDialog();
                        }}
                    >
                        CANCEL
                    </Button>

                </div>

            </DialogActions>

            {deleteDialog &&

            <Dialog
                maxWidth='xs'
                open={deleteDialog}
                keepMounted
            >
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    <Box
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >

                        <DialogContentText>
                            <span>Do you want to delete <span className='font-semibold'>{user.name}</span>?</span>
                        </DialogContentText>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleDeleteDialog}>NO</Button>
                    <Button onClick={() => {
                        deleteUser(user.id)
                        toggleDeleteDialog();
                        toggleDialog();
                    }}>YES</Button>
                </DialogActions>
            </Dialog>}

        </Dialog>
    )

}

export default UserDetailsDialogComponent