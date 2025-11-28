import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/Navbar";
import Footer from "../../Footer/Footer";
import formatPrice from "../../../utils/formatPrice";
import BackButton from "../../Misc/BackButton";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
    images: [],
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

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
  };

  const removeImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  // 🔹 Crear o editar item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCode) {
        // ✅ PUT actualizar
        await fetch(`${API_URL}/item/${editingCode}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        const data = new FormData();
        data.append("code", form.code);
        data.append("name", form.name);
        data.append("description", form.description);
        data.append("price1", form.price1);
        data.append("currency", form.currency);
        data.append("measure", form.measure);

        // variantes de color
        if (form.colorVariants?.length > 0) {
          const variantsJson = form.colorVariants.map((v) => ({
            color: v.color,
            imageUrl: v.imageUrl || "",
          }));
          data.append("colorVariants", JSON.stringify(variantsJson));
          form.colorVariants.forEach((v) => {
            if (v.image) data.append("images", v.image);
          });
        }

        // imágenes generales
        if (form.images?.length > 0) {
          form.images.forEach((img) => {
            data.append("images", img); // 👈 mismas "images" que recibe multer
          });
        }

        await fetch(`${API_URL}/newItem`, {
          method: "POST",
          body: data,
        });
      }

      // reset
      setForm({
        code: "",
        name: "",
        description: "",
        price1: "",
        currency: "ARS",
        measure: "",
        colorVariants: [],
        images: [], // reset imágenes
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
      measure: item.measure,
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
          <BackButton />
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
                measure: "",
                colorVariants: [],
              });
              setIsModalOpen(true);
            }}
            className="btn-green"
          >
            Agregar
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
            <tr className="bg-(--color-gray) text-(--color-lighter) text-lg">
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
                <tr key={item.code} className="border-t text-center text-lg">
                  <td className="p-2 font-bold">{item.code}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{formatPrice(item.price1)}</td>
                  <td className="p-2">{item.currency}</td>

                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(item)}
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
                      onClick={() => handleDelete(item.code)}
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
                  colSpan="5"
                  className="text-center py-4 text-(--color-gray)"
                >
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
                  className="input-light"
                  disabled={!!editingCode}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full input-light"
                />
              </div>
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="w-full input-light"
              />
              <div className="flex flex-row gap-2">
                <input
                  type="number"
                  name="price1"
                  placeholder="Precio"
                  value={form.price1}
                  onChange={handleChange}
                  className="input-light"
                />
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="input-light"
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
                  className="w-full input-light"
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
                    className="w-full btn-secondary"
                  >
                    ➕ Agregar nuevo color
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="font-bold">Imágenes del artículo</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="border p-2 rounded"
                />

                {/* Previsualización */}
                {form.images?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`preview-${idx}`}
                          className="w-full h-32 object-cover rounded shadow"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-5 ">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full btn-red"
                >
                  Cancelar
                </button>
                <button type="submit" className="w-full btn-green">
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
