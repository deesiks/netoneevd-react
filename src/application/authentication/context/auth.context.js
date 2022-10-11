import React from "react";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ loggedInUserData, children }) => {

    let [userData, setUserData] = React.useState(loggedInUserData);

    return (
        <AuthContext.Provider value={ {userData, setUserData} }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
