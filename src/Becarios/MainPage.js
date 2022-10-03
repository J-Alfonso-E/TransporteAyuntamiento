import { DashboardB } from "../Dashboard/DashboardBecario";
import LectorQR from "../Lector/InterfazQR";



export const MainPageB = () => {
    return (
        <>
            <DashboardB />
            <div className="container">
                <h2 className="mt-5 pt-2">Main Page Becario</h2>

                <LectorQR />
            </div>

            

        </>
    )
}