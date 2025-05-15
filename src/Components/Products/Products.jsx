import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Products.css';
import { CartContext } from '../Carrito/CartContext';

const API_URL = 'https://api.sampleapis.com/coffee/hot';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          return res.text().then(text => {
            console.error('Respuesta no es JSON:', text);
            throw new Error('La API respondió HTML en lugar de JSON');
          });
        }
        return res.json();
      })
      .then(data => {
        const withPrices = data.map(item => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: parseFloat((Math.random() * 10 + 5).toFixed(2)),
        }));
        setProducts(withPrices);
      })
      .catch(err => console.error('Error al cargar cafés:', err));
  }, []);

  const countInCart = productId =>
    cart.filter(item => item.id === productId).length;

  return (
    <Container fluid className="py-4 bg-products">
      <Container>
        <h2 className="mb-4 text-center">Nuestros Cafés</h2>
        <Row xs={1} sm={2} md={3} lg={4} xl={6} className="g-4">
          {products.map(p => {
            const count = countInCart(p.id);
            return (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm card-custom">
                  <Card.Img
                    variant="top"
                    src={p.image}
                    className="product-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-2 product-title">
                      {p.name}
                    </Card.Title>
                    <Card.Text className="flex-grow-1 product-price">
                      Precio: <strong>${p.price}</strong>
                    </Card.Text>

                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addToCart(p)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.8rem',
                          borderRadius: '0.25rem'
                        }}
                      >
                        {count === 0 ? 'Añadir' : 'Añadir +'}
                      </Button>
                      {count > 0 && (
                        <span
                          style={{
                            marginLeft: '0.5rem',
                            padding: '0.2rem 0.4rem',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#495057',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '0.25rem'
                          }}
                        >
                          {count} en carrito
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

