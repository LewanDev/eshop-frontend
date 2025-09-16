// src/components/ProductCard.jsx
import { useState } from "react";
import formatPrice from "../../utils/formatPrice";
import ProductDetail from "./ProductDetail";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export default function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  //const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev + 1 < product.colorVariants.length ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : product.colorVariants.length - 1
    );
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Card */}
      <>
        <div className="bg-(--color-lighter) rounded-xl shadow-md overflow-hidden flex flex-col pt-5 w-80">
          {/* Imagen con carrusel */}
          <div className="relative">
            {product.colorVariants?.length > 0 ? (
              <>
                <img
                  src={`${BASE_URL}${product.colorVariants[currentIndex].imageUrl}`}
                  alt={`${product.name} - ${product.colorVariants[currentIndex].color}`}
                  className="image-sm m-auto"
                />

                {product.colorVariants.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 text-(--color-gray-lightest) p-2 cursor-pointer transition-all duration-300 hover:text-(--color-gray)"
                    >
                      ◀
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-(--color-gray-lightest) p-2 cursor-pointer transition-all duration-300 hover:text-(--color-gray)"
                    >
                      ▶
                    </button>
                  </>
                )}
              </>
            ) : (
              <img
                src="/placeholder.jpg"
                alt="No disponible"
                className="w-full h-56 object-cover"
              />
            )}
          </div>

          {/* Info corta */}
          <div className="flex flex-col self-center items-center p-4 gap-2">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <span className="text-base font-semibold italic text-(--color-gray)">
              {product.colorVariants[currentIndex].color}
            </span>
            <span className="text-xl font-semibold text-(--color-primary-dark)">
              {formatPrice(product.price1)}
            </span>
            <button
              className="btn-primary-sm w-30"
              onClick={() => openModal(product)}
            >
              Ver
            </button>
          </div>
        </div>
      </>

      {/* Modal */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
}
