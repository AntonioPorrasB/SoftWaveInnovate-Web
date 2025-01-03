'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    usuario: '',
    contraseña: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //const response = await fetch('http://127.0.0.1:8000/register', {
      const response = await fetch('https://softwaveapi.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.correo,
          username: formData.usuario,
          password: formData.contraseña,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.detail || 'Error desconocido');
        alert(errorData.detail || 'Error registrando usuario');
        return;
      }

      const data = await response.json();
      console.log('Éxito:', data);
      alert('¡Cuenta creada exitosamente!');
      router.push('/login');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error registrando usuario');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#090909',
        backgroundImage: 'radial-gradient(circle at bottom, #00338E, #08193D, #09101F,#090909, #010308)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        color: 'white',
        fontFamily: 'Gotham',
      }}
    >
      <Container fluid style={{ paddingTop: '80px', paddingBottom: '210px' }}>
        <Row className="justify-content-center" style={{ marginTop: '50px' }}>
          <Col md={4} className="text-center" style={{ marginRight: '8%', marginTop: '12%' }}>
            <h1 style={{ fontSize: '3em', marginBottom: '50px' }}>Crea Cuenta</h1>
            <p style={{ fontSize: '1.1em', color: '#CCCCCC', maxWidth: '400px', margin: 'auto' }}>
              Se parte de Soft Wave Innovate y adquiere el mejor plan que se adapte a tus necesidades, haz crecer tu negocio.
            </p>
          </Col>

          <Col
            md={6}
            style={{
              backgroundColor: 'transparent',
              borderRadius: '25px',
              padding: '40px',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
              marginTop: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label style={{ color: '#CCCCCC' }}>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mb-3"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '10px',
                    boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.1)',
                    border: '1.4px solid rgba(255, 255, 255, 0.5)',
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label style={{ color: '#CCCCCC' }}>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="mb-3"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '10px',
                    boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.1)',
                    border: '1.4px solid rgba(255, 255, 255, 0.5)',
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label style={{ color: '#CCCCCC' }}>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  className="mb-3"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '10px',
                    boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.1)',
                    border: '1.4px solid rgba(255, 255, 255, 0.5)',
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label style={{ color: '#CCCCCC' }}>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  className="mb-3"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '10px',
                    boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.1)',
                    border: '1.4px solid rgba(255, 255, 255, 0.5)',
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="light"
                className="w-100"
                style={{
                  borderRadius: '25px',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  padding: '10px 0',
                  boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                }}
              >
                Crear Cuenta
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
