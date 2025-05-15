import PropTypes from 'prop-types';
import { Accordion, Container } from 'react-bootstrap';
import './Questions.css';

const defaultFaqs = [
  {
    question: '¿Cuál es el horario de atención?',
    answer:
      'Nuestro horario es de lunes a viernes de 8:00 a 18:00 y sábados de 9:00 a 16:00. Los domingos permanecemos cerrados.',
  },
  {
    question: '¿Ofrecen servicio de delivery?',
    answer:
      'Sí, realizamos envíos a domicilio dentro de un radio de 5 km. El pedido mínimo es de $1 500 y el costo de envío varía según la zona.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos efectivo, tarjetas de débito y crédito (Visa, MasterCard, American Express) y pagos con Mercado Pago o QR.',
  },
  {
    question: '¿Tienen opciones sin lactosa o veganas?',
    answer:
      'Sí: contamos con leches de almendra, avena y coco, así como pastelería vegana y sin gluten bajo pedido.',
  },
  {
    question: '¿Puedo reservar el salón para eventos?',
    answer:
      'Sí, ofrecemos un espacio privado para hasta 20 personas. La reserva mínima es de 2 horas y con un pedido mínimo de catering.',
  },
];

export default function Questions({ faqs = defaultFaqs }) {
  return (
    <div className="faq-background">
      <Container className="faq-container">
        <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
        <Accordion>
          {faqs.map((item, index) => (
            <Accordion.Item eventKey={`${index}`} key={index}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

Questions.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
};
