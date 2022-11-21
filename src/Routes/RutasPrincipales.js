import { HashRouter, Route, Routes } from "react-router-dom"
import { ListaBecarios } from "../Administrativo/ListaBecarios"
import { MainPage } from "../Administrativo/MainPage"
import { RegistrarBecario } from "../Administrativo/RegistrarBecarios"
import { InfoBecario } from "../Becarios/InformacionBecario"
import { MainPageB } from "../Becarios/MainPage"
import { MainPageC } from "../Cuenca/MainPage"
import { Login } from "../Login/login"

export const RutasPrincipales = () => {

    return(
    <HashRouter>
        <Routes>
            <Route path="/" element={<Login />} />

            {/* -----------------Seccion Administrativa -----------------*/ }
            <Route path="/Administrativo" element={<MainPage />} />
            <Route path="/Administrativo/ListaBecarios" element={<ListaBecarios />} />
            <Route path="/Administrativos/RegistrarBecario" element={<RegistrarBecario />} />

            {/* -------Seccion Becario ------------------*/}
            <Route path="/Becario" element={<MainPageB />} />
            <Route path="/Becario/InfoBecario" element={<InfoBecario />} />

            {/* ------------Seccion Cuenca ------------------ */}
            <Route path="/Cuenca" element={<MainPageC />} />
        </Routes>
    </HashRouter>
    )
}