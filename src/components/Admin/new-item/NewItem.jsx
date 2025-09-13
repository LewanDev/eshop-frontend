import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import formatPrice from "../../../utils/formatPrice";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

const NewItem = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    price1: "",
    currency: "ARS",
    measure: "",
    colorVariants: [],
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
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error al traer items:", err);
      setItems([]);
    }
  };

  // 🔹 Manejo del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addColorVariant = () => {
    if (editingCode) return; // no permitir en edición

    setForm((prev) => {
      const arr = Array.isArray(prev.colorVariants)
        ? [...prev.colorVariants]
        : [];

      // si ya existe una variante y la última está vacía, no agregamos otra
      if (arr.length > 0) {
        const last = arr[arr.length - 1];
        if (!last.color || last.color.trim() === "" || !last.image) {
          alert(
            "Completa el color y la imagen antes de agregar otra variante."
          );
          return prev;
        }
      }

      return {
        ...prev,
        colorVariants: [...arr, { color: "", image: null }],
      };
    });
  };

  const removeColorVariant = (idx) => {
    setForm((prev) => ({
      ...prev,
      colorVariants: Array.isArray(prev.colorVariants)
        ? prev.colorVariants.filter((_, i) => i !== idx)
        : [],
    }));
  };

  const handleColorChange = (idx, field, value) => {
    setForm((prev) => {
      const arr = Array.isArray(prev.colorVariants)
        ? [...prev.colorVariants]
        : [];
      arr[idx] = { ...(arr[idx] || {}), [field]: value };
      return { ...prev, colorVariants: arr };
    });
  };

  // 🔹 Crear o editar item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCode) {
        // ✅ PUT actualizar (sin colores)
        await fetch(`${API_URL}/item/${editingCode}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // ✅ POST nuevo item (con colores e imágenes)
        const data = new FormData();
        data.append("code", form.code);
        data.append("name", form.name);
        data.append("description", form.description);
        data.append("price1", form.price1);
        data.append("currency", form.currency);

        // solo en creación: enviamos variantes de color
        if (form.colorVariants?.length > 0) {
          // Guardamos JSON con los colores (sin imágenes)
          const variantsJson = form.colorVariants.map((v) => ({
            color: v.color,
            imageUrl: v.imageUrl || "",
          }));
          data.append("colorVariants", JSON.stringify(variantsJson));

          // Agregamos las imágenes como archivos
          form.colorVariants.forEach((v) => {
            if (v.image) data.append("images", v.image);
          });
        }

        await fetch(`${API_URL}/newItem`, {
          method: "POST",
          body: data, // 👈 no headers porque es multipart/form-data
        });
      }

      // Reset form
      setForm({
        code: "",
        name: "",
        description: "",
        price1: "",
        currency: "ARS",
        colorVariants: [], // 👈 lo limpiamos también
      });
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
      name: item.name,
      description: item.description,
      price1: item.price1,
      currency: item.currency,
      colorVariants: Array.isArray(item.colorVariants)
        ? item.colorVariants
        : [], // <-- fallback
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
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
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
              setForm({
                code: "",
                name: "",
                description: "",
                price1: "",
                currency: "ARS",
                colorVariants: [],
              });
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
          placeholder="Buscar por código o nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4 bg-(--color-lightest)"
        />

        {/* Listado de items */}
        <table className="w-full bg-(--color-lightest) shadow rounded">
          <thead>
            <tr className="bg-(--color-gray) text-(--color-lighter)">
              <th className="p-2">Código</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Moneda</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.code} className="border-t text-center">
                  <td className="p-2 font-bold">{item.code}</td>
                  <td className="p-2">{item.name}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-(--color-gray)">
                  No hay artículos cargados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <Footer />

      {/* Modal New Item*/}
      {isModalOpen && (
        <div className="fixed inset-0 bg-(--color-transparent-o6) flex justify-center items-center">
          <div className="bg-(--color-lighter) p-6 rounded shadow-lg w-3xl">
            <h3 className="text-xl font-bold mb-4">
              {editingCode ? "Editar artículo" : "Agregar nuevo artículo"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 justify-between"
            >
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  name="code"
                  placeholder="Código"
                  value={form.code}
                  onChange={handleChange}
                  className="text-base p-3 inline-block border-2 border-solid border-(--color-light) rounded-xl box-border text-start bg-(--color-lightest)"
                  disabled={!!editingCode}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full text-base p-3 inline-block border-2 border-solid border-(--color-light) rounded-xl box-border text-start bg-(--color-lightest)"
                />
              </div>
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="w-full text-base p-3 inline-block border-2 border-solid border-(--color-light) rounded-xl box-border text-start bg-(--color-lightest)"
              />
              <div className="flex flex-row gap-2">
                <input
                  type="number"
                  name="price1"
                  placeholder="Precio"
                  value={form.price1}
                  onChange={handleChange}
                  className="text-base p-3 inline-block border-2 border-solid border-(--color-light) rounded-xl box-border text-start bg-(--color-lightest)"
                />
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="text-base py-3 px-4 inline-block border-2 border-solid border-(--color-light) rounded-xl box-border text-start bg-(--color-lightest)"
                >
                  <option value="ARS">Pesos</option>
                  <option value="USD">Dólares</option>
                </select>
                <input
                  type="text"
                  name="measure"
                  placeholder="Medidas"
                  value={form.measure}
                  onChange={handleChange}
                  className="w-full text-base p-3 inline-block border-2 border-solid border-(--color-light) rounded-xl box-border text-start bg-(--color-lightest)"
                />
              </div>
              {!editingCode && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold">Variantes de color</label>
                  {Array.isArray(form.colorVariants) &&
                    form.colorVariants.map((variant, idx) => (
                      <div key={idx} className="flex items-center gap-2 my-2">
                        <input
                          type="text"
                          placeholder="Nombre del Color"
                          value={variant.color}
                          onChange={(e) =>
                            handleColorChange(idx, "color", e.target.value)
                          }
                          className="border p-2 rounded flex-1"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleColorChange(idx, "image", e.target.files[0])
                          }
                          className="border p-2 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeColorVariant(idx)}
                          className="hover:cursor-pointer"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={addColorVariant}
                    className="w-full bg-(--color-secondary) text-(--color-lightest) py-3.5 px-5 text-base font-bold border-0 rounded-xl cursor-pointer transition-all duration-500 hover:bg-(--color-secondary-dark)"
                  >
                    ➕ Agregar nuevo color
                  </button>
                </div>
              )}
              <div className="flex flex-row gap-5 ">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-(--color-red-dark) text-(--color-lightest) py-3.5 px-5 text-base font-bold border-0 rounded-xl cursor-pointer transition-all duration-500 hover:bg-(--color-red-darker)"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full bg-(--color-green-dark) text-(--color-lightest) py-3.5 px-5 text-base font-bold border-0 rounded-xl cursor-pointer transition-all duration-500 hover:bg-(--color-green-darker)"
                >
                  {editingCode ? "Actualizar" : "Agregar"}
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
