import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import formatPrice from "../../../utils/formatPrice";

const API_URL = "http://localhost:5000/api/auth"; // tu backend

const NewItem = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    code: "",
    description: "",
    price1: "",
    currency: "ARS",
  });
  const [editingCode, setEditingCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // 🔹 Obtener todos los items al montar el componente
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("❌ Error al traer items:", err);
    }
  };

  // 🔹 Manejo del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Crear o editar item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCode) {
        // PUT actualizar
        await fetch(`${API_URL}/item/${editingCode}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // POST nuevo item
        await fetch(`${API_URL}/newItem`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      setForm({ code: "", description: "", price1: "", currency: "ARS" });
      setEditingCode(null);
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error("❌ Error al guardar item:", err);
    }
  };

  // 🔹 Cargar datos de item en formulario para editar
  const handleEdit = (item) => {
    setForm({
      code: item.code,
      description: item.description,
      price1: item.price1,
      currency: item.currency,
    });
    setEditingCode(item.code);
    setIsModalOpen(true);
  };

  // 🔹 Eliminar item
  const handleDelete = async (code) => {
    if (!window.confirm("¿Seguro que deseas eliminar este item?")) return;

    try {
      await fetch(`${API_URL}/item/${code}`, { method: "DELETE" });
      fetchItems();
    } catch (err) {
      console.error("❌ Error al eliminar item:", err);
    }
  };

  // 🔹 Filtrar items
  const filteredItems = items.filter(
    (item) =>
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 bg-(--color-lighter)">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mx-5">Gestión de artículos</h2>
          <button
            onClick={() => {
              setEditingCode(null);
              setForm({ code: "", description: "", price1: "", currency: "ARS" });
              setIsModalOpen(true);
            }}
            className="bg-(--color-green) text-(--color-lightest) py-3.5 px-5 text-base font-bold border-0 rounded-xl cursor-pointer transition-all duration-500 hover:bg-(--color-green-dark)"
          >
            Agregar Item
          </button>
        </div>

        {/* Filtro de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por código o descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4 bg-(--color-lightest)"
        />

        {/* Listado de items */}
        <table className="w-full bg-(--color-lightest) shadow rounded">
          <thead>
            <tr className="bg-(--color-gray) text-(--color-lighter)">
              <th className="p-2">Código</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Moneda</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.code} className="border-t text-center">
                <td className="p-2 font-bold">{item.code}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{formatPrice(item.price1)}</td>
                <td className="p-2">{item.currency}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-(--color-yellow) text-(--color-lightest) py-3.5 px-5 text-base font-bold border-0 rounded-xl cursor-pointer transition-all duration-500 hover:bg-(--color-yellow-dark)"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.code)}
                    className="bg-(--color-red) text-(--color-lightest) py-3.5 px-5 text-base font-bold border-0 rounded-xl cursor-pointer transition-all duration-500 hover:bg-(--color-red-dark)"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {editingCode ? "Editar artículo" : "Agregar artículo"}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="code"
                placeholder="Código"
                value={form.code}
                onChange={handleChange}
                className="border p-2 rounded"
                disabled={!!editingCode}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price1"
                placeholder="Precio"
                value={form.price1}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editingCode ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewItem;
