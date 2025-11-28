import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function RandomProducts() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/items`);
        const data = await res.json();
        setProducts(data);

        // 🔹 Seleccionamos 3 aleatorios solo una vez
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setRandomProducts(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center m-10">
      <span className="txt-primary-xl">
        Tal vez te interese
      </span>
      <div className="flex flex-row gap-10 justify-between">
        {randomProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
