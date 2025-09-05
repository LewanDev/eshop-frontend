import { useState } from "react";
import "./Contact.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <h1 className="contact-title">Contactanos</h1>
        <p className="contact-subtitle">
          Podes retirar por nuestro local 48 hs hábiles después de haber hecho
          tu compra online. ¡Gracias por elegirnos!
        </p>
        <div className="contact-container">
          {/* Formulario */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Mensaje</label>
            <textarea
              name="message"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-send">
              Enviar
            </button>
          </form>

          {/* Info de contacto */}
          <div className="contact-info">
            <h2>Información</h2>
            <p>
              <strong>Email:</strong> soporte@eshop.com
            </p>
            <p>
              <strong>Teléfono:</strong> +54 11 1234-5678
            </p>
            <p>
              <strong>Dirección:</strong> Av. Siempre Viva 742, Buenos Aires
            </p>

            {/* Mapa opcional */}
            <div className="map">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.9133646834935!2d-93.30087952440064!3d37.24976294222963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf6280740a49f5%3A0x58b047bd968e73d3!2s742%20W%20Evergreen%20St%2C%20Springfield%2C%20MO%2065803%2C%20USA!5e0!3m2!1sen!2sar!4v1757097402956!5m2!1sen!2sar"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
