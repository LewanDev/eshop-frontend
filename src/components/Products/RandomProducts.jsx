// src/components/RandomProducts.jsx
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// const API_URL =
//   import.meta.env.MODE === "production"
//     ? "https://eshop-backend-y820.onrender.com/api/items"
//     : "http://localhost:5000/api/items";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export default function RandomProducts() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="flex flex-col items-center m-10">
      <span className="text-5xl font-bold pb-10 text-(--color-secondary)">Tal vez te interese</span>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6"> */}
      <div className="flex flex-row gap-10 justify-between">
        {products
          .sort(() => Math.random() - 0.5) // Mezcla el array aleatoriamente
          .slice(0, 3) // Toma los primeros 3 elementos
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
