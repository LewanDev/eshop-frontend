import { useState } from "react";
import { login } from "../../services/auth";
import Navbar from "../NavBar/Navbar";
import "./User.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg("");

    try {
      const data = await login(form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMsg("✅ Login exitoso");
        window.location.href = "/profile";
      } else {
        setMsg(`❌ Error: ${data.msg}`);
      }
    } catch (error) {
      setMsg("❌ Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <span>Login</span>
        <form onSubmit={handleSubmit}>
          <div className="content-form">
            <label>Correo electrónico</label>
            <input
              name="email"
              id="name"
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
            <button type="submit" disabled={loading}>
              {loading ? "Espere por favor..." : "Ingresar"}
            </button>
          </div>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </>
  );
};

export default Login;
