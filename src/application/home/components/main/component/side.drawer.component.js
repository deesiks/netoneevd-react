import React from "react";
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import Routes from "../constants/routes";
import { styled, useTheme } from '@mui/material/styles';
import {useAuth} from "../../../../authentication/context/auth.context";
import localStorageService from "../../../../../utilities/local.storage.service";

const SideDrawerComponent = (props) => {

    const {open, selectedId, onClick} = props;

    const drawerWidth = 200;

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    return (

        <Drawer variant="permanent" open={open}

                sx ={{
                    display:{
                        md: 'flex',
                        xs:'none'
                    }
                }}
        >
            <Toolbar
                variant='dense'/>
            <List>
                {Routes.map(route => (

                    <ListItem key={route.id} disablePadding 
                    sx={{ 
                        display: 'block'
                        }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={() => onClick(route.id)}
                            selected={selectedId === route.id}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {route.icon}
                            </ListItemIcon>
                            <ListItemText primary={route.label}
                                          sx=
                                              {{
                                                  opacity: open ? 1 : 0
                                          }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>


    )

}

export default SideDrawerComponent