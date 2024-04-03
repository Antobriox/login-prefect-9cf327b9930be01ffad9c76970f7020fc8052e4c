import React, { useState } from 'react';
import Table from './table';
import { InputText } from 'primereact/inputtext';

const Build = () => {
    const [showButtonLocation, setShowButtonLocation] = useState(false); 
    const [showForm, setShowForm] = useState(false); 
    const [locations, setLocations] = useState<any[]>([]); 
    const [selectedProvince, setSelectedProvince] = useState<string>(''); 
    const [selectedCity, setSelectedCity] = useState<string>(''); 
    const [selectedParish, setSelectedParish] = useState<string>(''); 
    const [selectedComunity, setSelectedComunity] = useState<string>(''); 
    const [comunidad, setComunidad] = useState<string>(''); 
    const [addSite, setAddSite] = useState<boolean>(false); 
    const [site, setSite] = useState<string>(''); 
const [data, setData] = useState([]);
const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

// Componente funcional MyComponent
const Build: React.FC<MyComponentProps> = ({ }) => {
    let search = '';
    if (location.pathname === '/forms') {
      search = 'Buscar formularios';
    } else if (location.pathname === '/location') {
      search = 'Buscar localizaciones';
    } else if (location.pathname === '/user') {
      search = 'Buscar usuarios';
    }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div>
        <div style={{ padding: '1rem', width: '100%', maxWidth: '600px', textAlign: 'center', marginTop: '60px' }}>
        <img src="/img/logogris2.png" alt="Logo" className="logo" style={{ width: '80%', maxWidth: '300px', height: 'auto', marginBottom: '1rem' }} />
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{search}</div>
        {/* Agregamos el campo de búsqueda */}
        <InputText value={searchTerm} onChange={handleSearch} placeholder="Buscar" className="p-inputtext" style={{ borderRadius: '20px', backgroundColor: 'white', color: 'black', fontSize: '1rem', margin: '1rem' }} />
      </div>
     <Table view={''}>
        
        </Table>
    </div>
  );
};

export default Build;
