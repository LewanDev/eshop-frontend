import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar/Navbar";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

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

      const res = await fetch(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error cargando perfil");

      const data = await res.json();

      // Guardamos solo el usuario
      setUser(data.user);
      console.log("✨ GET USER: " + data.user);
      
      // Llenamos el formulario con los datos del client
      setForm({
        name: data.user.client?.name || "",
        dni: data.user.client?.dni || "",
        address: data.user.client?.address || "",
        phone: data.user.client?.phone || "",
      });

      localStorage.setItem("user", JSON.stringify(data.user));
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
      const res = await fetch(`${API_BASE}/profile`, {
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
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="content">
        <h2>Mi perfil</h2>

        <div className="content-form">
          <label>Email:</label>
          <strong>{user.email}</strong>

          {!editMode ? (
            <>
              <label>Razón social:</label>
              <strong>{user.client?.name || "-"}</strong>

              <label>Documento:</label>
              <strong>{user.client?.dni || "-"}</strong>

              <label>Dirección:</label>
              <strong>{user.client?.address || "-"}</strong>

              <label>Teléfono:</label>
              <strong>{user.client?.phone || "-"}</strong>

              <button onClick={() => setEditMode(true)}>Editar</button>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Razón Social"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="dni"
                placeholder="Documento"
                value={form.dni}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={form.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Guardar</button>
              <button onClick={() => setEditMode(false)} className="btn-logout">
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../NavBar/Navbar";

// const API_BASE =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   // Cargar perfil
//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return handleLogout();

//       const res = await fetch(`${API_BASE}/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("Error cargando perfil");

//       const data = await res.json();
//       setUser(data.user); // guardamos solo el user
//       setForm(data.user.client || {}); // llenamos el form con client

//       localStorage.setItem("user", JSON.stringify(data.user || data));
//     } catch (err) {
//       console.error("Error cargando perfil:", err);
//       handleLogout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${API_BASE}/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) throw new Error("Error guardando perfil");

//       const data = await res.json();
//       // Actualizamos el estado y localStorage
//       setUser(data.user);
//       setForm(data.user.client || {});
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error guardando perfil:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <p style={{ fontSize: 20, textAlign: "center" }}>Cargando perfil...</p>
//       </>
//     );
//   }

//   if (!user) {
//     return (
//       <>
//         <Navbar />
//         <p style={{ fontSize: 20, textAlign: "center" }}>
//           No se encontró usuario. <a href="/login">Iniciar sesión</a>
//         </p>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="content">
//         <h2>Mi perfil</h2>

//         <div className="content-form">
//           <label>Email:</label>
//           <strong>{user.email}</strong>

//           {!editMode ? (
//             <>
//               <label>Razón social:</label>
//               <strong>{user.client?.name || "-"}</strong>
//               <label>Documento:</label>
//               <strong>{user.client?.dni || "-"}</strong>
//               <label>Dirección:</label>
//               <strong>{user.client?.address || "-"}</strong>
//               <label>Teléfono:</label>
//               <strong>{user.client?.phone || "-"}</strong>
//               <button onClick={() => setEditMode(true)}>Editar</button>
//               <button onClick={handleLogout} className="btn-logout">
//                 Cerrar sesión
//               </button>
//             </>
//           ) : (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Razón Social"
//                 value={form.name || ""}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="dni"
//                 placeholder="Documento"
//                 value={form.dni || ""}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Dirección"
//                 value={form.address || ""}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Teléfono"
//                 value={form.phone || ""}
//                 onChange={handleChange}
//               />
//               <button onClick={handleSave}>Guardar</button>
//               <button onClick={() => setEditMode(false)} className="btn-logout">
//                 Cancelar
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
