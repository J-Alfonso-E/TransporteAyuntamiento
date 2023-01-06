import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";



export const Dashboard = () => {

    let cookie = new Cookies();
    let navigate = useNavigate();

    const CerrarSesion = () => {
        cookie.remove("Usuario");
        cookie.remove("Id");
        cookie.set("TipoUsuario", 0);

        navigate("/");
    }
    return (

        <>

            <nav className="navbar bg-light fixed-top" >
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <button className="btn btn-primary btn-cerrar-sesion" onClick={CerrarSesion}> Cerrar Session</button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end ">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/Administrativo/">Lista de Asistencia</Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link" to="/Administrativo/ListaBecarios">Administrar Becarios</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/Administrativo/RegistrarBecario">Registar Becario</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </>

    )
}