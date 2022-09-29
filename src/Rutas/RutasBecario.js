import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainPageB } from "../Becarios/MainPage"


export const RutasBecario = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPageB />} />

                
            </Routes>
        </BrowserRouter>
    )
}