import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { DashboardC } from "../Dashboard/DashboardCuenca"

export const MainPageC = () => {

    /*------------Parte de los permisos (No funciona sin alguna explicacion)------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    let TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 :parseInt(cookie.get("TipoUsuario"));
    /*
    console.log(TipoUsuario);
    console.log(isNaN(cookie.get("TipoUsuario")));
    console.log(isNaN(TipoUsuario));
    console.log(TipoUsuario == 2 ? "Becario" : "Es otro");
    */

    switch(TipoUsuario){

        case 2:
            
            navigate("/Becario");
        break;

        case 1:
            navigate("/Administrativo");

        break;

        case 0: 
            navigate("/");
    }

    const [DataApi, SetDataApi] = useState();

    let date = new Date();
    const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let Mes;
    let dia;
    const Anio = date.getFullYear();

    if (date.getMonth() < 8) {
        Mes = "0" + (date.getMonth() + 1);
    }
    else {
        Mes = date.getMonth() + 1;
    }

    if(date.getDate() <= 9){
        dia = "0" + date.getDate();
    }
    else {
        dia = date.getDate();
    }

    const Fecha = Anio + "-" + Mes + "-" + dia;

    const Busqueda = () => {

        fetch(encodeURI(`https://becatransportecuitzeo2021-2024.com/api-transporte/relations?rel=asistencias,estudiantes&type=asistencia,estudiante&linkTo=hora&between1=${Fecha} 00:00:00&between2=${Fecha} 23:59:59&group=estudiantes.id_estudiante`), {
            method: "GET"

        })
            .then(responseraw => responseraw.json())
            .then(respuesta => {

                SetDataApi(
                    respuesta.results.map(Registro => {
                        return {
                            ...Registro
                            
                        }

                    })
                )

            })
            .catch(err => {
                //.log("Fallo en la Solicitud: " + err);
            });
    }

    const columnas = [
        {
            name: "Nombre",
            selector: row => row.nombre
        },

        {
            name: "Apellido Paterno",
            selector: row => row.apellido_paterno
        },

        {
            name: "Apellido Materno",
            selector: row => row.apellido_materno
        },

        {
            name: "Asistencias",
            selector: row => row.asistencias
        },
/*
        {
            name: "Opciones",
            selector: row => row.boton
        },

*/
    ]

    useEffect(() => {
        Busqueda()
    }, [])
    
    return (
        <>
            <DashboardC />
            
            <div className="container mt-5 pt-5">
                <h2 className="LoginSection text-darl">Asistencia del día </h2>

                <DataTable columns={columnas} data={DataApi} pagination />
            </div>

        </>
    )
}