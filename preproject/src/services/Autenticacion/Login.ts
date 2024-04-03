// Importamos las dependencias necesarias
import axios from 'axios';

// Definimos el tipo para la función de inicio de sesión
type LoginFunction = (username: string, password: string) => Promise<boolean>;

// Función de inicio de sesión que realiza una solicitud HTTP al backend
const login: LoginFunction = async (username, password) => {
  try {
    // Realizamos una solicitud HTTP POST al endpoint de inicio de sesión del backend
    const response = await axios.post('auth/login', { username: username, password: password });

    if (response.data.data.auth.access_token) {
      localStorage.setItem('token', response.data.data.auth.access_token); // Almacena el token en localStorage
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return false;
  }
};

export default login;
