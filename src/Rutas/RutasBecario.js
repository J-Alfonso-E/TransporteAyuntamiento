import { BrowserRouter, Route, Routes } from "react-router-dom"
import { InfoBecario } from "../Becarios/InformacionBecario"
import { MainPageB } from "../Becarios/MainPage"


export const RutasBecario = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPageB />} />
                <Route path="/InfoBecario" element={<InfoBecario />} />

                
            </Routes>
        </BrowserRouter>
    )
}