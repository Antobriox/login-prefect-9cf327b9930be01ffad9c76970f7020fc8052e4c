import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Table from './table'; // Importar el componente Table

type FormsProps = {};

const Forms: React.FC<FormsProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al autenticar:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    fetchAuthentication();
  }, [navigate]);


  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, width: '100%' }}>
        <Navbar />
      </div>
      
        <div style={{ overflowX: 'auto', width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <Table view={''} />
        </div>
        </div>

  );
};

export default Forms;
