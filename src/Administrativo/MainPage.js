import { Dashboard } from "../Dashboard/DashboardAdmin";


export const MainPage = () => {
    return (
        <>
            <Dashboard />
            <div className="container pt-5 mt-2">
                <h2 className="">Uso de la Beca</h2>

                <div className="row"> 
                    <div className="col-md-2 col-6">
                        <label>Fecha Inicio</label>
                        <input className="form-control" type="date"  />
                    </div>

                    <div className="col-md-2 col-6">
                        <label>Fecha Final</label>
                        <input className="form-control" type="date"  />
                    </div>

                    <div className="col-md-2 col-4 mt-4">
                        <button className="btn btn-primary"  >Buscar</button>
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