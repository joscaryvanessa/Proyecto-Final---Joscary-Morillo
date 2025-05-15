import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../Login/AuthContext';

export default function Login({  
  validUser = 'admin',
  validPass = '1234',
  onSuccessRedirect = '/admin'
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || onSuccessRedirect;

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (stored) setLoggedUser(stored);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (username === validUser && password === validPass) {
      localStorage.setItem('usuario', username);
      setLoggedUser(username);
      login(username);

      await Swal.fire({
        title: '¡Bienvenido!',
        text: `Has iniciado sesión como ${username}`,
        icon: 'success',
        draggable: true
      });
      navigate(from, { replace: true });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña inválidos',
        icon: 'error'
      });
      setError('Usuario o contraseña inválidos');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    logout();
    setLoggedUser(null);
    navigate('/login');
  };
  if (loggedUser) {
    return (
      <Container className="py-5" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">¡Hola, {loggedUser}!</h2>
        <Button variant="danger" onClick={handleLogout} className="w-100">
          Cerrar sesión
        </Button>
      </Container>
    );
  }
  return (
    <Container className="py-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login Administración</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}
Login.propTypes = {
  validUser:        PropTypes.string,
  validPass:        PropTypes.string,
  onSuccessRedirect: PropTypes.string,
};
Login.defaultProps = {
  validUser:        'admin',
  validPass:        '1234',
  onSuccessRedirect: '/admin',
};

