import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Cargar perfil
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return handleLogout();

      const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error cargando perfil");

      const data = await res.json();

      // Guardamos solo el usuario
      setUser(data.user);
      console.log("✨ GET USER: " + data.user.name);

      // Llenamos el formulario con los datos del client
      setForm({
        name: data.user.client?.name || "",
        dni: data.user.client?.dni || "",
        address: data.user.client?.address || "",
        phone: data.user.client?.phone || "",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.user.email,
          name: data.user.client?.name,
          phone: data.user.client?.phone,
          address: data.user.client?.address,
          dni: data.user.client?.dni,
          isAdmin: data.user.isAdmin,
        })
      );
    } catch (err) {
      console.error("Error cargando perfil:", err);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Cambios en el form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error guardando perfil");

      const data = await res.json();

      // Actualizamos estado y localStorage
      setUser(data.user);
      setForm({
        name: data.user.client?.name || "",
        dni: data.user.client?.dni || "",
        address: data.user.client?.address || "",
        phone: data.user.client?.phone || "",
      });
      console.log("✨ SAVE USER: " + data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setEditMode(false);
    } catch (err) {
      console.error("Error guardando perfil:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <p style={{ fontSize: 20, textAlign: "center" }}>Cargando perfil...</p>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <p style={{ fontSize: 20, textAlign: "center" }}>
          No se encontró usuario. <a href="/login">Iniciar sesión</a>
        </p>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-1 w-xl py-4 px-10 my-5 rounded-xl text-start bg-(--color-lighter) flex flex-col mx-auto gap-5">
        <h2 className="text-2xl font-bold">Mis datos</h2>
        <div className="flex-1 flex flex-col h-full justify-between">
          {!editMode ? (
            <div className="flex-1 flex flex-col h-full justify-between">
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-1">
                  <label>Email:</label>
                  <strong>{user.email}</strong>
                </div>
                <div className="flex flex-row gap-1">
                  <label>Razón social:</label>
                  <strong>{user.client?.name || "-"}</strong>
                </div>
                <div className="flex flex-row gap-1">
                  <label>Documento:</label>
                  <strong>{user.client?.dni || "-"}</strong>
                </div>
                <div className="flex flex-row gap-1">
                  <label>Dirección:</label>
                  <strong>{user.client?.address || "-"}</strong>
                </div>
                <div className="flex flex-row gap-1">
                  <label>Teléfono:</label>
                  <strong>{user.client?.phone || "-"}</strong>
                </div>
              </div>
              <div className="flex flex-row gap-2.5 h-12">
                <button
                  className="w-full btn-green"
                  onClick={() => setEditMode(true)}
                >
                  Editar
                </button>
                <button onClick={handleLogout} className="w-full btn-red">
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-3">
                <label>Email:</label>
                <strong>{user.email}</strong>
              </div>
              <div className="flex-1 flex flex-col items-start">
                <label className="text-(--color-gray) ml-2.5">Nombre</label>
                <input
                  className="w-full input-light"
                  type="text"
                  name="name"
                  placeholder="Razón Social"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-(--color-gray) ml-2.5">Documento</label>
                <input
                  className="w-full input-light"
                  type="text"
                  name="dni"
                  placeholder="Documento"
                  value={form.dni}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-(--color-gray) ml-2.5">Dirección</label>
                <input
                  className="w-full input-light"
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-(--color-gray) ml-2.5">Teléfono</label>
                <input
                  className="w-full input-light"
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-row gap-2.5 h-12">
                <button className="w-full btn-green" onClick={handleSave}>
                  Guardar
                </button>
                <button
                  className="w-full btn-red"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
