import { HashRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../Administrativo/MainPage";
import { ListaBecarios } from "../Administrativo/ListaBecarios";
import { RegistrarBecario } from "../Administrativo/RegistrarBecarios";


export const RutasAdmin = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/ListaBecarios" element={<ListaBecarios />} />
                <Route path="/RegistrarBecario" element={<RegistrarBecario />} />
            </Routes>

        </HashRouter>

    )

}