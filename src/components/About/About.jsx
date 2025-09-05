import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";
import "./About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <h1 className="about-title">Sobre Nosotros</h1>

        <section className="about-section">
          <h2>Nuestra Historia</h2>
          <p>
            E-Shop Deluxe nació con el objetivo de ofrecer productos de calidad al
            mejor precio. Empezamos como un pequeño emprendimiento familiar y
            hoy nos enorgullece contar con una amplia variedad de artículos para
            nuestros clientes.
          </p>
        </section>

        <section className="about-section">
          <h2>Nuestra Misión</h2>
          <p>
            Queremos que cada cliente tenga una experiencia de compra simple,
            rápida y segura. Nos enfocamos en brindar atención personalizada y
            productos que se adapten a las necesidades de cada persona.
          </p>
        </section>

        <section className="about-section">
          <h2>Nuestros Valores</h2>
          <ul>
            <li>✔ Compromiso con la calidad</li>
            <li>✔ Atención al cliente cercana</li>
            <li>✔ Innovación constante</li>
            <li>✔ Respeto y confianza</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>¿Por qué elegirnos?</h2>
          <p>
            Porque trabajamos día a día para ofrecerte lo mejor. Tu satisfacción
            es nuestra prioridad.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
