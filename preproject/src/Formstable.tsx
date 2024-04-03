
export const tableColumns = {
  forms: [
  
  { field: 'creado', header: 'Creado por' },
  { field: 'revisado', header: 'Revisado por' },
  { field: 'aprobado', header: 'Aprobado por' },
  { field: 'status', header: 'Estado' },
  { field: 'action', header: 'Acciones' },

  ],
  locations: [
    { field: 'province', header: 'Provincia' },
    { field: 'city', header: 'Cantón' },
    { field: 'parish', header: 'Parroquia' },
    { field: 'community', header: 'Comunidad' },
    { field: 'site', header: 'Sitio' },
    { field: 'status', header: 'Estado' },



    // Agrega las columnas específicas para la vista de localizaciones
  ],
  User: [
      { field: 'username', header: 'Usuario' },
      { field: 'names', header: 'Nombres' },
      { field: 'lastnames', header: 'Apellidos' },
      { field: 'identification', header: 'Identificación' },
      { field: 'cellphone', header: 'Teléfono' },
      { field: 'email', header: 'Correo' },
      { field: 'province', header: 'Provincia' },
      { field: 'city', header: 'Cantón' },
      { field: 'parish', header: 'Parroquia' },
      { field: 'comunity', header: 'Comunidad' },
      { field: 'rol', header: 'Rol' }
    ],
    
};

export default tableColumns;
