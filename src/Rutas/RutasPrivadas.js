import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../Administrativo/MainPage";
import { ListaBecarios } from "../Administrativo/ListaBecarios";
import { RegistrarBecario } from "../Administrativo/RegistrarBecarios";


export const RutasPrueba = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/ListaBecarios" element={<ListaBecarios />} />
                <Route path="/RegistrarBecario" element={<RegistrarBecario />} />
            </Routes>
        </BrowserRouter>
    )

}