import { BrowserRouter } from "react-router-dom"
import { Login } from "../Login/login"
import { PublicRoute } from "../Rutas/RutasPublicas"


export const AppRouter = () => {
    return (
        <BrowserRouter>
        
        <Routes>
            <Route path="login" element={<PublicRoute>
                <Login />
                </PublicRoute>

            } ></Route>
        </Routes>
        </BrowserRouter>
    )
}