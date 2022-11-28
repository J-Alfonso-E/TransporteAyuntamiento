import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import { DashboardB } from "../Dashboard/DashboardBecario"
import { DashboardGeneral } from "../Dashboard/DashboardGeneral"

export const InfoBecario = () => {

    /*------------Parte de los permisos------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    const TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 :parseInt(cookie.get("TipoUsuario"));
    console.log(TipoUsuario);

    switch(TipoUsuario){

        case 1:
            
            navigate("/Administrativo");
        break;

        case 3:
            navigate("/Cuenca");

        break;

        case 0: 
            navigate("/");
    }
    let IdEstudiante = cookie.get("Id");

    const [DatosEstudiante, SetEstudiante] = useState({

    });

    const ConsultaDatos = async () => {
        await fetch(encodeURI(`https://transportesflores.info/api-transporte/estudiantes?linkTo=id_login&equalTo=${IdEstudiante}`), {
            method: "GET"
        }).then(RespuestaRaw => RespuestaRaw.json())
            .then(Respuesta => {
                console.log(Respuesta.results[0]);
                SetEstudiante({
                    ...Respuesta.results[0]

                });



            });
    }

    useEffect(() => {
        ConsultaDatos();
    }, []);



    return (
        <>
            <DashboardB />
            {/*<DashboardGeneral />*/}
            <div className="container mt-5 pt-4">


                <div className="row text-center">

                    <div className="card LoginSection">
                        <div className="card-header">
                            Informacion del Becario
                        </div>

                        <div className="card-body">
                            <div className="row">
                            <div className="col-12 col-md-6 ">
                                <img src={`./api-transporte/${DatosEstudiante.img}`} />
                                {/*<img src="./Imagenes/Usericon.png" />*/}
                            </div>

                            <div className="col-12 col-md-6 ">

                                <div className="row ">
                                    <div className="col-12">

                                        <h4>Nombre</h4>
                                        <h5>{DatosEstudiante.nombre}</h5>
                                        <br />
                                        <br />
                                        <h4>Carrera</h4>
                                        <h5>{DatosEstudiante.Carrera}</h5>
                                        <br />
                                        <br />
                                        <h4>Instituto o Universidad</h4>
                                        <h5 className="mb-5">{DatosEstudiante.escuela}</h5>
                                    </div>
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