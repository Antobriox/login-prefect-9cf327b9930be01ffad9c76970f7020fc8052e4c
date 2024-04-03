// import axios from 'axios';

// type UserCredentials = {
//   username: string;
//   password: string;
// };

// export const authenticateUser = async (credentials: UserCredentials): Promise<boolean> => {
//   try {
//     const response = await axios.post('auth/login', credentials);

//     if (response.status === 200) {
//       const token = response.data.data.auth.access_token; // Suponiendo que el token se devuelve en la respuesta
//       localStorage.setItem('token', token); // Guardar el token en el localStorage
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error al iniciar sesión:', error);
//     return false;
//   }
// };

// export default authenticateUser;
