import React, {useEffect} from 'react';
import loginImage from '../../../assets/images/login.webp';
import logo from '../../../assets/images/logo.webp'
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

        validateRequest();

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

                if (!err?.response?.data?.message
                ){
                   alert.error(err.message);
                }else{
                   alert.error(err.response.data.message);
                }

            })
    }

    return (
        <div className='h-screen bg-cover bg-center bg-no-repeat flex' style={{
            backgroundImage: `url(${loginImage})`
        }}>
            <div className='md:hidden
            absolute top-0 bg-[#003366] h-[20px] w-full text-center text-[10px] text-slate-200
            flex justify-center items-center
            '>
            </div>

            <div className='flex flex-col items-center bg-opacity-95 lg:bg-opacity-100 justify-center align-middle md:h-[380px] bg-[#f4f8f3] mx-auto my-auto lg:w-[300px]  w-full h-full md:py-56
            md:shadow-[0_35px_60px_-20px_rgba(0,0,0)]
            '>

                <img src={logo} alt='login_image' className='w-[150px] object-scale-down object-center mb-16'/>

                <div className='flex flex-col w-full items-center'>


                    <TextField
                        label="Username"
                        name='username'
                        size="small"
                        value={loginRequest.username}
                        onChange={handleOnChange}

                        className='lg:w-4/5 w-[250px]'
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
                        className='lg:w-4/5 w-[250px]'
                    />

                    <LoadingButton
                        variant="contained"
                        className='lg:w-4/5 w-[250px]'
                        loading={isButtonLoading}
                        disabled={!isButtonEnabled}
                        onClick={login}
                    >
                        Log In
                    </LoadingButton>

                </div>

            </div>

            <footer className='
            absolute bottom-0 bg-[#003366] h-[20px] w-full text-center text-[10px] text-slate-200
            flex justify-center items-center
            '>
                Developed By FourTen Softwares &copy; 2022 | +263 77 4780 820
            </footer>

        </div>)
}

export default LoginComponent