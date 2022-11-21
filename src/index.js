import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { RutasPrincipales } from './Routes/RutasPrincipales';
import { Login } from './Login/login';
import { RutasGen } from './Rutas/RutasGeneral';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <React.StrictMode>
            <RutasPrincipales />
      </React.StrictMode>
);



