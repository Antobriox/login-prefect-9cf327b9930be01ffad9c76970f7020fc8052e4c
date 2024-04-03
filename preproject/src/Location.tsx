import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { InputText } from 'primereact/inputtext';
import Table from './table'; // Importar el componente Table
import ButtonEditLocation from './ButtonEditLocation';

type FormsProps = {};

const Location: React.FC<FormsProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      console.log('Realizar búsqueda con:', searchValue);
    }
  };

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



export default Location;
