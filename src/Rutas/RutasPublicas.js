import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";

export const PublicRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    //const user = {logged: false};
    console.log(user);
    return user.Usuario ?  <Navigate to="/" /> : children
}