import { useState } from "react"
import { Dashboard } from "../Dashboard/DashboardAdmin"
import { ModalActualizarBecario } from "./ActualizarDatos(Modal)"

export const ListaBecarios = () => {

    const [DatosBusqueda, SetBusqueda] = useState({

        Instituto: "",
        Carrera: ""
    });

    const CambioDatos = ({target}) => {
        SetBusqueda({
            ...DatosBusqueda,
            [target.name]: target.value
        })
    } 

    const Busqueda = () => {
        console.log("Busqueda");

        let escuelaDato ="";
        let escuelaParam = ""
        let CarreraDato = "";
        let CarreraParam = "";


        if(DatosBusqueda.Instituto.trim() !== ""){
            escuelaDato = "|" + DatosBusqueda.Instituto.trim();
            escuelaParam = "|escuela"; 
        }

        if(DatosBusqueda.Carrera.trim() !== ""){
            CarreraDato = "|" + DatosBusqueda.Carrera.trim();
            CarreraParam = "|Carrera";
        }

        fetch(`http://transportesflores.info/api-transporte/estudiantes?linkTo=Activo${escuelaParam}${CarreraParam}&equalTo=1${escuelaDato}${CarreraDato}`, {
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
                <h2>Lista de Becarios</h2>


                <div className="row pt-3">

                    <div className="form-group col-md-3">
                        <label className="form-label">Instituto</label>
                        <input type="text" className="form-control" name="Instituto" onChange={CambioDatos} />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="form-label">Carrera</label>
                        <input type="text" className="form-control" name="Carrera" onChange={CambioDatos}/>
                    </div>

                    <div className="col-md-2 mt-4 pt-2">
                        <button type="button" className="btn btn-primary" onClick={Busqueda}><i className="bi bi-search" ></i> Buscar</button>
                    </div>

                    <div className="col-md-4 mt-4 pt-2">

                        <label>Carrera: {DatosBusqueda.Carrera}</label> <br />
                        <label>Instituto o Universidad: {DatosBusqueda.Instituto}</label> <br />
                    </div>
                </div>

                <div className="row pt-3">

                    <table className="table table-striped table-hover">

                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Universidad</th>
                                <th scope="col">Carrera</th>
                                <th scope="col">Tutor</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Opciones</th>
                            </tr>

                        </thead>


                        <tbody>
                            <tr>
                                <th scope="row">Jorge Alfonso Escutia Izquierdo</th>
                                <td>ITM</td>
                                <td>ITICS</td>
                                <td>(Nadie)</td>
                                <td>01/01/2023</td>
                                <td>4431862519</td>
                                <td>
                                    <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#ModalEjemplo" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalActualizarBecario />
        </>
    )
}