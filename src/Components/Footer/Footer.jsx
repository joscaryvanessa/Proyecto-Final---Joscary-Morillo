import PropTypes from 'prop-types';
import './Footer.css';
import logo from '../../assets/logo.png';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function Footer({
  privacyPolicyUrl,
  termsUrl,
  returnsUrl,
  contactUrl,
  whatsappNumber,
  emailAddress,
}) {
  return (
    <footer className="footer border-secondary-subtle py-4 mt-auto">
      <div className="footer-content container d-flex flex-column flex-md-row">
        <nav className="nav flex-column footer-nav">
          <a href={privacyPolicyUrl} className="nav-link text-secondary fw-bold text-white">
            Política de Privacidad
          </a>
          <a href={termsUrl} className="nav-link text-secondary fw-bold text-white">
            Términos y Condiciones
          </a>
          <a href={returnsUrl} className="nav-link text-secondary fw-bold text-white">
            Cambios y Devoluciones
          </a>
          <a href={contactUrl} className="nav-link text-secondary fw-bold text-white">
            Contacto
          </a>
        </nav>

        <div className="footer-logo-wrapper my-3 my-md-0 mx-auto">
          <img src={logo} alt="Logo" className="Logo-footer" />
        </div>

        <div className="d-flex justify-content-center gap-3 footer-buttons">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
            className="btn btn-outline-success rounded-pill px-4 py-2 fw-bold gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={28} className="mb-2" />
            WhatsApp
          </a>
          <a
            href={`mailto:${emailAddress}`}
            className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold gap-2"
          >
            <FaEnvelope size={28} className="mb-2" />
            Email
          </a>
        </div>
      </div>

      <div className="small text-center mt-3 fw-bold text-white">
        &copy; {new Date().getFullYear()} Amargo &amp; Aromático
      </div>
    </footer>
  );
}

Footer.propTypes = {
  privacyPolicyUrl: PropTypes.string.isRequired,
  termsUrl: PropTypes.string.isRequired,
  returnsUrl: PropTypes.string.isRequired,
  contactUrl: PropTypes.string.isRequired,
  whatsappNumber: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
};

export default Footer;
