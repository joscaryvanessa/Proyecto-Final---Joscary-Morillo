import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';
import { CartContext } from '../Carrito/CartContext';
import { useAuth } from '../../Components/Login/AuthContext';
import { BsHeart, BsBoxArrowInRight, BsBoxArrowRight, BsEnvelope } from 'react-icons/bs';


export default function AppNavbar() {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-brand-mobile">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo rounded-circle"
            style={{ width: '50px', height: '50px' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="left-nav">
            <Nav.Link as={NavLink} to="/" className="text-white">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className="text-white">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" className="text-white">
              <BsEnvelope style={{ marginRight: 4, marginBottom: 2 }} />
              Contacto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/faq" className="text-white">
              Preguntas Frecuentes
            </Nav.Link>
          </Nav>

          <Navbar.Brand className="navbar-brand-desktop">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo rounded-circle"
              style={{ width: '50px', height: '50px' }}
            />
          </Navbar.Brand>
          
          <Nav className="right-nav">
            {!isLoggedIn ? (
              <Nav.Link as={NavLink} to="/login" className="text-white">
                <BsBoxArrowInRight style={{ marginRight: 4, marginBottom: 2 }} />
                Iniciar Sesion
              </Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout} className="text-white">
                <BsBoxArrowRight style={{ marginRight: 4, marginBottom: 2 }} />
                Cerrar Sesión
              </Nav.Link>
            )}
            <Nav.Link
              as={NavLink}
              to="/carrito"
              className="text-white position-relative"
            >
              <i className="bi bi-cart-fill"></i>
              {cart.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cart.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}