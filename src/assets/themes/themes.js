import {createTheme} from '@mui/material/styles'

export const THEME = createTheme({
    palette:{
        primary:{
            main: '#003366',
            contrastText: "#ffffff",
        },
        secondary:{
            main: "#C0C0C0"
        },
        contrastThreshold: 3,
        tonalOffset: 0.1,
    }

})
