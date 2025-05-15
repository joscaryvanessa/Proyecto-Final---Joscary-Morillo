import 'bootstrap/dist/css/bootstrap.min.css';

export default function CambiosDevoluciones() {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          <h3 className="mb-0">Cambios y Devoluciones</h3>
        </div>
        <div className="card-body">
          <p>
            En <strong>Café Aroma</strong> queremos que quedes 100% satisfecho. Si necesitas cambiar o devolver tu pedido,
            te contamos cómo funciona:
          </p>

          <h5>1. Plazo para solicitar</h5>
          <p>
            Tienes <strong>24 horas</strong> contadas desde la entrega para gestionar un cambio o devolución.
            Contacta a nuestro equipo al correo o WhatsApp.
          </p>

          <h5>2. Estado del producto</h5>
          <p>
            El producto debe estar en su empaque original, sin señales de uso y con todas sus etiquetas.
            No aceptamos devoluciones de productos consumidos o abiertos.
          </p>

          <h5>3. Proceso de cambio</h5>
          <p>
            1. Envía foto del paquete y código de pedido.<br/>
            2. Si todo está en regla, te indicaremos el punto de recogida o marcaremos
            recogida a domicilio (sin costo adicional dentro de CABA).<br/>
            3. Recibirás el nuevo producto en un plazo de 2–3 días hábiles.
          </p>

          <h5>4. Reembolsos</h5>
          <p>
            Para devoluciones, procesamos el reembolso en la misma forma de pago en la que abonaste.
            El plazo depende de tu banco o pasarela (hasta 10 días hábiles).
          </p>

          <h5>5. Excepciones</h5>
          <p>
            No aplican cambios ni devoluciones sobre:
            <ul>
              <li>Café molido abierto o en uso.</li>
              <li>Artículos en oferta clearance.</li>
              <li>Tarjetas de regalo o productos personalizados.</li>
            </ul>
          </p>

          <p className="mt-4 mb-0">
            Para iniciar tu solicitud, escríbenos a{' '}
            <a href="mailto:privacidad@cafearoma.com">
              privacidad@cafearoma.com
            </a>{' '}
            o por WhatsApp al +54 9 11 1234-5678.
          </p>
        </div>
        <div className="card-footer text-muted text-end">
          Última actualización: 14 mayo 2025
        </div>
      </div>
    </div>
  );
}
