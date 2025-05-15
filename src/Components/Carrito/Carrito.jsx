import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Container, ListGroup, Button, Image } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

export default function Carrito() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleFinalize = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/carrito' } });
    } else {
      await Swal.fire({
        title: '¡Compra finalizada!',
        text: `Gracias por tu compra. Has adquirido ${cart.length} artículo(s). Total: $${total.toFixed(2)}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      clearCart();
    }
  };

  return (
    <Container className="cart-container">
      <h2 className="cart-title">Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <ListGroup variant="flush">
          {cart.map((item, idx) => (
            <ListGroup.Item
              key={idx}
              className="cart-item d-flex align-items-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details ms-3">
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-price mt-1">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-auto"
                onClick={() => removeFromCart(idx)}
              >
                Eliminar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {cart.length > 0 && (
        <>
          <div className="cart-total my-3">
            <strong>Total a pagar:</strong> ${total.toFixed(2)}
          </div>

          <Button
            variant="success"
            className="finalize-btn w-100"
            onClick={handleFinalize}
          >
            Finalizar compra
          </Button>
        </>
      )}
    </Container>
  );
}
