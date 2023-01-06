import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AlertaFalloRegistro } from "../Componentes/AlertaFalloRegistro";
import { AlertaRegistroExitoso } from "../Componentes/AlertaRegistroExitoso";
import { AlertaUsuarioDuplicado } from "../Componentes/UsuarioDuplicado";
import { Dashboard } from "../Dashboard/DashboardAdmin"
import UserIcon from "../Imagenes/UserIcon.png"


export const RegistrarBecario = () => {

    const [UsuarioDuplicado, SetDuplicadoUsuario] = useState(0);

    /*------------Parte de los permisos------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    const TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 : parseInt(cookie.get("TipoUsuario"));
    console.log(TipoUsuario);

    switch (TipoUsuario) {

        case 2:

            navigate("/Becario");
            break;

        case 3:
            navigate("/Cuenca");

            break;

        case 0:
            navigate("/");
    }

    const [Formulario, SetFormulario] = useState({
        Nombre: '',
        ApePaterno: '',
        ApeMaterno: '',
        Usuario: '',
        Carrera: '',
        Email: '',
        Escuela: '',
        Celular: '',
        Tutor: '',
        Password: '',
        ConfPassword: '',
        Vigencia: ''
    });

    const [StatusRespuesta, SetStatus] = useState(0);

    const handleChange = ({ target }) => {
        SetFormulario({
            ...Formulario,
            [target.name]: target.value
        })
        if(target.name == "Usuario"){
            VerificarUsuario(target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Formulario.Nombre.trim() != "" && Formulario.ApePaterno.trim() != "" && Formulario.ApePaterno.trim() != "" && Formulario.Usuario.trim() != "" && Formulario.Carrera.trim() != "" && Formulario.Email.trim() != "" && Formulario.Escuela.trim() != "" && Formulario.Celular.trim() != "" && Formulario.Tutor.trim() != "" && Formulario.Password.trim() != "") {
            //console.log("Envia los datos de Registro");


            const formdatalogin = new FormData();
            formdatalogin.append('username', Formulario.Usuario);
            formdatalogin.append('pass', Formulario.Password);

            /*Reemplazo de peticion Fetch*/

            fetch(`https://becatransportecuitzeo2021-2024.com/login`, {
                method: "POST",
                body: formdatalogin
            })
                .then(ResponseRaw => {
                    //console.log(ResponseRaw);
                    if (ResponseRaw.ok) {
                        return ResponseRaw.json();
                    }
                    return Promise.reject(ResponseRaw);
                })
                .then(RespuestaLogin => {



                    console.log(RespuestaLogin);

                    const IdLogin = RespuestaLogin.results.lastId;

                    console.log(IdLogin);

                    //Obteniendo el archivo para subirla

                    let archivo = document.getElementById("ImagenInput").files[0];

                    const formdatausuario = new FormData();
                    formdatausuario.append("nombre", Formulario.Nombre);
                    formdatausuario.append("apellido_paterno", Formulario.ApePaterno);
                    formdatausuario.append("apellido_materno", Formulario.ApeMaterno)
                    formdatausuario.append("telefono", Formulario.Celular);
                    formdatausuario.append("correo", Formulario.Email);
                    formdatausuario.append("id_login", IdLogin);
                    formdatausuario.append("escuela", Formulario.Escuela)
                    formdatausuario.append("img", archivo);
                    formdatausuario.append("Carrera", Formulario.Carrera);

                    //console.log(formdatausuario);


                    fetch(encodeURI(`https://becatransportecuitzeo2021-2024.com/api-transporte/estudiantes`), {
                        method: 'POST',
                        body: formdatausuario
                    })
                        .then(RespuestaRawEstudiante => {
                            if (RespuestaRawEstudiante.ok) {
                                return RespuestaRawEstudiante.json();
                            }
                            return Promise.reject(RespuestaRawEstudiante);
                        })
                        .then(RespuestaUsuario => {
                            console.log(RespuestaUsuario);

                            if (RespuestaUsuario.status == "200") {
                                SetStatus("200");
                            }
                            else {
                                SetStatus("404");
                            }



                            SetFormulario({
                                Nombre: '',
                                ApePaterno: '',
                                ApeMaterno: '',
                                Usuario: '',
                                Carrera: '',
                                Email: '',
                                Escuela: '',
                                Celular: '',
                                Tutor: '',
                                Password: '',
                                ConfPassword: '',
                                Vigencia: ''
                            })

                            let imagenPrevisualizacion = document.querySelector("#imgPreview");
                            imagenPrevisualizacion.src = UserIcon;
                        })

                })

            /* Finaliza el reemplazo */

            /*
                        const RespuestaRawLogin = await fetch(`https://becatransportecuitzeo2021-2024.com/api-transporte/login`, {
                            method: 'POST',
                            body: formdatalogin
                        });
            
                        const RespuestaLogin = await RespuestaRawLogin.json();
            
                        console.log(RespuestaLogin);
            
                        const IdLogin = RespuestaLogin.results.lastId;
            
                        console.log(IdLogin);
            
                        //Obteniendo el archivo para subirla
            
                        let archivo = document.getElementById("ImagenInput").files[0];
            
                        const formdatausuario = new FormData();
                        formdatausuario.append("nombre", Formulario.Nombre);
                        formdatausuario.append("apellido_paterno", Formulario.ApePaterno);
                        formdatausuario.append("apellido_materno", Formulario.ApeMaterno)
                        formdatausuario.append("telefono", Formulario.Celular);
                        formdatausuario.append("correo", Formulario.Email);
                        formdatausuario.append("id_login", IdLogin);
                        formdatausuario.append("escuela", Formulario.Escuela)
                        formdatausuario.append("img", archivo);
                        formdatausuario.append("Carrera", Formulario.Carrera);
            
                        //console.log(formdatausuario);
            
            
                        const RespuestaRawUsuario = await fetch(encodeURI(`https://becatransportecuitzeo2021-2024.com/api-transporte/estudiantes`), {
                            method: 'POST',
                            body: formdatausuario
                        });
            
                        const RespuestaUsuario = await RespuestaRawUsuario.json();
            
                        console.log(RespuestaUsuario);
            
                        if (RespuestaUsuario.status == "200") {
                            SetStatus("200");
                        }
                        else {
                            SetStatus("404");
                        }
            
            
            
                        SetFormulario({
                            Nombre: '',
                            ApePaterno: '',
                            ApeMaterno: '',
                            Usuario: '',
                            Carrera: '',
                            Email: '',
                            Escuela: '',
                            Celular: '',
                            Tutor: '',
                            Password: '',
                            ConfPassword: '',
                            Vigencia: ''
                        })
            
                        let imagenPrevisualizacion = document.querySelector("#imgPreview");
                        imagenPrevisualizacion.src = UserIcon;
            
            */
        }
    }

    const onChangeImg = () => {


        let $SeleccionArchivo = document.querySelector("#ImagenInput"), $imagenPrevisualizacion = document.querySelector("#imgPreview");

        const archivos = $SeleccionArchivo.files;

        console.log(archivos);
        //console.log($SeleccionArchivo.name);

        if (!archivos || !archivos.length) {
            //$imagenPrevisualizacion.src = "";
            return;
        }
        else {

            // Ahora tomamos el primer archivo, el cual vamos a previsualizar
            const primerArchivo = archivos[0];
            // Lo convertimos a un objeto de tipo objectURL
            const objectURL = URL.createObjectURL(primerArchivo);
            // Y a la fuente de la imagen le ponemos el objectURL
            $imagenPrevisualizacion.src = objectURL;
        }

    }

    const SeleccionarImagen = () => {
        document.getElementById("ImagenInput").click();
    }

    const VerificarUsuario = (Usuario) => {
        //console.log(Formulario.Usuario)
        fetch(`https://becatransportecuitzeo2021-2024.com/api-transporte/login?select=username&linkTo=username&equalTo=${Usuario}`, {
            method: "GET"
        })
        .then(ResponseRaw => {
            if(ResponseRaw.ok) {
                return ResponseRaw.json();
            }
            SetDuplicadoUsuario(0);
            return Promise.reject(ResponseRaw);
        })
        .then(RespuestaDuplicado => {
            SetDuplicadoUsuario(1);
        }).catch(err => {
            console.log("No existe el usuario");
        })
    }

    return (
        <>
            <Dashboard />
            <div className="container pt-5 mt-2">
                <h2>RegistrarBecario</h2>

                {StatusRespuesta != "" ? (StatusRespuesta == "200" ? <AlertaRegistroExitoso /> : <AlertaFalloRegistro />) : ""}
                {UsuarioDuplicado == 0 ? "" : <AlertaUsuarioDuplicado />}
                <div className="card shadow">

                    <div className="card-body">

                        <form>
                            <div className="row">

                                <div className="col-lg-5 d-flex d-sm-flex d-md-flex d-lg-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center">

                                    <div className="row">

                                        <div className="col-12 ApartadoImagen">
                                            <img id="imgPreview" src={UserIcon} className="img-thumbnail rounded image" width="350px" height="350px" onClick={SeleccionarImagen} />
                                            <div className="middle" onClick={SeleccionarImagen}>
                                                <h1>
                                                    <svg className="Camera-icon" xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </h1>
                                            </div>
                                        </div>

                                    </div>

                                    <br />
                                    <div className="row">
                                        <div className="col-12 col-md-12">
                                            <input type="file" id="ImagenInput" className="form-control" onChange={onChangeImg} required />
                                        </div>

                                    </div>
                                </div >

                                <div name="InfoDiv" className="col-lg-7 col-md-7">
                                    <div className="row">

                                        <div className="col-12 col-md-6">
                                            <label>Nombre</label>
                                            <input type="text" name="Nombre" className="form-control form-control-user" value={Formulario.Nombre} onChange={handleChange} placeholder="Nombre" required />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>Apellido Paterno</label>
                                            <input type="text" name="ApePaterno" className="form-control form-control-user" value={Formulario.ApePaterno} onChange={handleChange} placeholder="Apellido Paterno" required />
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <label>Apellildo Materno</label>
                                            <input type="text" name="ApeMaterno" className="form-control form-control-user" value={Formulario.ApeMaterno} onChange={handleChange} placeholder="Apellido Materno" required />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>Celular</label>
                                            <input type="text" name="Celular" className="form-control form-control-user" value={Formulario.Celular} onChange={handleChange} placeholder="Celular" required />
                                        </div>

                                        <div className="row pt-2">



                                            <div className="col-12 col-md-6">
                                                <label>Instituto o Universidad</label>
                                                <input type="text" name="Escuela" className="form-control form-control-user" value={Formulario.Escuela} onChange={handleChange} placeholder="Universidad o Institucion" required />
                                            </div>

                                            <div className="col-12 col-md-6">
                                                <label>Carrera</label>
                                                <input type="text" name="Carrera" className="form-control form-control-user" value={Formulario.Carrera} onChange={handleChange} placeholder="Carrera" required />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row pt-2">



                                        <div className="col-12 col-md-12">
                                            <label>Nombre del Tutor</label>
                                            <input type="text" name="Tutor" className="form-control form-control-user" value={Formulario.Tutor} onChange={handleChange} placeholder="Nombre del Tutor" required />
                                        </div>

                                    </div>

                                    <div className="row pt-2">

                                        <div className="col-12 col-md-6">
                                            <label>Nombre Usuario</label>
                                            <input type="text" name="Usuario" className="form-control form-control-user" value={Formulario.Usuario} onChange={handleChange} placeholder="Nombre de Usuario" required />
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <label>Contraseña</label>
                                            <input type="text" name="Password" className="form-control form-control-user" value={Formulario.Password} onChange={handleChange} placeholder="Contraseña" required />
                                        </div>

                                    </div>

                                    <div className="row pt-2">

                                        <div className="col-12 col-md-12">
                                            <label>Correo Electronico</label>
                                            <input type="text" name="Email" className="form-control form-control-user" value={Formulario.Email} onChange={handleChange} placeholder="Correo Electronico" required />
                                        </div>

                                    </div>

                                    <div className="row pt-2">

                                        <div className="col-12 col-md-12">
                                            <button className="btn btn-primary btn-Registro-Becario d-block d-xxl-flex justify-content-xxl-center align-items-xxl-center btn-user w-100" onClick={handleSubmit}>Guardar</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}