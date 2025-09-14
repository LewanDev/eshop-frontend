import { useState } from "react";
import { login } from "../../services/auth";
import Navbar from "../NavBar/Navbar";
import "./User.css";
import Footer from "../Footer/Footer";

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
        setMsg(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMsg("❌ Fatal error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg min-w-3xs py-3.5 px-10 m-5 rounded-xl text-start bg-(--color-lighter) flex flex-col my-7 mx-auto gap-5">
        <span className="text-2xl font-bold">Login</span>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between gap-2.5">
            <label>Correo electrónico</label>
            <input
              className="w-full input-light"
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
              className="w-full input-light"
              id="password"
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-green"
            >
              {loading ? "Espere por favor..." : "Ingresar"}
            </button>
          </div>
        </form>
        {msg && <p>{msg}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Login;
