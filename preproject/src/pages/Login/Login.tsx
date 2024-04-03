import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import login from '../../services/Autenticacion/Login';
import eyeIcon from '../../img/eye.svg';
import eyeFillIcon from '../../img/eye-fill.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Ingrese los datos en los campos');
      return;
    }

    setIsLoading(true);

    try {
      const token = await login(username, password);

      if (token) {
        toast.success('Inicio de sesión exitoso');
        setIsLoading(false);
        navigate('/forms', { state: { username, password } });
      } else {
        setIsLoading(false);
        toast.error('Credenciales inválidas');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Error al iniciar sesión');
      console.error('Error al iniciar sesión:', error);
      // Notificación de error del servidor
      toast.error('El servidor no está respondiendo. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.target.name === 'username') {
        const trimmedValue = event.target.value.trim();
        setUsername(trimmedValue);
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
          passwordInput.focus();
        }
      } else if (event.target.name === 'password') {
        handleLogin();
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Panel style={{ width: '500px', backgroundColor: '#ffffff', borderRadius: '8px', padding: '2rem', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/img/logogris2.png" alt="Logo" className="logo" />
        </div>
        <div className="form-container">
          <h1 style={{ textAlign: 'center', color: '#495057' }}>Iniciar Sesión</h1>
          <div className="input-container">
            <InputText
              type="text"
              name="username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="input-field"
              style={{ width: '100%', marginBottom: '1rem', backgroundColor: '#ffffff', border: '1px solid #000000', color: '#000000', borderRadius: '8px', padding: '0.5rem', fontSize: '1.1rem' }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <div className="password-input" style={{ position: 'relative' }}>
              <InputText
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="input-field"
                style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #000000', color: '#000000', borderRadius: '8px', padding: '0.5rem', fontSize: '1.1rem' }}
                onKeyDown={handleKeyDown}
              />
              <img
                src={showPassword ? eyeFillIcon : eyeIcon}
                alt="Toggle Password"
                onClick={handleTogglePassword}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </div>
          </div>
          <br />
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="button"
            label={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            style={{ width: '100%', backgroundColor: '#006400', cursor: 'pointer' }}
          />
          <ToastContainer />
        </div>
      </Panel>
    </div>
  );
};

export default Login;

