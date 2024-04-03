import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';

import Login from './pages/Login/Login';

import Forms from './Forms';
import User from './User';
import Location from './Location';

const RoutesContainer: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Ruta predeterminada para el componente App */}
        <Route path="/forms" element={<Forms />} /> {/* Ruta para el componente Forms */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/user" element={<User />} /> 
        <Route path="/location" element={<Location />} /> 
      </Routes>
    </Router>
  );
};

export default RoutesContainer;
