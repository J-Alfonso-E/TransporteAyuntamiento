import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { authReducer } from "../Auth/AuthReducer";

export const Login = () => {

    //const {user, dispatch} = useContext(AuthContext);


    const [values, SetValues] = useState({
        Usuario: "",
        Password: "",
        logged: ""
    }
        );



    const DatosSesion = ({target}) => {
        SetValues({...values,
        [target.name] : target.value})

    }

    const InicioSession = () => {
        console.log("Intento de Inicio de Sesion");
        console.log(values);

        fetch(`http://localhost/api-transporte/login?linkTo=username|pass&equalTo=${values.Usuario}|${values.Password}`, {
            method: "GET"
            
        })
        .then(responseraw => responseraw.json())
        .then(respuesta => {
            console.log("Permisos:" + respuesta['results'][0]['id_tipo_usuario']);
            console.log("Permisos:" + respuesta['results'][0]['username']);
        })
        .catch(err => {
            console.log("Fallo en la Solicitud: " + err);
        });

        /*SetValues({...values,
            logged: "[auth] Login"
        
        })
    dispatch(values);*/
    }
    

    const EnviarFormulario = (e) => {
        console.log(values);
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
                        <div className="row">
                            <h4>Ingresar</h4>
                        </div>

                        <div className="row">
                            <form onSubmit={EnviarFormulario}>
                                <div className="col-md-12 col-sm-12 mt-2">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <input type="text" name="Usuario" value={values.Usuario} onChange={DatosSesion} className="form-control" placeholder="Email" />
                                </div>

                                <div className="col-md-12 col-sm-12 mt-2">
                                    <label>Contraseña</label>
                                </div>
                                <div className="col-md-12 col-sm-12 ">
                                    <input type="text" name="Password" className="form-control" onChange={DatosSesion}placeholder="Contraseña" />
                                </div>

                                <div className="col-md-5 col-sm-12 mt-2 pb-4">
                                    <button type="submit" onClick={InicioSession} className="btn btn-primary">Ingresar</button>

                                </div>

                            </form>

                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12 mt-2">
                                <label>Usuario: {values.Usuario} </label>

                            </div>

                            <div className="col-md-12 col-sm-12 mt-2">
                                <label>Contraseña: {values.Password}</label>

                            </div>

                        </div>
                    </div>



                </div>
            </div>
        </div>


    )
}