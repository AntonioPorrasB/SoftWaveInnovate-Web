'use client'
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

const HomeDatawave = () => {
  const router = useRouter();
  return (
    <div style={{ 
    minHeight: "100vh", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: '#090909',
    backgroundImage: 'radial-gradient(circle at bottom, #00338E, #08193D, #09101F,#090909, #010308)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
    color: 'white',
    fontFamily: 'Gotham',
    }}>
      <Container fluid className="text-center" style={{ paddingTop: '80px', paddingBottom: '210px' }}>
        <Row>
          <Col>
            <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>Esto es DataWave</h1>
            <h2 style={{ fontSize: "3rem", marginBottom: "2rem" }}>conocimiento en cada opinión</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="light"
              style={{
                backgroundColor: 'transparent',
                borderColor: "white",
                fontSize: "1rem",
                padding: "0.75rem 2rem",
                borderRadius: "25px",
                boxShadow: "0 0 10px rgba(0, 123, 255, 0.5)",
                marginBottom: "3%",
                color: "white",
              }}
              onClick={() => router.push("/pruebadatawave")}
            >
              <i className="bi bi-play-fill" style={{ fontSize: "1.2rem"}}></i>
              Prueba Datawave
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ fontSize: "1rem", marginTop: "2rem" }}>
              Amplifica el éxito de tu negocio <br />
              Una herramienta para tu negocio de SoftWave
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeDatawave;
