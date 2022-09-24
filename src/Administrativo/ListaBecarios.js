import { Dashboard } from "../Dashboard/Dashboard"
import { ModalActualizarBecario } from "./ActualizarDatos(Modal)"

export const ListaBecarios = () => {
    return (
        <>
            <Dashboard />

            <div className="container pt-5 mt-2">
                <h2>Lista de Becarios</h2>


                <div className="row pt-3">

                    <div className="form-group col-md-3">
                        <label className="form-label">Instituto</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className="form-group col-md-3">
                        <label className="form-label">Carrera</label>
                        <input type="text" className="form-control" />
                    </div>

                    <div className="col-md-2 mt-4 pt-2">
                        <button type="button" className="btn btn-primary"><i className="bi bi-search"></i> Buscar</button>
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