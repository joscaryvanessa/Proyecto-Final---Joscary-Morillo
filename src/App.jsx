import { Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Questions from './Components/Questions/Questions';
import Products from './Components/Products/Products';
import Carrito from './Components/Carrito/Carrito';
import Login from './Components/Login/Login';
import Contact from './Components/Contact/Contact';
import PrivacyPolicy from './Components/Footer/Policy';
import TermsAndConditions from './Components/Footer/Terms';
import CambiosDevoluciones from './Components/Footer/Changes';
import PrivateRoute from './Components/Login/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import imagen1 from './assets/imagen1.jpg';
import imagen2 from './assets/imagen2.jpg';
import imagen3 from './assets/imagen3.jpg';

function App() {
  const Imagenes = [
    {
      imgSrc: imagen1,
      alt: 'Imagen 1',
      text: '“Amargo & Aromático” es la esencia de nuestra cafetería…',
      imageFirst: true,
      height: '500',
      width: '450',
      backgroundColor: '#36160a'
    },
    {
      imgSrc: imagen2,
      alt: 'Imagen 2',
      text: 'Nuestro propósito es transformar el acto cotidiano de beber café…',
      imageFirst: false,
      height: '500',
      width: '450',
      backgroundColor: '#4c2710'
    },
    {
      imgSrc: imagen3,
      alt: 'Imagen 3',
      text: 'Nuestro servicio de entrega lleva hasta tu puerta la frescura…',
      imageFirst: true,
      height: '500',
      width: '450',
      backgroundColor: '#643913'
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <title>Amargo & Aromático - Cafetería y Productos Gourmet</title>
        <meta name="description" content="Descubre los mejores cafés y productos gourmet en Amargo & Aromático. Compra online, consulta preguntas frecuentes y contacta con nosotros." />
      </Helmet>
      <Navbar>
        <Nav className="mx-auto" textColor="white">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/productos">Productos</Nav.Link>
          <Nav.Link href="/contacto">Contacto</Nav.Link>
          <Nav.Link href="/faq">Preguntas Frecuentes</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">Log In</Nav.Link>
          <Nav.Link href="/carrito">
            <i className="bi bi-cart-fill"></i>
          </Nav.Link>
        </Nav>
      </Navbar>

      <main className="flex-fill">
        <Routes>
          <Route path="/"                       element={<Home items={Imagenes} />} />
          <Route path="/faq"                    element={<Questions />} />
          <Route path="/productos"              element={<Products />} />
          <Route path="/login"                  element={<Login />} />
          <Route path="/contacto"               element={<Contact />} />
          <Route path="/politica-privacidad"    element={<PrivacyPolicy />} />
          <Route path="/terminos-condiciones"   element={<TermsAndConditions />} />
          <Route path="/cambios-devoluciones"   element={<CambiosDevoluciones />} />

          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      <Footer
        privacyPolicyUrl="/politica-privacidad"
        termsUrl="/terminos-condiciones"
        returnsUrl="/cambios-devoluciones"
        contactUrl="/contacto"
        whatsappNumber="+5491112345678"
        emailAddress="amargo-aromatico@gmail.com"
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
