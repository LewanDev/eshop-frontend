import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl my-5 mx-auto leading-10">
        <h1 className="text-center text-4xl font-black my-12 text-(--color-dark)">Sobre Nosotros</h1>

        <section className="mb-8">
          <h2 className="text-2xl mb-2.5 font-bold text-(--color-secondary)">Nuestra Historia</h2>
          <p>
            E-Shop Deluxe nació con el objetivo de ofrecer productos de calidad al
            mejor precio. Empezamos como un pequeño emprendimiento familiar y
            hoy nos enorgullece contar con una amplia variedad de artículos para
            nuestros clientes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-2.5 font-bold text-(--color-secondary)">Nuestra Misión</h2>
          <p>
            Queremos que cada cliente tenga una experiencia de compra simple,
            rápida y segura. Nos enfocamos en brindar atención personalizada y
            productos que se adapten a las necesidades de cada persona.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-2.5 font-bold text-(--color-secondary)">Nuestros Valores</h2>
          <ul>
            <li>✔ Compromiso con la calidad</li>
            <li>✔ Atención al cliente cercana</li>
            <li>✔ Innovación constante</li>
            <li>✔ Respeto y confianza</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-2.5 font-bold text-(--color-secondary)">¿Por qué elegirnos?</h2>
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
