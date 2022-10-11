import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider, FormControl,
    IconButton,
    InputAdornment, InputLabel, MenuItem, Select,
    Stack,
    Switch,
    TextField
} from "@mui/material";
import Denominations from "../framework/denominations";
import LoadingButton from "@mui/lab/LoadingButton";
import {getNewTransaction, printAirtime} from "../services/transaction.service";
import {useAlert} from "react-alert";

const NewTransactionDialog = (props) => {

    const alert = useAlert();

    const {handleOnClose} = props;
    const [loading, isButtonLoading] = useState(false);

    const [transactionRequest, setTransactionRequest] = useState({
        amount: '',
        denomination: ''
    });

    const handleOnChange = (event) => {

        let name = "" + event.target.name;

        setTransactionRequest(prevState => {

            return {
                ...prevState,
                [name] : event.target.value

            }
        })

    }

    const createTransaction = (newTransactionRequest) => {

        isButtonLoading(true);

        getNewTransaction(newTransactionRequest).then(
            () => {
                isButtonLoading(false);
                handleOnClose();
                alert.success("Transaction has been queued.");
            }
        ).catch(err => {

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

            isButtonLoading(false);
        });

    }

return(
    <Dialog
    onClose={handleOnClose}
    maxWidth='xs'
    open={true}>
    <DialogTitle
        sx ={{
            backgroundColor: '#f5f5f5'
        }}
    >New Transaction</DialogTitle>

    <DialogContent>

        <Stack

            sx ={{
                marginTop : '16px'
            }}
        >

            <FormControl
                size = 'small'
            >
                <InputLabel id="denomination">Denomination</InputLabel>

                <Select
                    labelId='denomination'
                    name='denomination'
                    onChange={handleOnChange}
                    value={transactionRequest.denomination}
                    label= 'Denomination'>

                    {Denominations.map(denomination => <MenuItem value = {denomination.value} key = {denomination.label} name = {denomination.label}>
                        {denomination.label}</MenuItem>)
                    }

                </Select>

            </FormControl>

            <TextField
                onChange={handleOnChange}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={transactionRequest.amount}
                label='Amount'
                name='amount'
                size="small"
                margin='normal'
                className='w-[250px]'
            />
            
        </Stack>
    </DialogContent>

    <DialogActions

        sx ={{
            backgroundColor: '#fcfcfc'
        }}

    >
            <LoadingButton
                loading = {loading}
                onClick= {() => {
                    createTransaction(transactionRequest)
                }}

                sx = {{
                    marginRight: '8px'
                }}
            >
                Proceed

            </LoadingButton>

            <Button
                onClick= {handleOnClose}
            >
                CANCEL
            </Button>
        
    </DialogActions>

</Dialog>)

}

export default NewTransactionDialog