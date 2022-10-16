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
                <Button onClick={handleClose}>CLOSE</Button>
                <Button onClick={print}>Print</Button>
            </DialogActions>
        </Dialog>

    )

}

export default PrintComponent