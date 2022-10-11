import React from "react";
import {Box, CircularProgress, Dialog, DialogContent, Modal} from "@mui/material";

const LoadingIndicatorComponent = (props) => {

    const {open, text} = props;

    return(
    
    <Dialog
        keepMounted
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
     >

        <DialogContent

            sx = {{
                display: 'flex',
                justifyItems: 'center',
            }}
        >
            <div className='flex flex-col items-center w-[300px] h-[100px]'>
                <CircularProgress />
                <div className='mt-4'>
                    {text ? text : 'Loading'}
                </div>
            </div>
        </DialogContent>




    </Dialog>)


}

export default LoadingIndicatorComponent