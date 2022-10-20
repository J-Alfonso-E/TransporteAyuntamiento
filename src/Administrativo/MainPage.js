import { useState } from "react";
import { Dashboard } from "../Dashboard/DashboardAdmin";


export const MainPage = () => {

    const [Fechas, SetFechas] = useState({FechaInicio: "", FechaFinal: ""});

    const CambioFechas = ({target}) => {
        SetFechas({
            ...Fechas,
            [target.name] : target.value
        })
    }

    const Busqueda = () => {

        console.log(`http://transportesflores.info/api-transporte/relations?orderBy=2&orderMode=ASC&rel=asistencias,estudiantes&type=asistencia,estudiante&linkTo=fecha&between1=${Fechas.FechaInicio} 00:00:00&between2=${Fechas.FechaFinal} 23:59:59`);

        fetch(`http://transportesflores.info/api-transporte/relations?orderBy=2&orderMode=ASC&rel=asistencias,estudiantes&type=asistencia,estudiante&linkTo=fecha&between1=${Fechas.FechaInicio} 00:00:00&between2=${Fechas.FechaFinal} 23:59:59`, {
            method: "GET"
            
        })
        .then(responseraw => responseraw.json())
        .then(respuesta => {
            console.log(respuesta);
        })
        .catch(err => {
            console.log("Fallo en la Solicitud: " + err);
        });
    }


    return (
        <>
            <Dashboard />
            <div className="container pt-5 mt-2">
                <h2 className="">Uso de la Beca</h2>

                <div className="row"> 
                    <div className="col-md-2 col-6">
                        <label>Fecha Inicio</label>
                        <input className="form-control" type="date" name="FechaInicio"  onChange={CambioFechas}/>
                    </div>

                    <div className="col-md-2 col-6">
                        <label>Fecha Final</label>
                        <input className="form-control" type="date" name="FechaFinal" onChange={CambioFechas}/>
                    </div>

                    <div className="col-md-2 col-4 mt-4">
                        <button className="btn btn-primary"  onClick={Busqueda}>Buscar</button>
                    </div>
                    
                    <div className="col-md-4 col-4 mt-4">
                        <label>Fecha Inicial: {Fechas.FechaInicio} </label> <br/>
                        <label>Fecha Final: {Fechas.FechaFinal}</label>
                    </div>

                </div>

                <div className="row pt-3">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Numero de Asistencias</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th scope="row">Jorge Alfonso Escutia Izquierdo</th>
                                <td>5</td>
                            </tr>

                            <tr>
                                <th scope="row">Oscar Escutia Izquierdo</th>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}