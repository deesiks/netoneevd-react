import React from "react";
import {
    Box, Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
} from "@mui/material";
import AirtimeDataComponent from "./airtime.data.component";
import {useAlert} from "react-alert";
import {useEffect, useState} from "react";
import {getAirtime} from "../services/transaction.service";
import ErrorsComponent from "./errors.component";

const PrintComponent = (props) => {

    const {open, handleClose, print, selected} = props;

    const alert = useAlert();

    const [airtimeData, setAirtimeData] = useState([]);

    const [skeletonData, setSkeletonData] = useState( {  content: [
            {id:1},
            {id:2},
            {id:3}
        ],
        totalPages:1,
        number:1

    });

    const [fetching, isFetching] = useState(true);
    const [openErrors,isErrorsOpen] = useState(false);

    const toggleOpenErrors = () => {

        isErrorsOpen(prevState => !prevState)

    }


    const [page, setPage] = useState(0);

    const handlePageChange = (event, newPage) =>{

        setPage(newPage);

    }

    useEffect(() => {

        isFetching(true)

        getAirtime(selected.id, page).then(
            response => {
                isFetching(false);
                setSkeletonData(prev => {
                    return {
                        ...prev,

                        totalPages: response.data.totalPages,
                        number: response.data.number
                    }
                })

                setAirtimeData(response.data);

            }
        ).catch(err => {
            isFetching(false)
            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        });

    },[page, selected.id])


    return (

        <Dialog
            maxWidth='xl'
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Transaction - {selected.amount}</DialogTitle>
            <DialogContent>
               <Box
                   noValidate
                   sx={{
                       display: 'flex',
                       flexDirection: 'column',
                       m: 'auto',
                       width: {
                           md: '600px',
                           xs: 'fit-content'
                       }
                   }}
               >
                   <AirtimeDataComponent

                       airtimeData = {fetching ?  skeletonData : airtimeData}
                       changePage = {handlePageChange}
                       fetching = {fetching}

                   />

               </Box>

            </DialogContent>
            <DialogActions>

                <div className= {` ${selected.errors ? 'mr-auto' : 'hidden'  }`}>
                    <Button color='error' onClick={toggleOpenErrors}>ERRORS</Button>
                </div>

                <div>
                    <Button onClick={handleClose}>CLOSE</Button>
                    <Button onClick={print}>Print</Button>
                </div>

            </DialogActions>

            <ErrorsComponent

                open = {openErrors}
                errors = {selected.errors}
                handleClose = {toggleOpenErrors}

            />
        </Dialog>

    )

}

export default PrintComponent