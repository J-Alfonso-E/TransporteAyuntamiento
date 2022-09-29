import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { MainPage } from './Administrativo/MainPage';
//import { RutasPrueba } from './Rutas/RutasAdmin';
import { RutasBecario } from './Rutas/RutasBecario';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      
      <React.StrictMode>
            <RutasBecario />
</React.StrictMode>
);



