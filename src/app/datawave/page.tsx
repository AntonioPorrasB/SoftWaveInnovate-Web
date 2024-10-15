'use client'
import React, { useState } from 'react';
import '../components/Principal.css'


const Principal: React.FC = () => {
  const [postUrl, setPostUrl] = useState<string>(''); // Almacena la URL del post
  const [result, setResult] = useState<any>(null); // Almacena los resultados del análisis

  // Función para enviar la solicitud de análisis a la API
  const analyzePost = async () => {
    try {
      const response = await fetch('https://datawaveapi.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: postUrl }), // Usamos 'link' como clave en el body
      });

      // Verifica si la respuesta no es exitosa
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      // Parseamos la respuesta a JSON
      const data = await response.json();
      setResult(data); // Almacena los resultados en el estado
    } catch (error) {
      console.error('Error analyzing post:', error);
      alert('Hubo un error al analizar la publicación. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="imageContainer">
          <img src='/STW.png' alt="StrawBerry Technology" className="image" />
          <div className="imageTextContainer">
            <p className="imageTextMain">StrawBerry</p>
            <p className="imageTextSub">Technology</p>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="leftContent">
          <h1>¡Maximiza el Impacto de tu Negocio en Facebook!</h1>
          <p>
            Lleva tu estrategia de marketing en Facebook al siguiente nivel. ¡Prepárate para destacarte entre la multitud y dejar una impresión duradera en tus seguidores!
          </p>
          <div className="analyzeContainer">
            <input
              type="text"
              className="textInput"
              placeholder="Ingresa el enlace de la publicación de Facebook..."
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)} // Almacena la URL que ingresa el usuario
            />
            <button className="button" onClick={analyzePost}>
              Analizar
            </button>
          </div>
        </div>
        <div className="rightContent">
          <img src='/CEL.png' alt="CEL" className="rightImage" />
        </div>
      </div>
      <div className="result">
        {result && (
          <div>
            <h2>Gráficas:</h2>
            {/* Mostrar datos adicionales del análisis */}
            <h2>Recuento de Comentarios:</h2>
            <p>Comentarios positivos: {result.positive_count}</p>
            <p>Comentarios negativos: {result.negative_count}</p>
            
            <h2>Clasificación de Comentarios:</h2>
            <ul>
              {result.classified_comments.map((commentObj: any, index: number) => (
                <li key={index}>
                  <strong>{commentObj.sentiment.toUpperCase()}:</strong> {commentObj.comment}
                </li>
              ))}
            </ul>

            {/* Mostrar el JSON del resultado */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Principal;
