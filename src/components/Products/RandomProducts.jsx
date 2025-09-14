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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

// function ProductCard({ product }) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextImage = () => {
//     setCurrentIndex((prev) =>
//       prev + 1 < product.colorVariants.length ? prev + 1 : 0
//     );
//   };

//   const prevImage = () => {
//     setCurrentIndex((prev) =>
//       prev - 1 >= 0 ? prev - 1 : product.colorVariants.length - 1
//     );
//   };

//   return (
//     <div className="bg-(--color-lightest) rounded-xl shadow-md overflow-hidden flex flex-col">
//       {/* Imagen con carrusel */}
//       <div className="relative">
//         {product.colorVariants?.length > 0 ? (
//           <>
//             <img
//               src={`${BASE_URL}${product.colorVariants[currentIndex].imageUrl}`}
//               alt={`${product.name} - ${product.colorVariants[currentIndex].color}`}
//               className="w-full h-56 object-contain"
//             />

//             {product.colorVariants.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-(--color-transparent-o4) text-(--color-lightest) rounded-full p-2"
//                 >
//                   ‹ 
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-(--color-transparent-o4) text-(--color-lightest) rounded-full p-2"
//                 >
//                   ›
//                 </button>
//               </>
//             )}
//           </>
//         ) : (
//           <img
//             src="/placeholder.png"
//             alt="No disponible"
//             className="w-full h-56 object-cover"
//           />
//         )}
//       </div>

//       {/* Info del producto */}
//       <div className="p-4 flex flex-col flex-1">
//         <h3 className="text-lg font-bold">{product.name}</h3>
//         <p className="text-sm text-(--color-gray)">{product.desc}</p>
//         <span className="mt-2 text-xl font-semibold text-(--color-secondary)">
//           {formatPrice(product.price1)}
//         </span>
//       </div>
//     </div>
//   );
// }
