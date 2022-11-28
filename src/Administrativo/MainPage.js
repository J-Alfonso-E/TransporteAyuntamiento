import { useEffect, useState } from "react";
//import { RegistrosAsistencias } from "../Componentes/RegistrosAsistenciaTabla";
import { Dashboard } from "../Dashboard/DashboardAdmin";
import DataTable from 'react-data-table-component';
import { DashboardGeneral } from "../Dashboard/DashboardGeneral";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


export const MainPage = () => {

    /*------------Parte de los permisos------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    const TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 :parseInt(cookie.get("TipoUsuario"));
    console.log(TipoUsuario);

    switch(TipoUsuario){

        case 2:
            
            navigate("/Becario");
        break;

        case 3:
            navigate("/Cuenca");

        break;

        case 0: 
            navigate("/");
    }

    let date = new Date();
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let Mes;
    const Anio = date.getFullYear();

    if (date.getMonth() < 8) {
        Mes = "0" + (date.getMonth() + 1);
    }
    else {
        Mes = date.getMonth() + 1;
    }



    //console.log("El primer día es: " + primerDia.getDate());
    //console.log("El ultimo día es: " + ultimoDia.getDate());


    const [Fechas, SetFechas] = useState({
        FechaInicio: Anio + "-" + Mes + "-01",
        FechaFinal: Anio + "-" + Mes + "-" + ultimoDia.getDate()
    });
    const [DataApi, SetDataApi] = useState({});

    const CambioFechas = ({ target }) => {
        SetFechas({
            ...Fechas,
            [target.name]: target.value
        })
    }

    const Busqueda = () => {

        fetch(encodeURI(`https://transportesflores.info/api-transporte/relations?rel=asistencias,estudiantes&type=asistencia,estudiante&linkTo=hora&between1=${Fechas.FechaInicio} 00:00:00&between2=${Fechas.FechaFinal} 23:59:59&group=estudiantes.id_estudiante`), {
            method: "GET"

        })
            .then(responseraw => responseraw.json())
            .then(respuesta => {
                console.log(respuesta.results);
                //SetDataApi(respuesta.results);

                SetDataApi(
                    respuesta.results.map(Registro => {
                        return {
                            ...Registro, boton: <i className="bi bi-list-ul" data-bs-toggle="modal" data-bs-target="#ModalEjemplo" onClick={() => AsistenciaPorBecario(Registro.id_estudiante)} aria-hidden="true"></i>
                            
                        }

                    })
                )

            })
            .catch(err => {
                console.log("Fallo en la Solicitud: " + err);
            });
    }


    const columnas = [
        {
            name: "Nombre",
            selector: row => row.nombre
        },

        {
            name: "Apellido Paterno",
            selector: row => row.apellido_paterno
        },

        {
            name: "Apellido Materno",
            selector: row => row.apellido_materno
        },

        {
            name: "Asistencias",
            selector: row => row.asistencias
        },

        {
            name: "Opciones",
            selector: row => row.boton
        },


    ]

    useEffect(() => {
        Busqueda();
    }, []);

    const [AsistenciasBecario, SetAsistencias] = useState();

    const AsistenciaPorBecario = (IdEstudiante) => {
        fetch(encodeURI(`https://transportesflores.info/api-transporte/asistencias?range=hora&linkTo=id_estudiante&equalTo=${IdEstudiante}&between1=${Fechas.FechaInicio} 00:00:00&between2=${Fechas.FechaFinal} 23:59:59`), {
            method: "GET"
        }).then(RespuestaRaw => RespuestaRaw.json())
        .then(Respuesta => {
            SetAsistencias(Respuesta.results);

        })
    }

    const ColunmasAsistancias = [
        {
            name: "Fecha y Hora",
            selector: row => row.hora
        }
    ]


    return (
        <>
            <Dashboard />
            {/*<DashboardGeneral />*/}
            <div className="container pt-5 mt-2">
                <h2 className="text-dark LoginSection">Uso de la Beca</h2>

                <div className="card shadow">

                    <div className="card-header ">
                        <p>Información del Uso del la Beca</p>
                    </div>

                    <div className="card-body">


                        <div className="row pl-3">
                            <div className="col-md-2 col-6">
                                <label>Fecha Inicio</label>
                                <input className="form-control" type="date" name="FechaInicio" value={Fechas.FechaInicio} onChange={CambioFechas} />
                            </div>

                            <div className="col-md-2 col-6">
                                <label>Fecha Final</label>
                                <input className="form-control" type="date" name="FechaFinal" value={Fechas.FechaFinal} onChange={CambioFechas} />
                            </div>

                            <div className="col-md-2 col-4 mt-4">
                                <button className="btn btn-primary" onClick={Busqueda}>Buscar</button>
                            </div>

                            {/*
                            <div className="col-md-4 col-4 mt-4">
                                <label>Fecha Inicial: {Fechas.FechaInicio} </label> <br />
                                <label>Fecha Final: {Fechas.FechaFinal}</label>
                            </div>
                            */}

                        </div>

                        <div className="row pt-3">

                            <DataTable columns={columnas} data={DataApi} />
                            {/*
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Numero de Asistencias</th>

                                    </tr>
                                </thead>

                                <tbody name="CuerpoAsistencias">

                                    <RegistrosAsistencias value={DataApi} />

                                </tbody>
                            </table>
                            */}
                        </div>

                        <div className="modal" tabindex="-1" id="ModalEjemplo">

                            <div className="modal-dialog modal-xs">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Listado de Asistencias</h4>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {/*<h3> Asistencias</h3>*/}
                                        <DataTable columns={ColunmasAsistancias} data={AsistenciasBecario} pagination />

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>

        </>
    )
}