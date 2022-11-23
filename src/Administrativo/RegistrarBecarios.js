import { useState } from "react"
import { AlertaFalloRegistro } from "../Componentes/AlertaFalloRegistro";
import { AlertaRegistroExitoso } from "../Componentes/AlertaRegistroExitoso";
import { Dashboard } from "../Dashboard/DashboardAdmin"
import { DashboardGeneral } from "../Dashboard/DashboardGeneral"


export const RegistrarBecario = () => {

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

    const handleChange = ({target}) => {
        SetFormulario({...Formulario,
            [target.name] : target.value
        })
    }

    const handleSubmit = async () => {

        const formdatalogin = new FormData();
        formdatalogin.append('username', Formulario.Usuario);
        formdatalogin.append('pass', Formulario.Password);

        const RespuestaRawLogin = await fetch(`https://transportesflores.info/api-transporte/login`, {
            method: 'POST',
            body: formdatalogin
        });

        const RespuestaLogin = await RespuestaRawLogin.json();

        console.log(RespuestaLogin);

        const IdLogin = RespuestaLogin.results.lastId;

        console.log(IdLogin);

        const formdatausuario = new FormData();
        formdatausuario.append("nombre", Formulario.Nombre);
        formdatausuario.append("apellido_paterno", Formulario.ApePaterno);
        formdatausuario.append("apellido_materno", Formulario.ApeMaterno)
        formdatausuario.append("telefono", Formulario.Celular);
        formdatausuario.append("correo", Formulario.Email);
        formdatausuario.append("id_login", IdLogin);
        formdatausuario.append("escuela", Formulario.Escuela)
        formdatausuario.append("img", "");
        formdatausuario.append("Carrera", Formulario.Carrera);

        //console.log(formdatausuario);
        

        const RespuestaRawUsuario = await fetch(`https://transportesflores.info/api-transporte/estudiantes`, {
            method: 'POST',
            body: formdatausuario
        });

        const RespuestaUsuario = await RespuestaRawUsuario.json();

        console.log(RespuestaUsuario);

        if(RespuestaUsuario.status == "200"){
            SetStatus("200");
        }
        else{
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
    }

    const Alerta = () => {
        switch(StatusRespuesta){
            case 200:
                return(
                    <AlertaRegistroExitoso />
                )
                break;
            case 404:
                return (
                    <AlertaFalloRegistro />
                    )
                break;

                default:
                    return;
                    break;
        }
    }

    let $SeleccionArchivo = document.querySelector("#Imagen"), $imagenPrevisualizacion = document.querySelector("#imgPreview");

    const onChangeImg = () => {
        
        const archivos = $SeleccionArchivo.files;

        //console.log($SeleccionArchivo.name);
        //console.log($SeleccionArchivo.name);

        if (!archivos || !archivos.length) {
            $imagenPrevisualizacion.src = "";
            return;
        }
          // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        const primerArchivo = archivos[0];
          // Lo convertimos a un objeto de tipo objectURL
        const objectURL = URL.createObjectURL(primerArchivo);
          // Y a la fuente de la imagen le ponemos el objectURL
        $imagenPrevisualizacion.src = objectURL;


    }



    return (
        <>
            <Dashboard />
            {/*<DashboardGeneral />*/}
            <div  className="container pt-5 mt-2">
                <h2>RegistrarBecario</h2>

                {StatusRespuesta != "" ? (StatusRespuesta == "200" ? <AlertaRegistroExitoso /> : <AlertaFalloRegistro />) : ""}

                <div className="card shadow">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-lg-5 d-flex d-sm-flex d-md-flex d-lg-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center">

                                <div className="row">

                                    <div className="col-12">
                                    <img id="imgPreview" className="img-thumbnail rounded" width="350px" height="350px"/>
                                    </div>
                                

                                </div>

                                <br />
                                <div className="row">
                                    <div className="col-12 col-md-12">
                                    <input type="file" id="Imagen" className="form-control" onChange={onChangeImg} />
                                    </div>
                                
                                </div>
                            </div >

                            <div name="InfoDiv" className="col-lg-7 col-md-7">
                                <div className="row">

                                    <div className="col-12 col-md-6">
                                        <label>Nombre</label>
                                        <input type="text" name="Nombre" className="form-control form-control-user" onChange={handleChange} placeholder="Nombre" />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label>Apellido Paterno</label>
                                        <input type="text" name="ApePaterno" className="form-control form-control-user" onChange={handleChange} placeholder="Apellido Paterno" />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <label>Apellildo Materno</label>
                                        <input type="text" name="ApeMaterno" className="form-control form-control-user" onChange={handleChange} placeholder="Apellido Materno" />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label>Carrera</label>
                                        <input type="text" name="Carrera" className="form-control form-control-user" onChange={handleChange} placeholder="Carrera" />
                                    </div>
                                </div>

                                <div className="row pt-2">

                                    <div className="col-12 col-md-6">
                                        <label>Nombre Usuario</label>
                                        <input type="text" name="Usuario" className="form-control form-control-user" onChange={handleChange} placeholder="Nombre de Usuario" />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label>Instituto o Universidad</label>
                                        <input type="text" name="Escuela" className="form-control form-control-user" onChange={handleChange} placeholder="Universidad o Institucion" />
                                    </div>

                                </div>

                                <div className="row pt-2">

                                    <div className="col-12 col-md-6">
                                        <label>Celular</label>
                                        <input type="text" name="Celular" className="form-control form-control-user" onChange={handleChange} placeholder="Celular" />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label>Nombre del Tutor</label>
                                        <input type="text" name="Tutor" className="form-control form-control-user" onChange={handleChange} placeholder="Nombre del Tutor" />
                                    </div>

                                </div>

                                <div className="row pt-2">

                                    <div className="col-12 col-md-6">
                                        <label>Contraseña</label>
                                        <input type="text" name="Password" className="form-control form-control-user" onChange={handleChange} placeholder="Contraseña" />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label>Repetir la Contraseña</label>
                                        <input type="text" name="ConfPassword" className="form-control form-control-user" onChange={handleChange} placeholder="Repetir la contraseña" />
                                    </div>

                                </div>

                                <div className="row pt-2">

                                    <div className="col-12 col-md-12">
                                        <label>Correo Electronico</label>
                                        <input type="text" name="Email" className="form-control form-control-user" onChange={handleChange} placeholder="Correo Electronico" />
                                    </div>

                                </div>

                                <div className="Div-Vigencia-Registro">
                                    <h4 className="text-center text-dark mb-4 Div-Vigencia-Registro-Msj">
                                        <strong>
                                            <span className="Span-Vigencia-Registro">Vigencia</span>
                                        </strong>
                                    </h4>
                                </div>

                                <div className="row ">

                                    <div className="col-12 col-md-12">
                                        
                                        <input type="date" name="Vigencia" className="form-control form-control-user"  onChange={handleChange}  placeholder="Correo Electronico" />
                                    </div>

                                </div>

                                <div className="row pt-2">

                            <div className="col-12 col-md-12">
                                <button className="btn btn-primary btn-Registro-Becario d-block d-xxl-flex justify-content-xxl-center align-items-xxl-center btn-user w-100" onClick={handleSubmit}>Guardar</button>
                            </div>

                            <div className="col-12 col-md-12">
                                <label>Nombre: {Formulario.Nombre}</label> <br />
                                <label>ApePaterno: {Formulario.ApePaterno}</label>
                                <br />
                                <label>ApeMarterno: {Formulario.ApeMaterno}</label>
                                <br />
                                <label>Carrera: {Formulario.Carrera}</label>
                                <br />
                                <label>Usuario: {Formulario.Usuario}</label>
                                <br />
                                <label>Instituto o Universidad: {Formulario.Escuela}</label>
                                <br />
                                <label>Celular: {Formulario.Celular}</label>
                                <br />
                                <label>Tutor: {Formulario.Tutor}</label>
                                <br />
                                <label>Password: {Formulario.Password}</label>
                                <br />
                                <label>Confirm Passwor: {Formulario.ConfPassword}</label>
                                <br />
                                <label>Email: {Formulario.Email}</label>
                                <br />
                                <label>Vigencia: {Formulario.Vigencia}</label>
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