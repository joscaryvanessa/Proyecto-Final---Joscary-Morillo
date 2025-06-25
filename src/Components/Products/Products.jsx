import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import './Products.css';
import { CartContext } from '../Carrito/CartContext';
import { useAuth } from '../Login/AuthContext';
import { BsCartPlus, BsPencilSquare, BsTrash, BsHeart, BsHeartFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const API_URL = 'https://api.sampleapis.com/coffee/hot';
const MOCKAPI_URL = 'https://685bd9b989952852c2db3ec5.mockapi.io/api/v1/productos';

export default function Products() {
  const [apiProducts, setApiProducts] = useState([]);
  const [mockApiProducts, setMockApiProducts] = useState([]);
  const { cart, addToCart } = useContext(CartContext);
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [corazones, setCorazones] = useState({});
  const PRODUCTS_PER_PAGE = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(API_URL)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) {
            return res.text().then(() => {
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
          setApiProducts(withPrices);
        }),
      fetch(MOCKAPI_URL)
        .then(res => {
          if (!res.ok) throw new Error('Error al cargar productos MockAPI');
          return res.json();
        })
        .then(data => setMockApiProducts(data))
    ])
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const countInCart = productId => cart.filter(item => item.id === productId).length;

  // CRUD y lógica de productos MockAPI
  const handleAdminClick = () => {
    setEditId(null);
    setForm({ name: '', price: '', description: '', image: '' });
    setShowModal(true);
  };
  const handleEditClick = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || ''
    });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ name: '', price: '', description: '', image: '' });
    setFormErrors({});
    setEditId(null);
  };
  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errors.price = 'El precio debe ser mayor a 0';
    if (!form.description || form.description.length < 10) errors.description = 'La descripción debe tener al menos 10 caracteres';
    return errors;
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    try {
      let res;
      if (editId) {
        res = await fetch(`${MOCKAPI_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            price: Number(form.price),
            description: form.description,
            image: form.image
          })
        });
      } else {
        res = await fetch(MOCKAPI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            price: Number(form.price),
            description: form.description,
            image: form.image
          })
        });
      }
      if (!res.ok) throw new Error('Error al guardar producto');
      const updated = await fetch(MOCKAPI_URL).then(r => r.json());
      setMockApiProducts(updated);
      handleCloseModal();
      toast.success(editId ? 'Producto editado correctamente' : 'Producto agregado correctamente');
    } catch (err) {
      setFormErrors({ submit: err.message });
      toast.error('Error al guardar producto');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      const res = await fetch(`${MOCKAPI_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar producto');
      const updated = await fetch(MOCKAPI_URL).then(r => r.json());
      setMockApiProducts(updated);
      toast.success('Producto eliminado correctamente');
    } catch (err) {
      alert(err.message);
      toast.error('Error al eliminar producto');
    }
  };

  // Búsqueda y paginación
  const filteredProducts = (isLoggedIn ? mockApiProducts : apiProducts)
    .filter(p => {
      const term = search.trim().toLowerCase();
      if (!term) return true;
      const name = (p.name || '').toLowerCase();
      const category = (p.category || '').toLowerCase();
      return name.includes(term) || category.includes(term);
    });
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const toggleCorazon = (id) => {
    setCorazones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Render
  return (
    <>
      <Helmet>
        <title>Productos | Amargo & Aromático</title>
        <meta name="description" content="Explora nuestra selección de cafés y productos gourmet. Compra online en Amargo & Aromático." />
      </Helmet>
      <Container fluid className="py-4 bg-products">
        <Container>
          <h2 className="mb-4 text-center">Nuestros Cafés</h2>
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <div className="mt-2">Cargando productos...</div>
            </div>
          ) : (
            <>
              {isLoggedIn && (
                <div className="mb-3 text-end">
                  <Button variant="warning" onClick={handleAdminClick}>
                    Añadir Productos
                  </Button>
                </div>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre o categoría..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                  aria-label="Buscar productos"
                  style={{ width: '300px', marginLeft: 0, display: 'block' }}
                />
              </div>
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                {paginatedProducts.map(p => {
                  const count = countInCart(p.id);
                  const isMock = typeof p.id === 'string' && p.description !== undefined;
                  return (
                    <Col key={p.id}>
                      <Card className="h-100 shadow-sm card-custom">
                        <Card.Img
                          variant="top"
                          src={p.image}
                          className="product-img"
                        />
                        <Card.Body className="d-flex flex-column">
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                            <span onClick={() => toggleCorazon(p.id)} style={{ cursor: 'pointer', fontSize: 22, color: corazones[p.id] ? '#dc3545' : '#aaa', marginRight: 10, marginTop: 2 }} aria-label={corazones[p.id] ? 'Quitar de favoritos' : 'Marcar como favorito'} tabIndex={0} role="button" onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') toggleCorazon(p.id); }}>
                              {corazones[p.id] ? <BsHeartFill /> : <BsHeart />}
                            </span>
                          </div>
                          <Card.Title className="mb-2 product-title" style={{ textAlign: 'center' }}>
                            {p.name}
                          </Card.Title>
                          <Card.Text className="flex-grow-1 product-price" style={{ textAlign: 'center' }}>
                            Precio: <strong>${p.price}</strong>
                          </Card.Text>
                          {isLoggedIn && isMock && (
                            <div style={{ marginBottom: 8, textAlign: 'center', fontStyle: 'italic' }}>{p.description}</div>
                          )}
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginTop: 'auto' }}>
                            <Button
                              className="btn-producto btn-azul"
                              style={{ flex: 'unset', margin: '0 auto 0.5rem auto' }}
                              onClick={() => addToCart(p)}
                              aria-label="Añadir al carrito"
                            >
                              <BsCartPlus style={{ marginRight: 4, marginBottom: 2 }} />
                              {count === 0 ? 'Añadir' : 'Añadir +'}
                            </Button>
                            {isLoggedIn && isMock && (
                              <>
                                <Button
                                  className="btn-producto btn-verde"
                                  style={{ flex: 'unset', margin: '0 auto 0.5rem auto' }}
                                  onClick={() => handleEditClick(p)}
                                  aria-label="Editar producto"
                                >
                                  <BsPencilSquare style={{ marginRight: 4, marginBottom: 2 }} />
                                  Editar
                                </Button>
                                <Button
                                  className="btn-producto btn-rojo"
                                  style={{ flex: 'unset', margin: '0 auto 0.5rem auto' }}
                                  onClick={() => handleDelete(p.id)}
                                  aria-label="Eliminar producto"
                                >
                                  <BsTrash style={{ marginRight: 4, marginBottom: 2 }} />
                                  Eliminar
                                </Button>
                              </>
                            )}
                          </div>
                          {count > 0 && (
                            <span
                              style={{
                                marginTop: '0.5rem',
                                padding: '0.2rem 0.4rem',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                color: '#495057',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '0.25rem',
                                textAlign: 'center',
                                display: 'block'
                              }}
                            >
                              {count} en carrito
                            </span>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {/* Paginador */}
              {totalPages > 1 && (
                <nav aria-label="Paginador de productos" className="mt-4">
                  <ul className="pagination justify-content-center pagination-brown" style={{ gap: 2, border: 'none', background: 'none' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <li key={page} className={`page-item${page === currentPage ? ' active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)} aria-label={`Ir a la página ${page}`}>{page}</button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </>
          )}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{editId ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} noValidate>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    isInvalid={!!formErrors.name}
                    placeholder="Nombre del producto"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    isInvalid={!!formErrors.price}
                    placeholder="Precio"
                    min="0.01"
                    step="0.01"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    isInvalid={!!formErrors.description}
                    placeholder="Descripción del producto"
                    minLength={10}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>URL de Imagen (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                  />
                </Form.Group>
                {formErrors.submit && (
                  <div className="text-danger mb-2">{formErrors.submit}</div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Container>
      </Container>
    </>
  );
}

