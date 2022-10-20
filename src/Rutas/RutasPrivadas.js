//import { useContext } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";



export const PrivateRoute = ({children}) => {
    //const { user } = useContext(AuthContext);
    const user = {logged: false};
    //const {pathname, search} = useLocation();
    
    return user.logged ? children: <Navigate to="/login" />
}