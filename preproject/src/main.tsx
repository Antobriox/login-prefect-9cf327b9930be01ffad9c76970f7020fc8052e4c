import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import RoutesContainer from './Routes'; // Importamos el componente RoutesContainer
import axios from 'axios';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css'

//axios.defaults.baseURL = 'https://47ng574z-5000.use2.devtunnels.ms/'
//axios.defaults.baseURL = 'https://19v1tsxj-5000.brs.devtunnels.ms/'
axios.defaults.baseURL = 'https://pc34z34x-5000.use2.devtunnels.ms/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
    <RoutesContainer /> {/* Renderizamos el componente RoutesContainer */}
    </PrimeReactProvider>
  </React.StrictMode>,
);
