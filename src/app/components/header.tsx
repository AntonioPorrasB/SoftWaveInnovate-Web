'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      const scrollPosition = window.scrollY;

      const isNearTop = scrollPosition <= 50;
      setIsVisible(isNearTop);



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
    <header className="container-fluid py-3 w-100" style={{ backgroundColor: 'transparent', zIndex: 1000, fontFamily: 'Gotham', transition: 'transform 0.3s ease-in-out', transform: `translateY(${isVisible ? '0' : '-100%'})` }}>
      <div className="row align-items-center">
        <div className="col-md-3">
          <Image 
            src={"/logo.png"}
            alt='Logo'
            width={0}
            height={0}
            style={{
              marginLeft: '9%',
              height: 'clamp(2.4rem, 0.7vw + 0.2rem, 0.8rem)',  // Tamaño similar a `fontSize: '1.7rem'`
              width: 'auto',     // Mantiene proporción de la imagen
            }}
            sizes="100vw"
          
          />
        </div>
        <nav className="col-md-9 d-flex justify-content-end align-items-center"> {/* Añadido flex-wrap */}
          <a href="/" className="text-decoration-none" style={{ fontSize: 'clamp(1rem, 1.1vw + 0.1rem, 1.1rem)', color: 'white', marginRight: '9%'}}>
            Inicio
          </a>
          <a href="#" className="text-decoration-none" style={{ fontSize: 'clamp(1rem, 1.1vw + 0.1rem, 1.1rem)', color: 'white', marginLeft: '10%', marginRight: '13%' }}>
            Productos
          </a>
          <a href="/profile" className="text-decoration-none" style={{ fontSize: 'clamp(1rem, 1.1vw + 0.1rem, 1.1rem)', color: 'white', marginLeft: '5%', marginRight: '5%' }}>
            Cuenta
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
