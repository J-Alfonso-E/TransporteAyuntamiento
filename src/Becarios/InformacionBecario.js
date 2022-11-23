import { useEffect, useState } from "react";
import Cookies from "universal-cookie"
import { DashboardB } from "../Dashboard/DashboardBecario"
import { DashboardGeneral } from "../Dashboard/DashboardGeneral"

export const InfoBecario = () => {

    let cookie = new Cookies();
    let IdEstudiante = cookie.get("Id");

    const [DatosEstudiante, SetEstudiante] = useState({
        Nombre: "",
        Apellido_paterno: "",
        Apellido_materno: "",
        telefono: "",
        correo: "",
        Carrera: "",
        Escuala: "",
        Imagen: "",

    });

    const ConsultaDatos = async() => {
        await fetch(`https://transportesflores.info/api-transporte/estudiantes?linkTo=id_login&equalTo=${IdEstudiante}`, {
            method: "GET"
        }).then(RespuestaRaw => RespuestaRaw.json())
            .then(Respuesta => {
                SetEstudiante({
                    Nombre: Respuesta["results"][0].nombre,
                    Apellido_paterno: Respuesta["results"][0].apellido_paterno,
                    Apellido_materno: Respuesta["results"][0].Apellido_materno,
                    telefono: Respuesta["results"][0].telefono,
                    correo: Respuesta["results"][0].correo,
                    Carrera: Respuesta["results"][0].Carrera,
                    Escuala: Respuesta["results"][0].escuela,
                    Imagen: Respuesta["results"][0].img,
    
                });

                console.log(Respuesta["results"][0]);
                console.log(DatosEstudiante);
            });
    }

    useEffect(() => {
        ConsultaDatos();
    }, []);

    

    return (
        <>
            <DashboardB />
            {/*<DashboardGeneral />*/}
            <div className="container mt-5 pt-2">
                <h2>Informacion del Becario</h2>

                <div className="row">
                    <div className="col-12 col-md-6">
                        {/*<img src="./Imagenes/Usericon.png" />*/}
                    </div>

                    <div className="col-12 col-md-6">

                        <div className="row">
                            <div className="col-12">
                                <img src={DatosEstudiante.img} />
                                <h5>Nombre</h5>
                                <label>{DatosEstudiante.nombre}</label>
                                <br />
                                <br />
                                <h5>Carrera</h5>
                                <label>{DatosEstudiante.Carrera}</label>
                                <br />
                                <br />
                                <h5>Instituto o Universidad</h5>
                                <label>{DatosEstudiante.Escuela}</label>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}