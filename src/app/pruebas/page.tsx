'use client';
import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
//const response = await fetch('https://softwaveapi.onrender.com/register', {
// e: React.ChangeEvent<HTMLInputElement>
// e: React.FormEvent<HTMLFormElement>
const Pruebas = () => {
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
            <Form>
              <Form.Group controlId="formName">
                <Form.Label style={{ color: '#CCCCCC' }}>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
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

export default Pruebas;
