import { useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Dashboard } from "../Dashboard/DashboardAdmin"

export const ListaBecarios = () => {

    /*------------Parte de los permisos------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    const TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 : parseInt(cookie.get("TipoUsuario"));
    //console.log(TipoUsuario);

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

    const [DatosBusqueda, SetBusqueda] = useState({

        Instituto: "",
        Carrera: ""
    });

    const [DatosApi, SetDatosApi] = useState({}); // Almacena los datos de la api para poder aplicar los filtros

    const [DatosApiFiltro, SetDatosApiFiltro] = useState(); // Almacena una copia con filtro de mostrarlo en el datatable

    const [CampoBusqueda, SetCampoBusqueda] = useState(); //Se utilizara para el valor de busqueda



    const [IdEstudiante, SetIdEstudiante] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        Carrera: "",
        Escuela: ""
    });

    const [EstudianteBaja, SetEstudianteBaja] = useState({
        Nombre: "",
        ApeP: "",
        ApeM: ""
    });



    /* ---------- La funcion e Busqueda trae todos los datos */

    const Busqueda = () => {

        fetch(encodeURI(`https://becatransportecuitzeo2021-2024.com/api-transporte/estudiantes?linkTo=Activo&equalTo=1`), {
            method: 'GET',
        }).then(RespuestaRaw => RespuestaRaw.json())
            .then(Respuesta => {
                SetDatosApi(
                    Respuesta.results.map(Registro => {
                        return {
                            ...Registro,
                            Opciones: <h5> <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#ModalEjemplo" aria-hidden="true" onClick={() => InfoEstudiante(Registro)}></i> <i className="bi bi-person-x" data-bs-toggle="modal" data-bs-target="#ModalBajaBecario" onClick={() => DatosBajaModal(Registro.id_estudiante, Registro.nombre, Registro.apellido_paterno, Registro.apellido_materno)}></i> </h5>,
                            Imagen: <img width="100px" heigth="100px" src={`./api-transporte/${Registro.img}`} />
                        }
                    })
                )

                SetDatosApiFiltro(
                    Respuesta.results.map(Registro => {
                        return {
                            ...Registro,
                            Opciones: <h5> <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#ModalEjemplo" aria-hidden="true" onClick={() => InfoEstudiante(Registro)}></i> <i className="bi bi-person-x" data-bs-toggle="modal" data-bs-target="#ModalBajaBecario" onClick={() => DatosBajaModal(Registro.id_estudiante, Registro.nombre, Registro.apellido_paterno, Registro.apellido_materno)}></i> </h5>,
                            Imagen: <img width="100px" heigth="100px" src={`./api-transporte/${Registro.img}`} />
                        }
                    })
                );

            })
    }

    /* -------------Hace el filtrado de los datos ------------------- */
    const SearchEnhaced = ({ target }) => {

        //console.log(target.value);

        if (target.value === "") {
            SetDatosApiFiltro(DatosApi);
        }
        else {

            SetDatosApiFiltro([]);
            //console.log(DatosApiFiltro);
            let Tabla = [];
            DatosApi.map(Registro => {
                if (Registro.nombre.toLowerCase().includes(target.value.toLowerCase()) || Registro.apellido_paterno.toLowerCase().includes(target.value.toLowerCase()) || Registro.apellido_materno.toLowerCase().includes(target.value.toLowerCase())) { // Agrega el registro si la cadena coindice parcialmente con el nombre ya pellidos
                    //console.log(Registro);
                    Tabla.push(Registro);
                    
                }
            });
            
            SetDatosApiFiltro(Tabla);

            //console.log(DatosApiFiltro);
        }
    }


    const DatosBajaModal = (IdEstudianteBaja, nombre, apellido_paterno, apellido_materno) => {
        SetEstudianteBaja({
            id: IdEstudianteBaja,
            Nombre: nombre,
            ApeP: apellido_paterno,
            ApeM: apellido_materno
        });
    }

    const EliminarUsuario = () => {

        //Datos para dar de baja al Becario
        const DatosBaja = new FormData();
        DatosBaja.append("Activo", 0);

        //Modificando el State para el mensaje del modal

        fetch(`https://becatransportecuitzeo2021-2024.com/api-transporte/estudiantes?id=${EstudianteBaja.id}&nameId=id_estudiante&edit=1`, {
            method: 'POST',
            body: DatosBaja
        }).then(RespuestaRaw => RespuestaRaw.json())
            .then(Respuesta => {
                /*
                console.log(Respuesta);
                console.log("Se ha dado de baja un Becario");
                */
            });

        Actualizar();
        //alert("¿Quiere eliminar el usuario " +Nombre);
    }

    useEffect(() => {
        Busqueda();
    }, []);

    const InfoEstudiante = async (value) => {
        //console.log(value);
        SetIdEstudiante(value);
    }

    const HandleChange = ({ target }) => {
        SetIdEstudiante({
            ...IdEstudiante,
            [target.name]: target.value
        })
    }

    const Actualizar = async () => {
        //console.log("Actualizando el registro");
        let archivoImagen = document.getElementById("ImgPerfil").files[0];
        const Datos = new FormData();

        Datos.append("nombre", IdEstudiante.nombre);
        Datos.append("apellido_paterno", IdEstudiante.apellido_paterno);
        Datos.append("apellido_materno", IdEstudiante.apellido_materno);
        Datos.append("telefono", IdEstudiante.telefono);
        Datos.append("correo", IdEstudiante.correo);
        Datos.append("escuela", IdEstudiante.escuela);
        Datos.append("Carrera", IdEstudiante.Carrera);

        //console.log(archivoImagen);

        if(typeof archivoImagen != "undefined"){
            //console.log("No un archivo");
            Datos.append("img", archivoImagen);
        }



        const ruta = `https://becatransportecuitzeo2021-2024.com/api-transporte/estudiantes?id=${IdEstudiante.id_estudiante}&nameId=id_estudiante&edit=1`;

        //console.log(ruta);

        const RespuestaRaw = await fetch(encodeURI(ruta), {
            method: "POST",
            body: Datos
        });

        const Respuesta = await RespuestaRaw.json();

        //console.log(Respuesta);
        

        Busqueda();

    }



    const columnasBecarios = [

        {
            name: "",
            selector: row => row.Imagen
        },

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
            name: "Tutor",
            selector: row => row.Tutor
        },

        {
            name: "Opciones",
            selector: row => row.Opciones
        },
    ]



    return (
        <>
            <Dashboard />
            <div className="container pt-5 mt-2">
                <h2 className="LoginSection">Lista de Becarios</h2>

                <div className="card shadow">

                    <div className="card-header">
                        <p> Información acerca de los Becarios</p>

                    </div>

                    <div className="card-body">

                        <div className="row pt-3">
                            <div className="form-group col-md-3">
                                <label className="form-label">Buscar</label>
                                <input type="text" className="form-control" name="BusquedaAvanzada" onChange={SearchEnhaced} />
                            </div>
                        </div>

                        <div className="row pt-3 table-responsive-sm">

                            <DataTable columns={columnasBecarios} data={DatosApiFiltro} pagination/>
                        </div>
                    </div>

                </div>

            </div>
            {/*------------------Modal de Actualizar Datos------------- */}
            <div className="modal" tabindex="-1" id="ModalEjemplo">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Actualizar Datos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" name="nombre" placeholder="Nombre" value={IdEstudiante.nombre} onChange={HandleChange} />

                                </div>

                                <div className="col-12 col-md-4">
                                    <label>Apellido Paterno</label>
                                    <input type="text" className="form-control" placeholder="Apellido Paterno" name="apellido_paterno" value={IdEstudiante.apellido_paterno} onChange={HandleChange} />

                                </div>

                                <div className="col-12 col-md-4">
                                    <label>Apellido Materno</label>
                                    <input type="text" className="form-control" placeholder="Apellido Materno" name="apellido_materno" value={IdEstudiante.apellido_materno} onChange={HandleChange} />

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-12 col-md-4">
                                    <label>Carrera</label>
                                    <input type="text" className="form-control" placeholder="Carrera" name="Carrera" value={IdEstudiante.Carrera} onChange={HandleChange} />

                                </div>

                                <div className="col-12 col-md-4">
                                    <label>Instituto o Universidad</label>
                                    <input type="text" className="form-control" name="escuela" value={IdEstudiante.escuela} placeholder="Instituto o Universidad" onChange={HandleChange} />

                                </div>

                                <div className="col-12 col-md-4">
                                    <label>Imagen de Perfil</label>
                                    <input type="file" className="form-control" name="ImgPerfil" id="ImgPerfil" placeholder="Imagen de perfil" />

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={Actualizar}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------ Modal para Eliminar un Becario ------------------------ */}

            <div className="modal" tabindex="-1" id="ModalBajaBecario">

                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">¿Quiere dar de Baja al Becario {EstudianteBaja.Nombre} {EstudianteBaja.ApeP} {EstudianteBaja.ApeM}? </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={EliminarUsuario}>Dar de Baja</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}