import { Dashboard } from "../Dashboard/DashboardAdmin"


export const RegistrarBecario = () => {
    return (
        <>
            <Dashboard />
            <div className="container pt-5 mt-2">
                <h2>RegistrarBecario</h2>

                <div className="row">

                    <div className="col-12 col-md-3">
                        <label>Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre" />
                    </div>

                    <div className="col-12 col-md-3">
                        <label>Apellido Paterno</label>
                        <input type="text" className="form-control" placeholder="Apellido Paterno" />
                    </div>

                    <div className="col-12 col-md-3">
                        <label>Apellildo Materno</label>
                        <input type="text" className="form-control" placeholder="Nombre" />
                    </div>

                    <div className="col-12 col-md-3">
                        <label>Carrera</label>
                        <input type="text" className="form-control" placeholder="Carrea" />
                    </div>
                </div>

                <div className="row pt-2">

                    <div className="col-12 col-md-3">
                        <label>Instituto o Universidad</label>
                        <input type="text" className="form-control" placeholder="Nombre" />
                    </div>

                    
                </div>

                <div className="row pt-2">

                    <div className="col-12 col-md-3">
                        <button className="btn btn-primary">Guardar</button>
                    </div>

                    
                </div>
            </div>

        </>
    )
}