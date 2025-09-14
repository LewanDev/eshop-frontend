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

  // Data hardcodeada
  /*
  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
*/
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
    <>
      <Navbar />
      <Title>Nuestros productos</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
};
export default Products;
