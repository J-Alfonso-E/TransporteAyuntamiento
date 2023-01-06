import { useState } from "react";
import Cookies from "universal-cookie";

export const RegistrarAsistencia = () => {



    let cookie = new Cookies();
    const IdLogin = cookie.get('Id');
    //const [IdEstudianteInfo, SetIdEstudianteInfo] = useState();
    let Est = 0;
    console.log("Se creo el State del Estudiante con el valo:" + IdLogin);



    fetch(`https://becatransportecuitzeo2021-2024.com/api-transporte/estudiantes?linkTo=id_login&equalTo=${IdLogin}`, {
        method: 'GET'
    }).then(RespuestaRaw => RespuestaRaw.json())
        .then(Respuesta => {
            //SetIdEstudianteInfo(Respuesta.results[0].id_estudiante);
            Est = Respuesta.results[0].id_estudiante
            console.log(Respuesta.results[0].id_estudiante);
            let Datos = new FormData();
            Datos.append("id_estudiante", Est);

            fetch(encodeURI('https://becatransportecuitzeo2021-2024.com/api-transporte/asistencias'), {
                method: 'POST',
                body: Datos
            }).then(ResponseRaw => ResponseRaw.json())
                .then(Respuesta => {
                    console.log(Respuesta);
                })
        });
}