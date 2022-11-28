import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AvisoRegistroNegado } from "../Componentes/NoRegistrodeAsistencia";
import { DashboardB } from "../Dashboard/DashboardBecario";
import { DashboardGeneral } from "../Dashboard/DashboardGeneral";
//import { AsistenciaporBecario } from "../Lector/Asistencia";
import LectorQR from "../Lector/InterfazQR";


export const MainPageB = () => {

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
    

    const Temp = new Date();
    const FechaActual = Temp.getDay() +"-" + (Temp.getMonth()+1) +"-" + Temp.getFullYear();
    const FechaHora = new Date();

    console.log(FechaActual);


    const Usuario = cookie.get("Id");

    let date = new Date();
    let dia;
    let Mes;
    const Anio = date.getFullYear();

    if (date.getMonth() < 8) {
        Mes = "0" + (date.getMonth() + 1);
    }
    else {
        Mes = date.getMonth() + 1;
    }

    if(date.getDate() < 9){
        dia = "0" + date.getDate();
    }
    else{
        dia = date.getDate();
    }

    const Fechacompleta = Anio + "-" + Mes + "-" + dia;



    const [Respuesta, SetRespuesta] = useState({});
    

    const [CompRenderizar, SetCompRenderizar] = useState();

    const ObtenerDatos = async () => {
        //const TempApi = Date().now;
        const FechaHoraApi = new Date();
        console.log(FechaHora);
        console.log(FechaHoraApi);

        let idEstudiante;

        await fetch(encodeURI(`https://transportesflores.info/api-transporte/estudiantes?linkTo=id_login&equalTo=${Usuario}`), {
            method: "GET"
        }).then(RespuestaRaw => RespuestaRaw.json())
        .then(Respuesta => {
            //console.log(Respuesta);
            idEstudiante = Respuesta["results"][0]["id_estudiante"];
        })

        
        const RespuestaRaw = await fetch(encodeURI(`https://transportesflores.info/api-transporte/asistencias?linkTo=id_estudiante&equalTo=2&range=hora&between1=${Fechacompleta} 00:00:00&between2=${Fechacompleta} 23:59:59`), {
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