import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios'; // Importa Axios
import BurgerIcon from './BurgerIcon';

interface EditIconProps {
    community: string;
    site: string;
    city: string;
    country: string;
    parish: string;
    province: string;
    status: boolean; // Agrega status a las propiedades
}

const EditIcon: React.FC<EditIconProps> = ({ community: name, site: site_name, city: city_name, parish: parish_name, province: province_name, status }) => {    
    const menu = useRef(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [newCommunityName, setNewCommunityName] = useState('');
    const [originalCommunityName, setOriginalCommunityName] = useState('');
    const [addSite, setAddSite] = useState(false);
    const [siteValue, setSiteValue] = useState('');
    const [originalSite, setOriginalSite] = useState('');
    const [newSite, setNewSite] = useState('');

    useEffect(() => {
        setNewCommunityName(name);
        setOriginalCommunityName(name);
        setSiteValue(site_name);
        setOriginalSite(site_name);
    }, [name, site_name]);

    const handleEdit = () => {
        setShowEditDialog(true);
    };

    const handleDisable = async () => {
        const dataToSend = {
            city: city_name,
            parish: parish_name,
            province: province_name,
            site: addSite ? siteValue : site_name,
            community: newCommunityName || name,
            status: !status
        };

        console.log("Data to send to backend:", dataToSend);

        try {
            const response = await axios.put('/location/disable', dataToSend);
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al deshabilitar la comunidad:', error);
        }
    };
    
    const handleEditSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const dataToSend: any = {
                city_name: city_name,
                parish_name: parish_name,
                province_name: province_name,
                new_site_name: addSite ? siteValue : site_name,
                name: originalCommunityName,
                new_name: newCommunityName || name,
                site_name: originalSite,
                status
            };

            const response = await axios.put('/location/edit', dataToSend);
            console.log('Respuesta del servidor:', response.data);

            setShowEditDialog(false);
        } catch (error) {
            console.error('Error al guardar la información:', error);
        }
    };

    const items = [
        {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: handleEdit
        },
        {
            label: status ? 'Deshabilitar' : 'Habilitar',
            icon: status ? 'pi pi-times' : 'pi pi-check',
            command: handleDisable
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <Button onClick={(e) => menu.current.toggle(e)}>
                <BurgerIcon />
            </Button>
            <TieredMenu model={items} popup ref={menu} />
            <Dialog header="Editar Comunidad" visible={showEditDialog} onHide={() => setShowEditDialog(false)}>
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <label>Nombre de la Comunidad:</label>
                        <InputText
                            value={newCommunityName}
                            onChange={(e) => setNewCommunityName(e.target.value)}
                        />
                    </div>
                    <div className="p-col-12">
                        <label>Añadir Sitio:</label>
                        <Checkbox checked={addSite} onChange={(e) => setAddSite(e.checked)} />
                    </div>
                    {addSite && (
                        <div className="p-col-12">
                            <label>Sitio:</label>
                            <InputText
                                value={siteValue}
                                onChange={(e) => setSiteValue(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                <div className="p-grid p-justify-center">
                    <Button label="Guardar" className="p-button-success" onClick={handleEditSave} />
                </div>
            </Dialog>
        </div>
    );
}

export default EditIcon;

