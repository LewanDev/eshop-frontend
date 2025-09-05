import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1: Logo / Nombre */}
        <div className="footer-section">
          <h2 className="footer-logo">E-Shop Demo</h2>
          <p>Los mejores productos al mejor precio</p>
        </div>

        {/* Columna 2: Links rápidos */}
        <div className="footer-section">
          <h3>Secciones</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/products">Productos</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/about">Nosotros</a></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales */}
        <div className="footer-section">
          <h3>Seguinos</h3>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐 Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📸 Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 Twitter</a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} E-Shop Demo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
