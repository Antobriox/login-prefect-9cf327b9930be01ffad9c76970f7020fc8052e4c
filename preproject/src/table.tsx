// Table.tsx
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios, { AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';
import tableColumns from './Formstable';
import ButtonComponent from './ButtonComponent';
import ButtonEditLocation from './ButtonEditLocation';
import ButtonLocation from './ButtonLocation';
import ButtonUser from './ButtonUser';
import EditIcon from './icon/editIcon';

interface TableProps {
  view: string;
}

const Table: React.FC<TableProps> = ({ }) => {
  const location = useLocation(); // Obtiene la ubicación actual
  let columns: any[] = [];

  // Selecciona las columnas según la ubicación actual
  if (location.pathname === '/forms') {
    columns = tableColumns.forms;
  } else if (location.pathname === '/user') {
    columns = tableColumns.User;
  } else if (location.pathname === '/location') {
    columns = tableColumns.locations;
  }

  let title = '';
  if (location.pathname === '/forms') {
    title = 'Lista de formularios';
  } else if (location.pathname === '/location') {
    title = 'Lista de localizaciones';
  } else if (location.pathname === '/user') {
    title = 'Lista de usuarios';
  }
  let search = '';
  if (location.pathname === '/forms') {
    search = 'Buscar formularios';
  } else if (location.pathname === '/location') {
    search = 'Buscar localizaciones';
  } else if (location.pathname === '/user') {
    search = 'Buscar usuarios';
  }
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        let response: AxiosResponse<any, any> = {
          data: {},
          status: 0,
          statusText: '',
          header: undefined,
          config: undefined
        }; // Inicializar response con un valor predeterminado

        if (location.pathname === '/forms') {
          response = await axios.get('https://api.example.com/forms', config);
        } else if (location.pathname === '/user') {
          response = await axios.get('/user/', config);
          setData(response.data.data.users); // Almacena el token en localStorage
        } else if (location.pathname === '/location') {
          response = await axios.get('location/admin', config);
          setData(response.data.data);
        }

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [location.pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const blueHeaderStyle = { background: '#324148', color: '#fff', border: '1px solid #ccc' };
  const whiteDataStyle = { background: '#fff', color: '#000', border: '1px solid #ccc', padding: '1rem' };

  function handleDelete(rowData: any): void {
    throw new Error('Function not implemented.');
  }

  function handleEdit(rowData: any): void {
    throw new Error('Function not implemented.');
  }

  const menu = useRef(null);

  return (
    <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ padding: '1rem', width: '100%', maxWidth: '600px', textAlign: 'center', marginTop: '60px' }}>
        <img src="/img/logogris2.png" alt="Logo" className="logo" style={{ width: '80%', maxWidth: '300px', height: 'auto', marginBottom: '1rem' }} />
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{search}</div>
        {/* Agregamos el campo de búsqueda */}
        <InputText value={searchTerm} onChange={handleSearch} placeholder="Buscar" className="p-inputtext" style={{ borderRadius: '20px', backgroundColor: 'white', color: 'black', fontSize: '1rem', margin: '1rem' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '1200px', backgroundColor: '#ffffff', borderRadius: '8px', padding: '1rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#324148', textAlign: 'left' }}>{title}</h2>
        {location.pathname === '/forms' ? <ButtonComponent /> : null}
        {location.pathname === '/user' ? <ButtonUser /> : null}
        {location.pathname === '/location' ? <ButtonLocation /> : null}
        {/* {location.pathname === '/location' ? <ButtonEditLocation /> : null} */}
      </div>
      <div style={{ overflowX: 'auto', width: '100%', maxWidth: '1200px', margin: '5px' }}>
        <DataTable
          value={filteredData}
          className="p-datatable-lines p-datatable-striped"
          style={{ width: '100%' }}
          paginator
          rows={10} // Muestra 10 registros por página
          emptyMessage="No hay registros para mostrar"
        >
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} style={{ ...blueHeaderStyle, width: '12.5%' }} bodyStyle={whiteDataStyle} />
          ))}
          <Column
            header="Acciones"
            
            body={(rowData) => (
              <div 
                onClick={() => console.log(rowData)}
              >
                <EditIcon 
                community={rowData.community} 
                site={rowData.site} 
                city={rowData.city} 
                country={rowData.country} 
                parish={rowData.parish} 
                province={rowData.province}
                status={rowData.status}  
/>              </div>
            )}
            style={{ width: '12.5%', textAlign: 'center' }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
