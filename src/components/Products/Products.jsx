import { useState, useEffect } from "react";
import { Context } from "../../context/Context";
import ProductDetail from "./ProductDetail";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Title from "../Misc/Title";
import ProductCard from "./ProductCard";

import "./Products.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // 🔹 estado para búsqueda

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/items`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Normalizamos la búsqueda
  const filteredProducts = products.filter((product) => {
    const searchLower = search.toLowerCase();

    return (
      product.description?.toLowerCase().includes(searchLower) ||
      product.code?.toLowerCase().includes(searchLower) ||
      product.heading?.description?.toLowerCase().includes(searchLower) || // si tenés relación con heading
      product.subheading?.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Navbar />
      <Title>Nuestros productos</Title>
      {/* 🔹 Input de búsqueda */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por descripción, código o rubro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 sm:w-1/2 input-light"
        />
      </div>
      {/* 🔹 Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-(--color-gray)">
            No se encontraron productos
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Products;
