import LoginComponent from "./application/authentication/components/login.component";
import {
  Routes,
  Route, Navigate,
} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';
import {THEME} from "./assets/themes/themes";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "./utilities/alert.template";
import {AuthProvider} from "./application/authentication/context/auth.context";
import localStorageService from './utilities/local.storage.service'
import ProtectedComponent from "./utilities/protected.component";
import TransactionsComponent from "./application/home/components/transactions/components/transactions.component";
import MainComponent from "./application/home/components/main/component/main.component";

function App() {

  let loggedInUserData = localStorageService.getAllData();

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={THEME}>

          <AlertProvider template={AlertTemplate}>
            <AuthProvider loggedInUserData={loggedInUserData}>

              <Routes>
                <Route
                    path="/login"
                    element={<LoginComponent />}
                />

                <Route>
                  <Route path="/" element = {<ProtectedComponent/>}>

                      <Route path= "/home" element={<MainComponent />	}>
                          <Route path="/home/transactions" element = {<TransactionsComponent/>}/>
                      </Route>

                    <Route
                        path="/"
                        element={
                          <Navigate replace to="/home/transactions" />
                        }
                    />
                  </Route>

                </Route>

              </Routes>
            </AuthProvider>
          </AlertProvider>
        </ThemeProvider>

      </LocalizationProvider>
  );
}

export default App;
