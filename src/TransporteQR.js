import { useEffect, useReducer } from "react"
import { AuthContext } from "./Auth/AuthContext"
import { authReducer } from "./Auth/AuthReducer"
import { AppRouter } from "./Rutas/RutasPrimerNivel"


const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const TransporteQR = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init);

    console.log(user);

    useEffect(() => {
        if (!user) return;

        localStorage.setItem('user', JSON.stringify(user));
    })



    return (
        <AuthContext.Provider value={{ user, dispatch }} >
            <AppRouter />
        </AuthContext.Provider>
    )
}
