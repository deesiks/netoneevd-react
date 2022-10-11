import React, {useEffect} from "react";
import SideDrawerComponent from "./side.drawer.component";
import AppBarComponent from "./app.bar.component";
import {Outlet, useNavigate} from "react-router-dom";
import Routes from "../constants/routes";
import {useAuth} from "../../../../authentication/context/auth.context";
import {logOut} from "../../../../authentication/framework/auth.service";
import {getLoggedInUser} from "../../users/services/user.service";
import {useAlert} from "react-alert";

const MainComponent = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const {setUserData, userData} = useAuth();

    const [isDrawerOpen, setDrawerOpen] = React.useState(true);
    const [selectedId, setSelectedId] = React.useState(0);

    const handleDrawerToggle= () => {
        setDrawerOpen(prevState => !prevState);
    };

    const navigateToChildRoute = (selectedId) => {

        navigate(Routes[selectedId].path);
        setSelectedId(selectedId);

    }

    const _logOut = () => {

        setUserData(null);
        logOut();
        navigate("/login")

    }

    useEffect(() => {

        getLoggedInUser().then(
            response => {
                setUserData({
                    ...userData,
                    user : response.data
                }
                );
            }
        ).catch(err => {

            if (!err.response.data.message){
                alert.error(err.message);
            }else{
                alert.error(err.response.data.message);
            }

        });

    },[])

    return(
        <div className='flex h-screen'>

            <AppBarComponent handleMenuBarClick = {handleDrawerToggle}
                             logOut = {_logOut}
            />

            <SideDrawerComponent open = {isDrawerOpen} selectedId = {selectedId} onClick = {navigateToChildRoute}/>

            <Outlet sx = {{
                display: 'flex',
                overflowY: 'auto'
            }}/>
        </div>)

}

export default MainComponent