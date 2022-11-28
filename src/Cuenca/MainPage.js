import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { DashboardC } from "../Dashboard/DashboardCuenca"
import { DashboardGeneral } from "../Dashboard/DashboardGeneral"

export const MainPageC = () => {

    /*------------Parte de los permisos (No funciona sin alguna explicacion)------*/

    const cookie = new Cookies();
    const navigate = useNavigate();

    let TipoUsuario = isNaN(parseInt(cookie.get("TipoUsuario"))) ? 0 :parseInt(cookie.get("TipoUsuario"));
    console.log(TipoUsuario);
    console.log(isNaN(cookie.get("TipoUsuario")));
    console.log(isNaN(TipoUsuario));
    console.log(TipoUsuario == 2 ? "Becario" : "Es otro");

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
    
    return (
        <>
            <DashboardC />
            {/*<DashboardGeneral />*/}
            <div className="container mt-5 pt-2">
                <h2>Asistencia del día </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">Nombre</th>
                            <th scope="row">Primera Asistencia</th>
                            <th scope="row">Segunda Asistencia</th>
                        </tr>
                    </thead>

                </table>

            </div>

        </>
    )
}