import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const ButtonUser: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [cedula, setCedula] = useState<string>('');
    const [userData, setUserData] = useState<any>({
        username: '',
        names: '',
        lastnames: '',
        identification: '',
        cellphone: '',
        email: '',
        provincia: '',
        canton: '',
        comunidad: '',
        rol: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
    const [cedulaValid, setCedulaValid] = useState<boolean>(true);
    const [showFields, setShowFields] = useState<boolean>(false);
    const toast: any = useRef(null);

    useEffect(() => {
        if (!cedulaValid) {
            setShowFields(false);
            setUserData({
                username: '',
                names: '',
                lastnames: '',
                identification: '',
                cellphone: '',
                email: '',
                provincia: '',
                canton: '',
                comunidad: '',
                rol: ''
            });
            setShowSaveButton(false);
        }
    }, [cedula, cedulaValid]);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const onHide = () => {
        setShowForm(false);
        setCedula('');
        setUserData({
            username: '',
            names: '',
            lastnames: '',
            identification: '',
            cellphone: '',
            email: '',
            provincia: '',
            canton: '',
            comunidad: '',
            rol: ''
        });
        setShowSaveButton(false);
        setCedulaValid(true);
        setShowFields(false);
    };

    const handleSearch = async () => {
        if (!cedula.trim() || isNaN(Number(cedula.trim()))) {
            toast.current.show({severity:'error', summary: 'Error', detail: 'Por favor ingrese una cédula válida'});
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.get(`user/userBPM?cedula=${cedula}`);

            
            if (response.data.data.users) {
                const userData = response.data.data.users;
                setUserData(userData);
                setShowForm(true);
                setShowSaveButton(true);
                setCedulaValid(true);
                setShowFields(true);
                toast.current.show({severity:'success', summary: 'Éxito', detail: 'Cédula encontrada'});
            } else {
                console.error('Error: No se encontraron datos de usuario');
                setCedulaValid(false);
                setShowForm(false);
                setShowSaveButton(false);
                setShowFields(false);
                toast.current.show({severity:'error', summary: 'Error', detail: 'Cédula no valida'});
            }
        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
            toast.current.show({severity:'error', summary: 'Error', detail: 'Cédula no encontrada'});
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        toast.current.show({severity:'success', summary: 'Éxito', detail: 'Datos guardados exitosamente'});
    };

    return (
        <div>
            <Button 
                label="Agregar Usuario" 
                onClick={handleButtonClick} 
                className="p-button p-button-success" 
                style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
            />
            <Dialog header="Formulario de Datos de Usuario" visible={showForm} style={{ width: '70vw', background: '#f5f5f5', color: '#000', border: '1px solid #333', padding: '1rem', borderRadius: '8px' }} onHide={onHide} closeOnEscape={false}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="cedula">Cédula</label>
                        <div className="p-inputgroup">
                            <InputText id="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                            <Button label="Buscar" icon="pi pi-search" onClick={handleSearch} />
                        </div>
                    </div>
                    {loading && (
                        <div className="p-field" style={{ display: 'flex', alignItems: 'center' }}>
                            <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration="2s" />
                            <span style={{ marginLeft: '10px' }}>Cargando...</span>
                        </div>
                    )}
                    {!loading && !cedulaValid && (
                        <div className="p-field" style={{ color: 'red' }}>
                            Cédula no válida
                        </div>
                    )}
                    {showFields && (
                        <>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="username">Usuario</label>
                                <InputText id="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="names">Nombres</label>
                                <InputText id="names" value={userData.names} onChange={(e) => setUserData({ ...userData, names: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="lastnames">Apellidos</label>
                                <InputText id="lastnames" value={userData.lastnames} onChange={(e) => setUserData({ ...userData, lastnames: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="identification">Identificación</label>
                                <InputText id="identification" value={userData.identification} onChange={(e) => setUserData({ ...userData, identification: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="cellphone">Teléfono</label>
                                <InputText id="cellphone" value={userData.cellphone} onChange={(e) => setUserData({ ...userData, cellphone: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="provincia">Provincia</label>
                                <InputText id="provincia" value={userData.provincia} onChange={(e) => setUserData({ ...userData, provincia: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="canton">Cantón</label>
                                <InputText id="canton" value={userData.canton} onChange={(e) => setUserData({ ...userData, canton: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="comunidad">Comunidad</label>
                                <InputText id="comunidad" value={userData.comunidad} onChange={(e) => setUserData({ ...userData, comunidad: e.target.value })} />
                            </div>
                            <div className="p-field" style={{ marginBottom: '10px' }}>
                                <label htmlFor="rol">Rol</label>
                                <InputText id="rol" value={userData.rol} onChange={(e) => setUserData({ ...userData, rol: e.target.value })} />
                            </div>
                        </>
                    )}
                </div>
                <div className="p-dialog-footer" style={{ marginBottom: '20px' }}>
                    {showSaveButton && (
                        <Button label="Guardar" onClick={handleSave} />
                    )}
                </div>
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
};

export default ButtonUser;