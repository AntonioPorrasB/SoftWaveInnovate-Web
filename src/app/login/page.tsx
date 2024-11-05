'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login = () => {
  const handleCreateAccount = () => {
    router.push('/register'); 
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  // Función para manejar el inicio de sesión
  const handleLogin = async (username: string, password: string) => {
    try {
      // Verifica las credenciales en /login
      //const loginResponse = await fetch('http://127.0.0.1:8000/login', {
      const loginResponse = await fetch('https://softwaveapi.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.detail || 'Error en el inicio de sesión');
      }

      // Si el inicio de sesión es exitoso, obtén el token de /token
      //const tokenResponse = await fetch('http://127.0.0.1:8000/token', {
      const tokenResponse = await fetch('https://softwaveapi.onrender.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
        credentials: 'include',
      });

      if (!tokenResponse.ok) {
        throw new Error('Error al obtener el token');
      }

      const data = await tokenResponse.json();
      // Guarda el token en Cookies
      console.log('Respuesta del servidor:', data);
      const cookies = document.cookie;
      console.log('Cookies después del login:', cookies);
      if (!cookies.includes('token=')) {
        Cookies.set('token', data.access_token, { expires: 7, secure: false, sameSite: 'Lax', httponly: false, domain: "localhost" });
        console.log('Cookie establecida manualmente');
      }
      // Redirige a la página deseada
      router.push('/profile'); 
    } catch (error) {
      console.error('Error iniciando sesión:', error);
      alert('Error iniciando sesión: ' + error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(formData.username, formData.password);
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
          <Col md={4} className="text-center" style={{ marginRight: '8%' }}>
            <h1 style={{ fontSize: '3em', marginBottom: '50px' }}>Bienvenido...</h1>
            <p style={{ fontSize: '1.1em', color: '#CCCCCC', maxWidth: '400px', margin: 'auto' }}>
              Si eres nuevo usuario de SoftWave Innovate crea una cuenta para que no te pierdas de todos los beneficios.
            </p>
            <Button
              variant="light"
              className="mt-3"
              style={{
                borderRadius: '25px',
                padding: '10px 30px',
                fontSize: '1em',
                fontWeight: 'bold',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
              }}
              onClick={handleCreateAccount}
            >
              Crear Cuenta
            </Button>
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
              <Form.Group controlId="formUser">
                <Form.Label style={{ color: '#CCCCCC' }}>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Ingresa tu usuario"
                  value={formData.username}
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
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
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
              <div className="text-left mb-3">
                <a href="#" style={{ color: '#999999', fontSize: '0.9em' }}>¿Has olvidado tu contraseña? Recuperar contraseña</a>
              </div>
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
                Iniciar Sesión
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
