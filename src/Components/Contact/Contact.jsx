import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Contact.css';
import { Helmet } from 'react-helmet';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errs.email = 'Email inválido';
    if (!form.message.trim()) errs.message = 'El mensaje no puede ir vacío';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    await Swal.fire({
      title: '¡Mensaje enviado!',
      text: `Gracias, ${form.name}, nos pondremos en contacto pronto.`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Amargo & Aromático</title>
        <meta name="description" content="Contáctanos para consultas, pedidos o sugerencias. Amargo & Aromático, tu cafetería gourmet." />
      </Helmet>
      <Container
        className="contact-bg shadow-sm rounded mx-auto my-4 p-5 pb-5"
        style={{ maxWidth: 800 }}
      >
        <h2 className="text-center mb-4">Contáctanos</h2>
        <div className="mb-4 text-center">
          <p className="mb-1">
            <strong>Dirección:</strong> Av. de las Flores 123, CABA, Argentina
          </p>
          <p className="mb-1">
            <strong>Email:</strong>{' '}
            <a href="mailto:amargo-aromatico@gmail.com">
              amargo-aromatico@gmail.com
            </a>
          </p>
          <p className="mb-0">
            <strong>Teléfono:</strong>{' '}
            <a href="tel:+5491112345678">
              +54 9 11 1234-5678
            </a>
          </p>
        </div>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="contactName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Tu nombre"
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="tu@ejemplo.com"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactMessage" className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              isInvalid={!!errors.message}
              placeholder="Escribe tu mensaje..."
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Enviar
          </Button>
        </Form>
      </Container>
    </>
  );
}
