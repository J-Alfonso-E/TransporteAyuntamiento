import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { MainPage } from './Administrativo/MainPage';
//import { RutasPrueba } from './Rutas/RutasAdmin';
//import { RutasBecario } from './Rutas/RutasBecario';
import { RutasCuenca } from './Rutas/RutasCuenca';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      
      <React.StrictMode>
            <RutasCuenca />
</React.StrictMode>
);



