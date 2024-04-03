import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';

const ButtonLocation: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedParish, setSelectedParish] = useState<string>('');
    const [selectedComunity, setSelectedComunity] = useState<string>('');
    const [comunidad, setComunidad] = useState<string>('');
    const [addSite, setAddSite] = useState<boolean>(false);
    const [site, setSite] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/location/data');
            if (response && response.data && response.data.data && response.data.data.length > 0) {
                setLocations(response.data.data);
            } else {
                console.error('Error: No se encontraron datos válidos en la respuesta');
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const onHide = () => {
        setShowForm(false);
    };

    const handleGuardar = async () => {
        try {
            const response = await axios.post('/location/create', {
                name: comunidad,
                parish_name: selectedParish,
                city_name: selectedCity, // Corregido: Cambiado de 'city' a 'city_name'
                province_name: selectedProvince, // Corregido: Cambiado de 'province' a 'province_name'
                site_name: addSite ? site : null // Asumiendo que el backend espera 'site_name'
            });
            
            console.log('Respuesta del servidor:', response.data);
            setShowForm(false);
        } catch (error) {
            console.error('Error al guardar la información:', error);
        }
    };
    

    const dialogFooter = (
        <div>
            <Button
                label="Guardar"
                onClick={handleGuardar}
                className="p-button p-button-success"
                style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
            />
        </div>
    );

    return (
        <div style={{ margin: '20px' }}>
            <Button
                label="Crear Comunidad"
                onClick={handleButtonClick}
                className="p-button p-button-success"
                style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
            />
            <Dialog header="Formulario de Comunidad" visible={showForm} onHide={onHide} footer={dialogFooter}>
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <label>Provincia:</label>
                        <Dropdown
                            value={selectedProvince}
                            options={getUniqueProvinces()}
                            onChange={(e) => {
                                setSelectedProvince(e.value);
                                setSelectedCity('');
                                setSelectedParish('');
                            }}
                            placeholder="Seleccionar Provincia"
                        />
                    </div>
                    <div className="p-col-12">
                        <label>Cánton:</label>
                        <Dropdown
                            value={selectedCity}
                            options={getCitiesForProvince(selectedProvince)}
                            onChange={(e) => {
                                setSelectedCity(e.value);
                                setSelectedParish('');
                            }}
                            placeholder="Seleccionar Ciudad"
                        />
                    </div>
                    <div className="p-col-12">
                        <label>Parroquia:</label>
                        <Dropdown
                            value={selectedParish}
                            options={getParishesForCity(selectedCity)}
                            onChange={(e) => setSelectedParish(e.value)}
                            placeholder="Seleccionar Parroquia"
                        />
                    </div>
                    <div className="p-col-12">
                        <label>Comunidad:</label>
                        <InputText
                            value={comunidad}
                            onChange={(e) =>
                                setComunidad(e.target.value)}
                                placeholder="Nombre de la Comunidad"
                            />
                        </div>
                        <div className="p-col-12" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <label>Añadir Sitio:</label>
                        <Checkbox checked={addSite} onChange={(e) => setAddSite(e.checked)} />
                        </div>
                        {addSite && (
                            <div className="p-col-12">
                                <label>Sitio:</label>
                                <InputText
                                    value={site}
                                    onChange={(e) => setSite(e.target.value)}
                                    placeholder="Nombre del Sitio"
                                    
                                />
                            </div>
                        )}
                    </div>
                </Dialog>
            </div>
        );
    
        function getUniqueProvinces() {
            const uniqueProvinces: any[] = [];
            for (const location of locations) {
                if (!uniqueProvinces.find(province => province.value === location.province)) {
                    uniqueProvinces.push({ label: location.province, value: location.province });
                }
            }
            return uniqueProvinces;
        }
    
        function getCitiesForProvince(province: string) {
            const cities: any[] = [];
            const selectedCities: string[] = [];
            for (const location of locations) {
                if (location.province === province && !selectedCities.includes(location.city)) {
                    cities.push({ label: location.city, value: location.city });
                    selectedCities.push(location.city);
                }
            }
            return cities;
        }
    
        function getParishesForCity(city: string) {
            const parishes: any[] = [];
            const selectedParishes: string[] = [];
            for (const location of locations) {
                if (location.city === city && !selectedParishes.includes(location.parish)) {
                    parishes.push({ label: location.parish, value: location.parish });
                    selectedParishes.push(location.parish);
                }
            }
            return parishes;
        }
    };
    
    export default ButtonLocation;
