'use client'
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      // Obtener dimensiones y posiciones
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;

      // Si no hay suficiente contenido para scroll, mostrar footer
      if (documentHeight <= windowHeight) {
        setIsVisible(true);
        return;
      }

      // Calcular si estamos cerca del final (últimos 50px)
      const isNearBottom = (windowHeight + scrollPosition) >= (documentHeight - 50);
      setIsVisible(isNearBottom);
    };

    // Verificar estado inicial
    checkScroll();

    // Agregar event listener
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <footer 
      className="footer w-100 container-fluid fixed-bottom"
      style={{
        backgroundColor: 'transparent',
        transition: 'transform 0.3s ease-in-out',
        transform: `translateY(${isVisible ? '0' : '100%'})`,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontFamily: 'Gotham',
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-start">
          {/* Logo */}
          <div className="col-3  text-md-left mb-3 mb-md-0" style={{ marginLeft: '1%'}}>
            <Image
               src={"/logo.png"}
               alt='Logo'
               width={0}
               height={0}
               style={{
                 marginLeft: '9%',
                 height: 'clamp(2.4rem, 0.6vw + 0.1rem, 0.7rem)',  // Tamaño similar a `fontSize: '1.7rem'`
                 width: 'auto',     // Mantiene proporción de la imagen
              }}
              sizes="100vw"

            />
          </div>

          {/* Atención al Cliente */}
          <div className="col-2 mb-3 mb-md-5" style={{fontSize: 'clamp(0.6rem, 0.8vw + 0.3rem, 1rem)', lineHeight: '1.5', marginLeft: '-5%' }}>
            <ul className="list-unstyled">
              <li>Atención al Cliente</li>
              <li>Contáctanos</li>
              <li>Preguntas Frecuentes</li>
            </ul>
          </div>

          {/* Menciones Legales */}
          <div className="col-2 text-md-left mb-3 mb-md-0" style={{ marginLeft: '14%', fontSize: 'clamp(0.6rem, 0.8vw + 0.3rem, 1rem)', lineHeight: '1.5' }}>
            <ul className="list-unstyled">
              <li>Menciones Legales</li>
              <li>Términos</li>
              <li>Privacidad</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="col-md-3 text-center text-md-right ms-auto">
            <p className="mb-1" style={{ fontSize: 'clamp(0.6rem, 0.8vw + 0.3rem, 1rem)', lineHeight: '1.5' }}>Contactanos en <i className="bi bi-instagram fs-4 ml-3" style={{ fontSize: 'clamp(0.8rem, 1.1vw + 0.4rem, 1rem)' }}></i></p>
            
          </div>  
        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col-12 text-center mt-4" style={{ fontSize: 'clamp(0.7rem, 0.7vw + 0.3rem, 0.9rem)' }}>
            <p className="mb-0">2024 SoftWave Innovate, Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
