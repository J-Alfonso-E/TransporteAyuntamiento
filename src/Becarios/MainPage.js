import { DashboardB } from "../Dashboard/DashboardBecario";
import { onScanSuccess, onScanError } from "../Lector/funciones";


export const MainPageB = () => {
    return (
        <>
            <DashboardB />
            <div className="container">
                <h2 className="mt-5 pt-2">Main Page Becario</h2>

                <div className="row">
                    <div className="col">
                        <div id="reader"></div>
                    </div>
                    <div className="col">
                        <h4>SCAN RESULT</h4>
                        <div id="result">Result Here</div>
                    </div>
                </div>
            </div>

            

        </>
    )
}