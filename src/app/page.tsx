import Image from "next/image";
import Link from "next/link"; // Importa Link para la navegación

export default function Home() {
  return (
    <div className="section" style={{paddingTop:'80px',backgroundColor: '#ffffff'}}>

      <main className="container">
        <section className="mb-5">
          <h2 className="mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sobre Nosotros</h2>
          <p style={{ fontFamily: 'Raleway, sans-serif' }}>
            SoftWave Innovate se dedica al desarrollo de herramientas de software utilizando las tecnologías más avanzadas e innovadoras,
            asegurando que sean intuitivas y amigables para el usuario. Nuestra misión es hacer que la tecnología de vanguardia sea accesible
            y fácil de usar, permitiendo a las organizaciones obtener el máximo beneficio sin complicaciones.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Nuestra Herramienta: Sentimetrics</h2>
          <p style={{ fontFamily: 'Raleway, sans-serif' }}>
            Nuestra solución avanzada para el análisis de sentimientos en publicaciones de Facebook utiliza técnicas de procesamiento de lenguaje
            natural y visualización de datos para ayudar a las organizaciones a comprender mejor la recepción de sus publicaciones, optimizar
            sus estrategias de contenido y fortalecer la conexión con su audiencia.
          </p>
        </section>

        <section>
          <h2 className="mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Productos Actuales</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <h5 style={{ fontFamily: 'Raleway, sans-serif', color: 'rgb(0, 123, 255)' }}>Análisis de Sentimientos en Facebook</h5>
              <p style={{ fontFamily: 'Raleway, sans-serif', color: 'rgb(50, 50, 50)' }}>
                Utilizando técnicas avanzadas, esta herramienta permite a las organizaciones obtener información detallada sobre la percepción
                de sus publicaciones en Facebook.
              </p>
            </li>
            {/* Agrega más productos aquí */}
          </ul>
        </section>

        {/* Sección de botones para registro e inicio de sesión */}
        <section className="text-center mb-5">
          <Link href="/register" className="btn btn-primary mx-2">
            Registrar
          </Link>
          <Link href="/login" className="btn btn-secondary mx-2">
            Iniciar Sesión
          </Link>
        </section>
      </main>

      <footer className="bg-light p-3 mt-4">
        <div className="container text-center">
          <p style={{ fontFamily: 'Raleway, sans-serif' }}>&copy; 2024 SoftWave Innovate. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
