import { useEffect, useState } from "react";
import { AvisoRegistroNegado } from "../Componentes/NoRegistrodeAsistencia";
import { DashboardB } from "../Dashboard/DashboardBecario";
import { DashboardGeneral } from "../Dashboard/DashboardGeneral";
//import { AsistenciaporBecario } from "../Lector/Asistencia";
import LectorQR from "../Lector/InterfazQR";


export const MainPageB = () => {

    //const Temp = new Date().now();
    //const FechaActual = Temp.getDay() +"-" + (Temp.getMonth()+1) +"-" + Temp.getFullYear();
    const FechaHora = new Date();

    const [Respuesta, SetRespuesta] = useState({});
    

    const [CompRenderizar, SetCompRenderizar] = useState();

    const ObtenerDatos = async () => {
        //const TempApi = Date().now;
        const FechaHoraApi = new Date();
        console.log(FechaHora);
        console.log(FechaHoraApi);

        let idEstudiante;

        await fetch(`https://transportesflores.info/api-transporte/estudiantes?linkTo=id_login&equalTo=2`, {
            method: "GET"
        }).then(RespuestaRaw => RespuestaRaw.json())
        .then(Respuesta => {
            //console.log(Respuesta);
            idEstudiante = Respuesta["results"][0]["id_estudiante"];
        })

        
        const RespuestaRaw = await fetch(`https://transportesflores.info/api-transporte/asistencias?linkTo=id_estudiante&equalTo=2&range=fecha&between1=2022-11-20 00:00:00&between2=2022-11-20 23:59:59`, {
        method: 'GET'});
    
    const Datos = await RespuestaRaw.json();
    SetRespuesta(Datos);
    //console.log(Datos);
    
    //console.log(Respuesta);

    if(Datos.status === "400" || Datos.total >= 2){
        SetCompRenderizar(0);
        console.log("No se debe renderizar");
        console.log("Diferencia de tiempo: "+ (FechaHoraApi - FechaHora));
    }
    else {
        SetCompRenderizar(1);
        console.log("Se debe renderizar");
        console.log("Diferencia de tiempo: "+ (FechaHoraApi - FechaHora));
    }
    }

    useEffect(() =>{
        ObtenerDatos();
    }
        , [])

    return (
        <>
                <DashboardB />
                {/*<DashboardGeneral />*/}
                <div className="container">
                    <h2 className="mt-5 pt-2">Main Page Becario</h2>
                    {CompRenderizar == 0 ? <AvisoRegistroNegado /> : <LectorQR />}
                    
                    
                </div>
            </>
    )
}