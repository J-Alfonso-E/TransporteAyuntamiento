import { DashboardB } from "../Dashboard/DashboardBecario"
import { DashboardGeneral } from "../Dashboard/DashboardGeneral"

export const InfoBecario = () => {
    return (
        <>
            <DashboardB /> 
            {/*<DashboardGeneral />*/}
            <div className="container mt-5 pt-2">
                <h2>Informacion del Becario</h2>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <img src="./Imagenes/Usericon.png"  />
                    </div>

                    <div className="col-12 col-md-6">

                        <div className="row">
                            <div className="col-12">
                                <h5>Nombre</h5>
                                <label>Jorge Alfonso Escutia Izquierdo</label>
                                <br />
                                <br />
                                <h5>Carrera</h5>
                                <label>Tecnologias de la Informacion y Comunicaciones</label>
                                <br />
                                <br />
                                <h5>Instituto o Universidad</h5>
                                <label>TecNM Campus Morelia</label>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}