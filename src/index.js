import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import { Offcanvas } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Login } from './Login/login';
import { MainPage } from './Main/MainPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);


