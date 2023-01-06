import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AlertaFalloSesion } from "../Componentes/InicioSeccionIncorrecto";


export const Login = () => {
    //console.log("Login");

    let cookie = new Cookies();

    let navigate = useNavigate();

    const [values, SetValues] = useState({
        Usuario: "",
        Password: "",
        logged: ""
    }
        );



    const DatosSesion = ({target}) => {
        SetValues({...values,
        [target.name] : target.value});

        let Etq = document.getElementById("LeyendaError");
            Etq.setAttribute("class", "alert alert-danger EsconderLeyenda");

    }

    const [FalloSesion, SetAlertaFallo] = useState(0); 

    const InicioSession = () => {
        /*
        console.log("Intento de Inicio de Sesion");
        console.log(values);
        console.log("msj");
        */

        fetch(encodeURI(`https://becatransportecuitzeo2021-2024.com/api-transporte/login?linkTo=username|pass&equalTo=${values.Usuario}|${values.Password}`), {
            method: "GET"
        })
        .then(responseraw => {
            if(responseraw.ok){
                return responseraw.json();
            }
            return Promise.reject(responseraw);
        })
        .then(respuesta => {
            /*
            console.log("Permisos:" + respuesta['results'][0]['id_tipo_usuario']);
            console.log("Permisos:" + respuesta['results'][0]['username']);
*/
            cookie.set("Id", respuesta['results'][0]["id_login"], {path:"/"});
            cookie.set("Usuario", respuesta['results'][0]["username"], {path:"/"});
            cookie.set("TipoUsuario", respuesta['results'][0]["id_tipo_usuario"], {path:"/"});

            switch(parseInt( respuesta['results'][0]['id_tipo_usuario'])){
                case 1:
                    //console.log("Intentando Redigiri")
                    navigate("/Administrativo");
                    
                break;

                case 2:
                    navigate("/Becario");
                break;

                case 3:
                    navigate("/Cuenca");

                break;
            }

        })
        .catch(err => {
            /*
            console.log("Fallo en la Solicitud: " + err);
            console.log("Poniendo la señal de alerta");
            */
            SetAlertaFallo(c => c + 1);
            let Etq = document.getElementById("LeyendaError");
            Etq.setAttribute("class", "alert alert-danger");
        });

    }
    

    const EnviarFormulario = (e) => {
        //console.log(values);
        e.preventDefault();
    }

   
    return (
        <div className="BGImage">
            <div className="container mt-5">
                <div className="BannerLogin d-flex justify-content-center">

                    <div className="row ">
                        <label className="pt-3 text-center">
                            Programa de Becas de Trasnporte para los jovenes del Municipio de Cuitzeo, Michoacan.
                        </label>

                        <label className="pt-3 pb-3 text-center">
                            H. Ayuntamiento 2021-2024
                        </label>
                    </div>


                </div>

                <div className="row mt-5 ">

                    <div className="col-md-5 LoginSection mx-auto">

                        <div className="row" id="LeyendaFallo">
                            <AlertaFalloSesion />
                            
                        </div>
                        <br />

                        <div className="row">
                            <h4>Ingresar</h4>
                        </div>

                        <div className="row">
                            <form onSubmit={EnviarFormulario}>
                                <div className="col-md-12 col-sm-12 mt-2">
                                    <label>Usuario</label>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <input type="text" name="Usuario" value={values.Usuario} onChange={DatosSesion} className="form-control" placeholder="Email" required/>
                                </div>

                                <div className="col-md-12 col-sm-12 mt-2">
                                    <label>Contraseña</label>
                                </div>
                                <div className="col-md-12 col-sm-12 ">
                                    <input type="password" name="Password" className="form-control" onChange={DatosSesion}placeholder="Contraseña"  required/>
                                </div>

                                <div className="col-md-5 col-sm-12 mt-2 pb-4">
                                    <button type="submit" onClick={InicioSession} className="btn btn-primary">Ingresar</button>

                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}