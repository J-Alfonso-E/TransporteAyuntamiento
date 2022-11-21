import { useState } from "react";
import { RegistrosAsistencias } from "../Componentes/RegistrosAsistenciaTabla";
import { Dashboard } from "../Dashboard/DashboardAdmin";
import { DashboardGeneral } from "../Dashboard/DashboardGeneral";


export const MainPage = () => {

    const [Fechas, SetFechas] = useState({ FechaInicio: "", FechaFinal: "" });
    const [DataApi, SetDataApi] = useState({});

    const CambioFechas = ({ target }) => {
        SetFechas({
            ...Fechas,
            [target.name]: target.value
        })
    }

    const Busqueda = () => {

        fetch(`http://localhost/api-transporte/relations?rel=asistencias,estudiantes&type=asistencia,estudiante&linkTo=fecha&between1=${Fechas.FechaInicio} 00:00:00&between2=${Fechas.FechaFinal} 23:59:59&group=estudiantes.id_estudiante`, {
            method: "GET"

        })
            .then(responseraw => responseraw.json())
            .then(respuesta => {
                console.log(respuesta);
                SetDataApi(respuesta)
            })
            .catch(err => {
                console.log("Fallo en la Solicitud: " + err);
            });
    }


    return (
        <>
            <Dashboard />
            {/*<DashboardGeneral />*/}
            <div className="container pt-5 mt-2">
                <h2 className="text-dark">Uso de la Beca</h2>

                <div className="card shadow">

                    <div className="card-header">
                        <p>Información del Uso del la Beca</p>
                    </div>

                    <div className="card-body">


                        <div className="row pl-3">
                            <div className="col-md-2 col-6">
                                <label>Fecha Inicio</label>
                                <input className="form-control" type="date" name="FechaInicio" onChange={CambioFechas} />
                            </div>

                            <div className="col-md-2 col-6">
                                <label>Fecha Final</label>
                                <input className="form-control" type="date" name="FechaFinal" onChange={CambioFechas} />
                            </div>

                            <div className="col-md-2 col-4 mt-4">
                                <button className="btn btn-primary" onClick={Busqueda}>Buscar</button>
                            </div>

                            <div className="col-md-4 col-4 mt-4">
                                <label>Fecha Inicial: {Fechas.FechaInicio} </label> <br />
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

                                <tbody name="CuerpoAsistencias">

                                    <RegistrosAsistencias value={DataApi} />
                                    {/* 
                                    <tr>
                                        <th scope="row">Jorge Alfonso Escutia Izquierdo</th>
                                        <td>5</td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Oscar Escutia Izquierdo</th>
                                        <td>5</td>
                                    </tr>
                                    */}

                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>

            </div>

        </>
    )
}