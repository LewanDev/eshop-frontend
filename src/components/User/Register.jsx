import { useState } from "react";
import { register } from "../../services/auth";
import Navbar from "../NavBar/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg("");
    
    if (form.password !== form.password2) {
      setMsg("❌ Las contraseñas no coinciden");
      document.getElementById("password").focus();
      return;
    }

    try {
      // const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      //   credentials: "include", // Si usas cookies o tokens autenticados
      // });
      const res = await register(form);

      if (!res.ok) throw new Error("Error en el registro");

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/profile";
    } catch (err) {
      console.error("❌ Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <span>Registro de nuevo usuario</span>
        <form onSubmit={handleSubmit}>
          <div className="content-form">
            <label>Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Repetir contraseña</label>
            <input
              id="password2"
              type="password"
              name="password2"
              placeholder="********"
              value={form.password2}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Espere por favor..." : "Registrarse"}
            </button>
          </div>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </>
  );
};

export default Register;
