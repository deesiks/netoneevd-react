import React, {useEffect} from 'react';
import loginImage from '../../../assets/images/login.webp';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import LoadingButton from '@mui/lab/LoadingButton';
import {logIn} from '../framework/auth.service';
import {useAlert} from "react-alert";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/auth.context";

const LoginComponent = () => {

    const alert = useAlert();
    const navigate = useNavigate();
    const {setUserData} = useAuth();

    const [isShowPassword, setShowPassword] = React.useState(false);
    const [loginRequest, setLoginRequest] = React.useState({username:'', password:''});
    const [isButtonLoading, setLoading] = React.useState(false);
    const [isButtonEnabled, setEnabled] = React.useState(false);

    //event handlers
    const handleOnChange = (event) => {

        setLoginRequest(
            prevState => {

                return  {
                    ...prevState,
                    [event.target.name] : event.target.value
                }

            });

    }

    const handleIconMouseDownEvent= () => {
        setShowPassword(true);
    }

    const handleIconMouseUpEvent= () => {
        setShowPassword(false);
    }

    const validateRequest = () => {

        if (loginRequest.password.length < 1 || loginRequest.username.length < 1){
            setEnabled(false);
        }else {
            setEnabled(true);
        }

    }

    //useEffect
    useEffect(() => {

        validateRequest()

    }, [loginRequest]);

    //service functions
    function login() {

        setLoading(true);

        logIn(loginRequest)
            .then((response) => {

                setUserData({
                    token: response.data.token,
                    authenticated : true
                });

                setLoading(false);
                navigate('/home/transactions');

            })
            .catch(err => {
                setLoading(false);

                console.log(err)

                if (!err.response.data.message){
                   alert.error(err.message);
                }else{
                   alert.error(err.response.data.message);
                }

            })
    }

    return (
        <div className='flex h-screen bg-gray-100'>

            <div className='w-3/4'>
                <img src={loginImage} alt='login_image' className='w-full h-screen object-none object-center'/>
            </div>

            <div className='w-1/4 flex flex-col items-center justify-center h-full'>

                   <div className='flex flex-col w-full items-center'>

                    <h3 className='text-3xl mb-4'>Airtime Portal</h3>

                    <TextField
                        label="Username"
                        name='username'
                        size="small"
                        value={loginRequest.username}
                        onChange={handleOnChange}

                        className='w-4/5'
                    />

                    <TextField
                        label="Password"
                        name='password'
                        value={loginRequest.password}
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
                        className='w-4/5 '
                    />

                    <LoadingButton
                        variant="contained"
                        className='w-4/5'
                        loading={isButtonLoading}
                        disabled={!isButtonEnabled}
                        onClick={login}
                    >
                        Log In
                    </LoadingButton>

                </div>

            </div>
        </div>)
}

export default LoginComponent