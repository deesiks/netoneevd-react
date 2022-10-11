import React from "react";
import {Stack, Snackbar, Portal} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

export default function AlertTemplate(props) {

    const {options, message} = props;

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <Portal>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open}
                      anchorOrigin={{ vertical : 'bottom', horizontal: 'center' }}
                      autoHideDuration={2000} onClose={handleClose}>
                <MuiAlert variant="filled" severity={options.type} sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </Stack>
        </Portal>
    );
}