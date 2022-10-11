import React, {useEffect, useState} from "react";
import {Toolbar} from "@mui/material";
import {useAlert} from "react-alert";
import UserDataComponent from "./user.data.component";
import {getAllUser, updateUser,addUser, deleteUser} from "../services/user.service";
import LoadingIndicatorComponent from "../../../../../utilities/loading.indicator.component";

const UsersComponent = () => {

    const alert = useAlert();

    const [usersData, setUsersData] = useState([]);
    const [page, setPage] = useState(0);

    const [loading, isLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [refresh, isRefresh] = useState(false);

    const toggleRefresh = () => {

        isRefresh(prevState => !prevState)

    }

    const handlePageChange = (newPage) =>{

        setPage(newPage)

    }

    const updateUserData = (user) => {

        setLoadingText("Saving...");
        isLoading(true);

        updateUser(user).then(
            () => {

                isLoading(false);
                toggleRefresh();
            }
        ).catch(err => {

            isLoading(false);
            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

    })
    }

    const addNewUserData = (user) => {

        setLoadingText("Saving...");
        isLoading(true);

        addUser(user).then(
            () => {
                isLoading(false);
                toggleRefresh();
            }
        ).catch(err => {
            isLoading(false);

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        })



    }

    const deleteUserData = (id) => {

        isLoading(true);

        deleteUser(id).then(
            () => {
                setLoadingText("Deleting...");
                isLoading(false);
                toggleRefresh();
            }
        ).catch(err => {
            isLoading(false);

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        })



    }

    useEffect(() => {

        getAllUser(page).then(
            (response) => {
                setUsersData(response.data)
            }
        ).catch(err => {

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        });

    }, [page, refresh])

    return (
        <div className='flex flex-col p-6 w-full'>
            <Toolbar
                variant='dense'/>
            <UserDataComponent
                usersData = {usersData}
                changePage ={handlePageChange}
                saveUser = {addNewUserData}
                updateUser = {updateUserData}
                deleteUser = {deleteUserData}
            />

            <LoadingIndicatorComponent open = {loading} text = {loadingText}/>

        </div>
    )

}

export default UsersComponent