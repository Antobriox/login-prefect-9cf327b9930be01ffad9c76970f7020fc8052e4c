// import { useState, useEffect } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';
// import { InputText } from 'primereact/inputtext';
// import { Checkbox } from 'primereact/checkbox';
// import axios from 'axios';

// const ButtonEditLocation = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [locations, setLocations] = useState([]);
//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');
//     const [selectedParish, setSelectedParish] = useState('');
//     const [selectedComunity, setSelectedComunity] = useState('');
//     const [selectedComunityNewName, setSelectedComunityNewName] = useState('');
//     const [addSite, setAddSite] = useState(false);
//     const [site, setSite] = useState('');

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('/location/table');
//             if (response && response.data && response.data.data && response.data.data.length > 0) {
//                 setLocations(response.data.data);
//             } else {
//                 console.error('Error: No se encontraron datos válidos en la respuesta');
//             }
//         } catch (error) {
//             console.error('Error al obtener datos:', error);
//         }
//     };

//     const handleButtonClick = () => {
//         setShowForm(true);
//     };

//     const onHide = () => {
//         setShowForm(false);
//     };

//     const handleGuardar = async () => {
//         try {
//             let newComunityName = selectedComunityNewName;
//             // Verificar si el campo Nuevo Nombre de Comunidad está vacío
//             if (!selectedComunityNewName.trim()) {
//                 // Si está vacío, mantener el nombre actual
//                 newComunityName = selectedComunity;
//             }
    
//             const response = await axios.put('/location/edit', {
//                 name: selectedComunity,
//                 new_name: newComunityName,
//                 parish_name: selectedParish,
//                 city_name: selectedCity,
//                 province_name: selectedProvince,
//                 site_name: addSite ? site : null
//             });
            
//             console.log('Respuesta del servidor:', response.data);
    
//             setShowForm(false);
//             window.location.reload();
//         } catch (error) {
//             console.error('Error al guardar la información:', error);
//         }
//     };
    

//     const dialogFooter = (
//         <div>
//             <Button
//                 label="Guardar"
//                 onClick={handleGuardar}
//                 className="p-button p-button-success"
//                 style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
//             />
//         </div>
//     );

//     return (
//         <div style={{ margin: '20px' }}>
//             <Button
//                 label="Editar Comunidad"
//                 onClick={handleButtonClick}
//                 className="p-button p-button-success"
//                 style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
//             />
//             <Dialog header="Formulario de Comunidad" visible={showForm} onHide={onHide} footer={dialogFooter}>
//                 <div className="p-grid p-fluid">
//                     <div className="p-col-12">
//                         <label>Provincia:</label>
//                         <Dropdown
//                             value={selectedProvince}
//                             options={getUniqueProvinces()}
//                             onChange={(e) => {
//                                 setSelectedProvince(e.value);
//                                 setSelectedCity('');
//                                 setSelectedParish('');
//                                 setSelectedComunity('');
//                             }}
//                             placeholder="Seleccionar Provincia"
//                         />
//                     </div>
//                     <div className="p-col-12">
//                         <label>Cánton:</label>
//                         <Dropdown
//                             value={selectedCity}
//                             options={getCitiesForProvince(selectedProvince)}
//                             onChange={(e) => {
//                                 setSelectedCity(e.value);
//                                 setSelectedParish('');
//                                 setSelectedComunity('');
//                             }}
//                             placeholder="Seleccionar Ciudad"
//                             disabled={!selectedProvince}
//                         />
//                     </div>
//                     <div className="p-col-12">
//                         <label>Parroquia:</label>
//                         <Dropdown
//                             value={selectedParish}
//                             options={getParishesForCity(selectedCity)}
//                             onChange={(e) => {
//                                 setSelectedParish(e.value);
//                                 setSelectedComunity('');
//                             }}
//                             placeholder="Seleccionar Parroquia"
//                             disabled={!selectedCity}
//                         />
//                     </div>
//                     <div className="p-col-12">
//                         <label>Comunidad:</label>
//                         <Dropdown
//                             value={selectedComunity}
//                             options={getComunitysForParish(selectedParish)}
//                             onChange={(e) => setSelectedComunity(e.value)}
//                             placeholder="Seleccionar Comunidad"
//                             disabled={!selectedParish}
//                         />
//                     </div>
//                     <div className="p-col-12">
//                         <label>Nuevo Nombre de Comunidad:</label>
//                         <InputText
//                             value={selectedComunityNewName}
//                             onChange={(e) => setSelectedComunityNewName(e.target.value)}
//                             placeholder="Nuevo Nombre de Comunidad"
//                             disabled={!selectedComunity}
//                         />
//                     </div>
//                     <div className="p-col-12" style={{ marginTop: '10px', marginBottom: '10px' }}>
//                         <label>Añadir Sitio:</label>
//                         <Checkbox checked={addSite} onChange={(e) => setAddSite(e.checked)} />
//                     </div>
//                     {addSite && (
//                         <div className="p-col-12">
//                             <label>Sitio:</label>
//                             <InputText
//                                 value={site}
//                                 onChange={(e) => setSite(e.target.value)}
//                                 placeholder="Nombre del Sitio"
//                             />
//                         </div>
//                     )}
//                 </div>
//             </Dialog>
//         </div>
//     );
    
//     function getUniqueProvinces() {
//         const uniqueProvinces: { label: any; value: any; }[] = [];
//         for (const location of locations) {
//             if (!uniqueProvinces.find(province => province.value === location.province)) {
//                 uniqueProvinces.push({ label: location.province, value: location.province });
//             }
//         }
//         return uniqueProvinces;
//     }
    
//     function getCitiesForProvince(province: string) {
//         const cities = [];
//         const selectedCities: any[] = [];
//         for (const location of locations) {
//             if (location.province === province && !selectedCities.includes(location.city)) {
//                 cities.push({ label: location.city, value: location.city });
//                 selectedCities.push(location.city);
//             }
//         }
//         return cities;
//     }
    
//     function getParishesForCity(city: string) {
//         const parishes = [];
//         const selectedParishes: any[] = [];
//         for (const location of locations) {
//             if (location.city === city && !selectedParishes.includes(location.parish)) {
//                 parishes.push({ label: location.parish, value: location.parish });
//                 selectedParishes.push(location.parish);
//             }
//         }
//         return parishes;
//     }
    
//     function getComunitysForParish(parish: string) {
//         const community = [];
//         const selectedComunity: any[] = [];
//         for (const location of locations) {
//             if (location.parish === parish && !selectedComunity.includes(location.community)) {
//                 community.push({ label: location.community, value: location.community });
//                 selectedComunity.push(location.community);
//             }
//         }
//         return community;
//     }
// };

// export default ButtonEditLocation;
