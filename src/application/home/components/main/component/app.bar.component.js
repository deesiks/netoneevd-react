import React from "react";
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Bars3Icon} from "@heroicons/react/24/solid";
import {useAuth} from "../../../../authentication/context/auth.context";

const AppBarComponent = (props) => {

    const {userData} = useAuth();
    const {handleMenuBarClick, logOut} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar

                variant='dense'
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={handleMenuBarClick}
                    aria-label="toggleDrawer"
                    sx={{ mr: 2 }}
                >
                    <Bars3Icon className='w-5 h-5' />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    <span>{`Hi, ${userData?.user?.username}`}</span>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    <IconButton
                        size="small"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={""}
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                    >
                        <Avatar
                            sx={{ width: 30,
                                height: 30,
                                fontSize: '16px',
                                bgcolor: '#d0d0d0'
                            }}
                        >{userData?.user?.username?.toUpperCase().charAt(0)}
                        </Avatar>
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

                </Box>
            </Toolbar>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={

                    () => {
                        handleClose();
                        logOut();
                    }}>Logout</MenuItem>
            </Menu>

        </AppBar>
    )

}

export default AppBarComponent