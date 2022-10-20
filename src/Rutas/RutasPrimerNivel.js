import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "../Login/login";
import { RutasAdmin } from "./RutasAdmin";
import { PrivateRoute } from "./RutasPrivadas";
import { PublicRoute } from "./RutasPublicas";


export const AppRouter = () => {
    return (
        <HashRouter>
            
            <Routes>
                {/*<Route path="/login" element={<LoginScreen />} />*/}
                <Route path="login" element={<PublicRoute>
                    <Login />
                    </ PublicRoute>} >
                </Route>
                <Route path="/*" element={<PrivateRoute>
                    <RutasAdmin />
                </PrivateRoute>}></Route>
                {/*<Route path="/*" element={<DashboardRoutes />} />*/}
            </Routes>
        </HashRouter>
    );
}