/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Navbar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import BackButton from "../../Misc/BackButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const Config = () => {
  const [emails, setEmails] = useState([{ id: Date.now(), value: "" }]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 Validador simple
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 📥 Cargar configuración existente desde el backend
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_URL}/config`);
        if (res.ok) {
          const data = await res.json();
          if (data.emails && data.emails.length > 0) {
            setEmails(data.emails.map((e, i) => ({ id: i, value: e })));
          }
        }
      } catch (err) {
        console.error("Error al obtener configuración:", err);
      }
    };
    fetchConfig();
  }, []);

  // 🧩 Cambia el valor de un input específico
  const handleEmailChange = (id, value) => {
    setEmails(emails.map((e) => (e.id === id ? { ...e, value } : e)));
  };

  // ➕ Agregar nuevo input (si el anterior es válido)
  const handleAddEmail = () => {
    const last = emails[emails.length - 1];
    if (!last.value || !isValidEmail(last.value)) {
      setError("Debes completar un correo válido antes de agregar otro.");
      return;
    }
    setError("");
    setEmails([...emails, { id: Date.now(), value: "" }]);
  };

  // ❌ Eliminar un email específico
  const handleRemoveEmail = (id) => {
    if (emails.length === 1) return; // evita borrar el último
    setEmails(emails.filter((e) => e.id !== id));
  };

  // 💾 Guardar configuración
  const handleSave = async () => {
    const invalids = emails.filter((e) => !isValidEmail(e.value));
    if (invalids.length > 0) {
      setError("Hay correos inválidos. Corrígelos antes de guardar.");
      return;
    }

    setError("");
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: emails.map((e) => e.value) }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al guardar.");

      setMessage("✅ Configuración guardada con éxito.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col m-8 mx-auto px-8 pb-8 gap-4 w-full max-w-5xl bg-(--color-lighter) rounded-lg shadow-md">
        <span className="txt-dark-lg">Configuración de Emails</span>

        {emails.map((email, index) => (
          <div key={email.id} className="flex flex-row items-center gap-3">
            <input
              type="email"
              className="input-light"
              placeholder={`Email ${index + 1}`}
              value={email.value}
              onChange={(e) => handleEmailChange(email.id, e.target.value)}
            />
            {emails.length > 1 && (
              <button
                className="cursor-pointer "
                onClick={() => handleRemoveEmail(email.id)}
              >
                ❌
              </button>
            )}
          </div>
        ))}

        {error && <span className="txt-red-base">{error}</span>}
        <button
          className="txt-darkgreen-sm cursor-pointer"
          onClick={handleAddEmail}
        >
          + Agregar Email
        </button>
        <div className="flex flex-row justify-between gap-10">
          <BackButton />
          <button className="btn-secondary" onClick={handleSave}>
            💾 Guardar
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
