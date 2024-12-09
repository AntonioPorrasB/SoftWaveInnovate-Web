'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PruebaDatawave = () => {
  const [postUrl, setPostUrl] = useState<string>(''); // Almacena la URL del post
  const [loading, setLoading] = useState<boolean>(false); // Estado para indicar si está cargando
  const [result, setResult] = useState<any>(null); // Almacena los resultados del análisis

  // Función para enviar la solicitud de análisis a la API
  const analyzePost = async () => {
    if (!postUrl.trim()) {
      alert('Por favor, ingresa un enlace válido.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://datawaveapi.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: postUrl }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setResult(data); // Almacena los resultados en el estado
    } catch (error) {
      console.error('Error analyzing post:', error);
      alert('Hubo un error al analizar la publicación. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Configuración del gráfico de barras horizontales Sentimientos
  const barData = {
    labels: ['Positivos', 'Negativos'], // Etiquetas
    datasets: [
      {
        label: '',
        data: [result?.positive_count || 0, result?.negative_count || 0], // Datos del análisis
        backgroundColor: ['#F3F5F4', '#F3F5F4'], // Colores
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Bordes
        borderWidth: 0,
        borderRadius: 10,
        barThickness: 25,
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    indexAxis: 'y' as const, // Barras horizontales
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Recuento de comentarios positivos y negativos',
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'normal',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF', // Color de los valores en el eje X
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0)', // Líneas del grid
        },
        title: {
          display: true,
          text: 'Cuenta', // Texto del eje X
          color: '#FFFFFF',
          font: {
            size: 14,
          },
        },
        border:{
          color: '#FFFFFF',
        }
      },
      y: {
        ticks: {
          color: '#FFFFFF', // Color de los valores en el eje Y
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0)', // Líneas del grid
        },
        title: {
          display: true,
          text: 'Sentimiento', // Texto del eje Y
          color: '#FFFFFF',
          font: {
            size: 14,
          },
        },
        border:{
          color: '#FFFFFF',
        }
      },
    },
  };


  const topics = result?.topics || [];
  const topicNames = topics.map((topic: { name: string, count: number }) => topic.name);
  const topicCounts = topics.map((topic: { name: string, count: number }) => topic.count);
  // Configuración del gráfico de barras horizontales Temas
  const barDataTems = {
    labels: topicNames, // Etiquetas
    datasets: [
      {
        label: '',
        data: topicCounts, // Datos del análisis
        backgroundColor: ['#F3F5F4', '#F3F5F4'], // Colores
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Bordes
        borderWidth: 0,
        borderRadius: 10,
        barThickness: 25,
      },
    ],
  };

  const barOptionsTems: ChartOptions<'bar'> = {
    indexAxis: 'y' as const, // Barras horizontales
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Recuento de comentarios separados por Tema',
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'normal',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF', // Color de los valores en el eje X
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0)', // Líneas del grid
        },
        title: {
          display: true,
          text: 'Cuenta', // Texto del eje X
          color: '#FFFFFF',
          font: {
            size: 14,
          },
        },
        border:{
          color: '#FFFFFF',
        }
      },
      y: {
        ticks: {
          color: '#FFFFFF', // Color de los valores en el eje Y
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0)', // Líneas del grid
        },
        title: {
          display: true,
          text: 'Tema', // Texto del eje Y
          color: '#FFFFFF',
          font: {
            size: 14,
          },
        },
        border:{
          color: '#FFFFFF',
        }
      },
    },
  };

  // Procesar los datos de palabras frecuentes
const frequentWords = result?.frequent_words || [];
const wordLabels = frequentWords.map((wordObj: { word: string, count: number }) => wordObj.word);
const wordCounts = frequentWords.map((wordObj: { word: string, count: number }) => wordObj.count);

// Configuración del gráfico de barras para palabras frecuentes
const barDataWords = {
  labels: wordLabels, // Etiquetas con las palabras frecuentes
  datasets: [
    {
      label: 'Frecuencia de Palabras',
      data: wordCounts, // Datos del análisis
      backgroundColor: ['#FFD700', '#FF6347', '#40E0D0', '#F3F5F4'], // Ajusta los colores
      borderColor: ['rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 0,
      borderRadius: 10,
      barThickness: 25,
    },
  ],
};

// Opciones del gráfico para palabras frecuentes
const barOptionsWords: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Palabras más frecuentes en los comentarios',
      color: '#FFFFFF',
      font: {
        size: 16,
        weight: 'normal',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0)',
      },
      title: {
        display: true,
        text: 'Frecuencia',
        color: '#FFFFFF',
        font: {
          size: 14,
        },
      },
      border: {
        color: '#FFFFFF',
      },
    },
    y: {
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0)',
      },
      title: {
        display: true,
        text: 'Palabras',
        color: '#FFFFFF',
        font: {
          size: 14,
        },
      },
      border: {
        color: '#FFFFFF',
      },
    },
  },
 };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#090909',
        backgroundImage:
          'radial-gradient(circle at bottom, #00338E, #08193D, #09101F,#090909, #010308)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        color: 'white',
        fontFamily: 'Gotham',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container fluid style={{ paddingTop: '80px', paddingBottom: '210px' }}>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 style={{ fontSize: '3em', marginBottom: '40px' }}>
              Ingresa el link de la publicación
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                analyzePost();
              }}
            >
              <Form.Control
                type="text"
                placeholder="Ingresa el link"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: '1px solid #FFFFFF',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  borderRadius: '25px',
                  padding: '10px 40px',
                  fontSize: '1rem',
                  border: 'none',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  width: '25%',
                }}
                disabled={loading}
              >
                {loading ? 'Analizando...' : 'Analizar'}
              </Button>
            </Form>
          </Col>
        </Row>
        {result && (
          <Row className="justify-content-center text-center mt-4">
            <Col md={8}>
              <div className="pb-4"> {/* Padding inferior para separar gráficas */}
                <Bar data={barData} options={barOptions} />
              </div>
              <div className="pb-4"> {/* Padding inferior para separar gráficas */}
                <Bar data={barDataTems} options={barOptionsTems} />
              </div>
              <div className="pb-4"> {/* Padding inferior para separar gráficas */}
                <Bar data={barDataWords} options={barOptionsWords} />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PruebaDatawave;
