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
      <div className="max-w-[1000px] my-5 mx-auto p-5">
        <h1 className="text-center mb-7 font-bold text-4xl text-(--color-dark)">
          Contactanos
        </h1>
        <p className="text-center text-xl mb-6">
          Podes retirar por nuestro local 48 hs hábiles después de haber hecho
          tu compra online.
          <br />
          ¡Gracias por elegirnos!
        </p>
        <div className="flex flex-wrap gap-10">
          <form
            className="flex-1 basis-96 flex flex-col"
            onSubmit={handleSubmit}
          >
            <label className="my2 mb-1 font-bold">Nombre</label>
            <input
              className="p-2.5 border border-solid border-(--color-light) rounded-lg text-base mb-3.5"
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label className="my2 mb-1 font-bold">Email</label>
            <input
              className="p-2.5 border border-solid border-(--color-light) rounded-lg text-base mb-3.5"
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="my2 mb-1 font-bold">Mensaje</label>
            <textarea
              className="p-2.5 border border-solid border-(--color-light) rounded-lg text-base mb-3.5 resize-y min-h-24"
              name="message"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-(--color-green) text-(--color-lightest) p-3.5 border-0 rounded-xl text-base font-bold cursor-pointer transition-all duration-500 hover:bg-(--color-green-dark)"
            >
              Enviar
            </button>
          </form>

          <div className="flex-1 basis-96 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Información</h2>
            <div className="flex flex-row gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>{" "}
              <span className="italic">soporte@eshop.com</span>
            </div>
            <div className="flex flex-row gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span className="italic">+54 11 1234-5678</span>
            </div>
            <div className="flex flex-row gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span className="italic">Av. Siempre Viva 742, Buenos Aires</span>
            </div>

            <div className="mt-2 rounded-lg overflow-hidden">
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
