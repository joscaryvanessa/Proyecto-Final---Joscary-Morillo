import 'bootstrap/dist/css/bootstrap.min.css';

export default function TermsAndConditions() {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Términos y Condiciones</h3>
        </div>
        <div className="card-body">
          <p>Bienvenido a <strong>Café Aroma</strong>. Estos términos regulan tu uso de nuestro sitio web y la contratación de nuestros servicios.</p>

          <h5>1. Aceptación de Términos</h5>
          <p>Al acceder o usar nuestro sitio, aceptas estos Términos y nuestra <a href="/politica-privacidad">Política de Privacidad</a>.</p>

          <h5>2. Pedidos y Precios</h5>
          <p>Todos los precios incluyen IVA. Nos reservamos el derecho a modificar precios y ofertas sin previo aviso. El pedido se confirma una vez recibido el pago.</p>

          <h5>3. Formas de Pago</h5>
          <p>Aceptamos tarjetas de crédito, débito y MercadoPago. El cargo se efectúa al confirmar el pedido.</p>

          <h5>4. Entregas</h5>
          <p>Realizamos entregas dentro de CABA y GBA. El plazo estimado es de 1–3 días hábiles. Para envíos fuera de nuestra zona, contáctanos antes.</p>

          <h5>5. Devoluciones y Reembolsos</h5>
          <p>Solo aceptamos devoluciones por productos dañados o pedidos incorrectos. Notifica en 24 hs. tras la entrega para gestionar el reembolso o reemplazo.</p>

          <h5>6. Propiedad Intelectual</h5>
          <p>Todo el contenido (textos, imágenes, diseños) de este sitio es propiedad de Café Aroma. Queda prohibida su reproducción sin autorización.</p>

          <h5>7. Limitación de Responsabilidad</h5>
          <p>No seremos responsables por daños indirectos o pérdidas de beneficios. Nuestra responsabilidad máxima no excederá el importe del pedido.</p>

          <h5>8. Ley Aplicable</h5>
          <p>Estos Términos se rigen por la legislación argentina. Para cualquier disputa, los tribunales de la Ciudad Autónoma de Buenos Aires serán competentes.</p>

          <p className="mt-4 mb-0">
            Para consultas, escríbenos a{' '}
            <a href="mailto:privacidad@cafearoma.com">
              privacidad@cafearoma.com
            </a>.
          </p>
        </div>
        <div className="card-footer text-muted text-end">
          Última actualización: 14 mayo 2025
        </div>
      </div>
    </div>
  );
}