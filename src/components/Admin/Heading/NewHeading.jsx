import { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import BackButton from "../../Misc/BackButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const NewHeading = () => {
  const [headings, setHeadings] = useState([]);
  const [form, setForm] = useState({
    code: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // 🔹 Obtener headings al montar
  useEffect(() => {
    fetchHeadings();
  }, []);

  const fetchHeadings = async () => {
    try {
      const res = await fetch(`${API_URL}/headings`);
      const data = await res.json();
      setHeadings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error al traer headings:", err);
      setHeadings([]);
    }
  };

  // 🔹 Manejo de formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Crear o editar heading
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch(`${API_URL}/headings/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`${API_URL}/headings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      // Reset form
      setForm({ code: "", description: "" });
      setEditingId(null);
      setIsModalOpen(false);
      fetchHeadings();
    } catch (err) {
      console.error("❌ Error al guardar heading:", err);
    }
  };

  // 🔹 Cargar datos en formulario
  const handleEdit = (heading) => {
    setForm({
      code: heading.code,
      description: heading.description,
    });
    setEditingId(heading._id);
    setIsModalOpen(true);
  };

  // 🔹 Eliminar heading
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este heading?")) return;

    try {
      await fetch(`${API_URL}/headings/${id}`, { method: "DELETE" });
      fetchHeadings();
    } catch (err) {
      console.error("❌ Error al eliminar heading:", err);
    }
  };

  // 🔹 Filtrar
  const filteredHeadings = headings.filter(
    (h) =>
      h.description?.toLowerCase().includes(search.toLowerCase()) ||
      String(h.code).includes(search)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-6 bg-(--color-lighter)">
        <div className="flex justify-between items-center mb-4">
          <BackButton />
          <h2 className="text-2xl font-bold mx-5">Gestión de Rubros</h2>
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ code: "", description: "" });
              setIsModalOpen(true);
            }}
            className="btn-green"
          >
            Agregar
          </button>
        </div>

        {/* Filtro */}
        <input
          type="text"
          placeholder="Buscar por código o descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-light w-full mb-4"
        />

        {/* Tabla */}
        <table className="w-full bg-(--color-lightest) shadow rounded-xl">
          <thead>
            <tr className="bg-(--color-gray) text-(--color-lighter) text-lg">
              <th className="p-2">Código</th>
              <th className="p-2">Descripción</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredHeadings?.length > 0 ? (
              filteredHeadings.map((h) => (
                <tr key={h._id} className="border-t text-center text-lg">
                  <td className="p-2 font-bold">{h.code}</td>
                  <td className="p-2">{h.description}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(h)}
                      className="btn-blue-icon"
                    >
                      <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 24.00 24.00"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                            stroke="#ffffff"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(h._id)}
                      className="btn-red-icon"
                    >
                      <svg
                        width="32px"
                        height="32px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M10 12V17"
                            stroke="#ffffff"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M14 12V17"
                            stroke="#ffffff"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M4 7H20"
                            stroke="#ffffff"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                            stroke="#ffffff"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                          <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#ffffff"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-4 text-(--color-gray)"
                >
                  No hay rubros cargados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-(--color-transparent-o6) flex justify-center items-center">
          <div className="bg-(--color-lighter) p-6 rounded shadow-lg w-3xl">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Editar Rubro" : "Agregar nuevo Rubro"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 justify-between"
            >
              <input
                type="number"
                name="code"
                placeholder="Código"
                value={form.code}
                onChange={handleChange}
                className="input-light"
                disabled={!!editingId}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="w-full input-light"
                required
              />
              <div className="flex flex-row gap-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full btn-red"
                >
                  Cancelar
                </button>
                <button type="submit" className="w-full btn-green">
                  {editingId ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewHeading;
