import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPageC } from "../Cuenca/MainPage";


export const RutasCuenca = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPageC />} />
                

                
            </Routes>
        </BrowserRouter>
    )
}