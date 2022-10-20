import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { TransporteQR } from './TransporteQR';
import { Login } from './Login/login';
import { RutasAdmin } from './Rutas/RutasAdmin';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <React.StrictMode>
            <RutasAdmin />
      </React.StrictMode>
);



