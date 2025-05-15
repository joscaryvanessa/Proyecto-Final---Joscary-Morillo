import 'bootstrap/dist/css/bootstrap.min.css';

export default function PrivacyPolicy() {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Política de Privacidad</h3>
        </div>
        <div className="card-body">
          <p>
            En <strong>Café Aroma</strong> valoramos tu privacidad. A continuación, un resumen de cómo
            tratamos tus datos:
          </p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <strong>Responsable:</strong> Café Aroma S.R.L. (CUIT 30-12345678-9)
            </li>
            <li className="list-group-item">
              <strong>Datos:</strong> nombre, e-mail, teléfono, dirección, historial de pedidos, cookies.
            </li>
            <li className="list-group-item">
              <strong>Finalidad:</strong> pedidos, facturación, mejoras, promociones (previo OK).
            </li>
            <li className="list-group-item">
              <strong>Seguridad:</strong> cifrado SSL/TLS y almacenamiento protegido.
            </li>
            <li className="list-group-item">
              <strong>Conservación:</strong> durante la relación y hasta 5 años por ley.
            </li>
            <li className="list-group-item">
              <strong>Derechos:</strong> acceso, rectificación, supresión, oposición, portabilidad.
            </li>
          </ul>
          <p className="mb-0">
            Para ejercer tus derechos o consultas, escribe a{' '}
            <a href="mailto:privacidad@cafearoma.com">privacidad@cafearoma.com</a>.
          </p>
        </div>
        <div className="card-footer text-muted text-end">
          Última actualización: 14 mayo 2025
        </div>
      </div>
    </div>
  );
}
