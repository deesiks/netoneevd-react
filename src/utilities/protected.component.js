import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import localStorageService from "../utilities/local.storage.service"
import jwt_decode from "jwt-decode";
import moment from "moment/moment";
import {useAuth} from "../application/authentication/context/auth.context";

const ProtectedComponent = () => {

    const location = useLocation();
    const {userData, setUserData} = useAuth();

    if (!userData.authenticated || !userData.token ) {
        return <Navigate to='/login' state = {{from: location}} replace={true} />;
    }

    if (jwt_decode(userData.token).exp * 1000 <= moment().valueOf()){

        localStorageService.clear();
        setUserData(null);
        return <Navigate to='/login' state = {{from: location}} replace={true} />;
    }

    return <Outlet className = 'h-full' sx ={{

        height: '100%'

    }}/>;
};

export default ProtectedComponent;
