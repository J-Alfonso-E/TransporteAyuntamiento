import { HashRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../Administrativo/MainPage";
import { ListaBecarios } from "../Administrativo/ListaBecarios";
import { RegistrarBecario } from "../Administrativo/RegistrarBecarios";
import { MainPageB } from "../Becarios/MainPage";
import { InfoBecario } from "../Becarios/InformacionBecario";
import { MainPageC } from "../Cuenca/MainPage";


export const RutasGen = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/ListaBecarios" element={<ListaBecarios />} />
                <Route path="/RegistrarBecario" element={<RegistrarBecario />} />

                <Route path="/PrincipalBecario" element={<MainPageB />} />
                <Route path="/InformacionBecario" element={<InfoBecario />} />

                <Route path="/PrincipalCuenca" element={<MainPageC />} />
            </Routes>

        </HashRouter>

    )

}