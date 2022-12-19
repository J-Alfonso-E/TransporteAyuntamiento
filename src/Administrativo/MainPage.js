import { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/DashboardAdmin";
import DataTable from 'react-data-table-component';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { LeyendaSinRegistros } from "../Componentes/AlertaSinRegistros";
//import { ExcelAsistencias } from "../Componentes/ExcelAsistencias";
var XLSX = require("xlsx-js-style");


export const MainPage = () => {

    /*------------Parte de los permisos------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    const TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 : parseInt(cookie.get("TipoUsuario"));
    //console.log(TipoUsuario);

    switch (TipoUsuario) {

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
    const [DatosTabla, SetDatosTabla] = useState();
    const [AsistenciasTotales, SetAsistenciasTotales] = useState(0);

    const CambioFechas = ({ target }) => {
        SetFechas({
            ...Fechas,
            [target.name]: target.value
        })
    }

    const [LeyendaError, SetLeyendaError] = useState();

    const Busqueda = () => {

        fetch(encodeURI(`https://transportesflores.info/api-transporte/relations?rel=asistencias,estudiantes&type=asistencia,estudiante&linkTo=hora&between1=${Fechas.FechaInicio} 00:00:00&between2=${Fechas.FechaFinal} 23:59:59&group=estudiantes.id_estudiante`), {
            method: "GET"

        })
            .then(responseraw => {
                if(responseraw.ok){
                    return responseraw.json();
                }
                return Promise.reject(responseraw);
            })
            .then(respuesta => {
                console.log(respuesta.results);
                //SetDataApi(respuesta.results);
                SetAsistenciasTotales(respuesta.total);
                SetLeyendaError(0);

                SetDataApi(
                    respuesta.results.map(Registro => {
                        return {
                            ...Registro, boton: <i className="bi bi-list-ul" data-bs-toggle="modal" data-bs-target="#ModalEjemplo" onClick={() => AsistenciaPorBecario(Registro.id_estudiante)} aria-hidden="true"></i>

                        }

                    })
                );

                SetDatosTabla(
                    respuesta.results.map(Registro => {
                        return {
                            Nombre: Registro.nombre + " " + Registro.apellido_paterno + " " + Registro.apellido_materno,
                            Asistencias: Registro.asistencias
                        }

                    })
                );

            })
            .catch(err => {
                console.log("Fallo en la Solicitud: " + err);
                SetAsistenciasTotales(0);
                SetLeyendaError(1);
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
        SetLeyendaError(0);
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

    const DescargarReporte = () => {
        
                //console.log(DataApi);
                const wb = XLSX.utils.book_new();
                const Titulo = [{ v: `Lista de Asistencias del ${Fechas.FechaInicio} al ${Fechas.FechaFinal}`, font: {bold: true, sz: 16}}];
                const ws = XLSX.utils.json_to_sheet(DatosTabla, {origin: "A2"});
                
                ws["!merges"] = [{
                    s: { r: 0, c: 0 },
                    e: { r: 0, c: 1 }
                }];
                ws["!cols"] = [{ width: 30 }, { width: 20 }, { width: 20 }];
                
                XLSX.utils.book_append_sheet(wb, ws, "Lista de Asistencias");
                XLSX.writeFile(wb, `Lista de Asistencias del ${Fechas.FechaInicio} al ${Fechas.FechaFinal}.xlsx`);
        
        // Codigo de ejemplo
/*
        const wb = XLSX.utils.book_new();

        // STEP 2: Create data rows
        let row1 = ["a", "b", "c"];
        let row2 = [1, 2, 3];
        let row3 = [
            { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
            { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "FF0000" } } } },
            { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "E9E9E9" } } } },
            { v: "line\nbreak!", t: "s", s: { alignment: { wrapText: true } } },
        ];
        let row4 = ["a b c"];

        // STEP 3: Create Worksheet, add data, set cols widths
        const ws = XLSX.utils.aoa_to_sheet([row1, row2, row3, row4]);
        ws["!cols"] = [{ width: 30 }, { width: 20 }, { width: 20 }];
        //ws["!rows"] = [{ width: 30 }, { width: 20 }, { width: 20}]; // Intento de altura de la celda
        ws["!merges"] = [
            {
                s: { r: 3, c: 0 },
                e: { r: 3, c: 2 }
            }];
        XLSX.utils.book_append_sheet(wb, ws, "browser-demo");

        // STEP 4: Write Excel file to browser
        XLSX.writeFile(wb, "xlsx-js-style-demo.xlsx");
*/
    }


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


                            <div className="col-md-2 col-4 offset-md-3 mt-4">
                                <button className="btn btn-success" onClick={DescargarReporte}><i class="bi bi-list-ul"></i> Descargar reporte</button>
                            </div>


                            {/*
                            <div className="col-md-4 col-4 mt-4">
                                <label>Fecha Inicial: {Fechas.FechaInicio} </label> <br />
                                <label>Fecha Final: {Fechas.FechaFinal}</label>
                            </div>
                            */}

                        </div>

                        <div className="row pt-3">
                            {LeyendaError === 0 ? <DataTable columns={columnas} data={DataApi} />: <LeyendaSinRegistros />}

                            <label>Numero de Asistencias: {AsistenciasTotales}</label>
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