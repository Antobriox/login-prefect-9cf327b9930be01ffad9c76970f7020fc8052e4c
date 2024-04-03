import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const ButtonComponent = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const onHide = () => {
    setShowForm(false);
  };

  const handleMouseEnter = (e: { currentTarget: { style: { backgroundColor: string; }; }; }) => {
    e.currentTarget.style.backgroundColor = '#388E3C';
  };

  const handleMouseLeave = (e: { currentTarget: { style: { backgroundColor: string; }; }; }) => {
    e.currentTarget.style.backgroundColor = '#4CAF50';
  };

  const dialogFooter = (
    <div>
      <Button 
        label="Guardar" 
        onClick={handleButtonClick} 
        className="p-button p-button-success" 
        style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );

  return (
    <div>
      <Button 
        label="Crear formulario" 
        onClick={handleButtonClick} 
        className="p-button p-button-success" 
        style={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', padding: '10px 20px', border: '1px solid #4CAF50', transition: 'background-color 0.3s' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Dialog header="Formulario de Rellenar Datos" visible={showForm} style={{ width: '70vw', background: '#f5f5f5', color: '#000', border: '1px solid #333', padding: '1rem', borderRadius: '8px' }} footer={dialogFooter} onHide={onHide} closeOnEscape={false}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="meta">META ALINEADA AL PDOT</label>
            <InputText id="meta" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="obra">OBRA O PROYECTO A SOCIALIZAR</label>
            <InputText id="obra" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="direccion">DIRECCION VINCULADA</label>
            <div className="p-grid">
              <div className="p-col">
                <InputText id="ubicacion" placeholder="Ubicación" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
              <div className="p-col">
                <InputText id="canton" placeholder="Cantón" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
              <div className="p-col">
                <InputText id="parroquia" placeholder="Parroquia" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="numPersonas">NUMERO DE PERSONAS QUE SE SOCIALIZO</label>
            <InputText id="numPersonas" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="fechaActividad">FECHA DE ACTIVIDAD EN TERRITORIO</label>
            <div className="p-grid">
              <div className="p-col">
                <InputText id="dia" placeholder="Día" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
              <div className="p-col">
                <InputText id="fecha" placeholder="Fecha" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
              <div className="p-col">
                <InputText id="lugar" placeholder="Lugar" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
              <div className="p-col">
                <InputText id="hora" placeholder="Hora" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
              <div className="p-col">
                <InputText id="duracion" placeholder="Duración" style={{ backgroundColor: '#fff', color: '#000' }} />
              </div>
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="descripcion">DESCRIPCION DE LAS ACTIVIDADES DE SOCIALIZACION</label>
            <InputText id="descripcion" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="alertas">ALERTAS SOBRE LA OBRA O PROYECTO</label>
            <InputText id="alertas" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="recomendaciones">RECOMENDACIONES</label>
            <InputText id="recomendaciones" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="anexos">ANEXOS FOTOGRAFICOS – FIRMAS DE RESPALDO</label>
            <InputText id="anexos" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="elaborado">ELABORADO POR</label>
            <InputText id="elaborado" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="revisado">REVISADO POR</label>
            <InputText id="revisado" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
          <div className="p-field">
            <label htmlFor="aprobado">APROBADO POR</label>
            <InputText id="aprobado" style={{ backgroundColor: '#fff', color: '#000' }} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ButtonComponent;