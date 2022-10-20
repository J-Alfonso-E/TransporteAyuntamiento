import { types } from "./types";
import { UsuariosPruebas } from "./UsuariosPruebas";


export const authReducer = (state = {}, action ) => {
    console.log("Comparativa");
    console.log(UsuariosPruebas.length);
    console.log(action);
    console.log(types);
    
    switch (action.logged) {
        case types.login:
            for (let i = 0; i < UsuariosPruebas.length; i++){
                console.log("Ciclo for");
                if(action.Usuario === UsuariosPruebas[i].Usuario && action.Password === UsuariosPruebas[i].Password){
                    return {
                        ...action,
                        Permiso: UsuariosPruebas[i].Permiso,
                        logged: true
                }
            }
            /*
            }*/
        }
            break;

        case types.logout:
            return {
                logged: false
            }
    
        default:
            return state;
    }

}