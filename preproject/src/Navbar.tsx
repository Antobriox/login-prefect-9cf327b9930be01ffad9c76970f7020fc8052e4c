import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar" ref={navbarRef} style={{ position: 'fixed', top: 0, left: 0 }}>
      <Sidebar
      showCloseIcon={true}
      visible={isOpen} onHide={() => setIsOpen(false)} fullScreen={false} style={{ width: '220px', backgroundColor: '#2E7D32', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontSize: '1.2rem' }}>
        <div >
          {/* <div className="sidebar-header"></div> */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`} style={{ color: location.pathname === '/' ? '#00FF00' : 'white', textDecoration: 'none' }}>Inicio</Link>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Link to="/forms" className={`sidebar-link ${location.pathname === '/forms' ? 'active' : ''}`} style={{ color: location.pathname === '/forms' ? '#00FF00' : 'white', textDecoration: 'none' }}>Buscar Formulario</Link>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Link to="/location" className={`sidebar-link ${location.pathname === '/location' ? 'active' : ''}`} style={{ color: location.pathname === '/location' ? '#00FF00' : 'white', textDecoration: 'none' }}>Crear Ubicación</Link>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Link to="/user" className={`sidebar-link ${location.pathname === '/user' ? 'active' : ''}`} style={{ color: location.pathname === '/user' ? '#00FF00' : 'white', textDecoration: 'none' }}>Lista de Usuarios</Link>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button
                onClick={handleLogout}
                className="p-button-text p-button-plain"
                style={{
                  fontSize: '1.2rem',
                  color: 'white',
                  textDecoration: 'none',
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: isHovered ? 'red' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </Sidebar>
      <Button onClick={toggleNavbar} className="p-button-text" style={{ color: 'white', fontSize: '1.8rem', margin: '1rem', border: 'none', background: 'none', outline: 'none' }}>
        <img src="/img/list.svg" alt="Menu" style={{ width: '32px', height: '32px', cursor: 'pointer' }} />
      </Button>
    </div>
  );
};

export default Navbar;







