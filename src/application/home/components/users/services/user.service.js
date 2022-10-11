import React from "react";
import axiosInstance from "../../../../../utilities/axios.service";

const USER_URL = '/admin/v1/users';

const getLoggedInUser = () => {

    return axiosInstance.get(`${USER_URL}/my-account`)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })
}

const getAllUser = (pageNumber) => {

    return axiosInstance.get(`${USER_URL}?page=${pageNumber}&size=20`)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })
}

const updateUser = (user) => {

    return axiosInstance.post(`${USER_URL}/${user.id}`, user)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })
}

const addUser = (user) => {

    return axiosInstance.post(`${USER_URL}`, user)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })
}

const deleteUser = (id) => {

    return axiosInstance.delete(`${USER_URL}/${id}`)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err
        })
}

export {getAllUser, updateUser, addUser, deleteUser, getLoggedInUser}