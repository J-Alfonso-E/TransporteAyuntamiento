import { Link } from "react-router-dom";
//import { RutasPrueba } from "../Rutas/RutasPrivadas";


export const DashboardGeneral = () => {
    return (

        <>

            <nav className="navbar bg-light fixed-top" >
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <button className="btn btn-primary btn-cerrar-sesion "> Cerrar Session</button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end ">

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Admimistrativo
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/">Principal</Link></li>
                                        <li><Link className="dropdown-item" to="/ListaBecarios">Lista de Becarios</Link></li>
                                        <li><Link className="dropdown-item" to="/RegistrarBecario">Registrar Becario</Link></li>
                                        

                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Becario
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/PrincipalBecario">Principal Becario</Link></li>

                                    <li><Link className="dropdown-item" to="/InformacionBecario">InformacionBecario</Link></li>


                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Cuenca
                                    </a>
                                    <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/PrincipalCuenca">Principal Cuenca</Link></li>


                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </>

    )
}