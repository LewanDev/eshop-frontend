import { useState } from "react";
import formatPrice from "../../utils/formatPrice";
import ProductDetail from "./ProductDetail";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// ProductCard.jsx (parte relevante)
const normalizeImages = (product) => {
  const imgs = [];

  // Normalizar imágenes generales (soportar string o objeto)
  if (Array.isArray(product.images)) {
    product.images.forEach((img) => {
      if (!img) return;
      if (typeof img === "string") imgs.push({ url: img, color: null });
      else if (img.imageUrl) imgs.push({ url: img.imageUrl, color: null });
    });
  }

  // Normalizar variantes
  if (Array.isArray(product.colorVariants)) {
    product.colorVariants.forEach((variant) => {
      if (!variant) return;
      // variante.imageUrl puede ser undefined; saltealo
      if (variant.imageUrl)
        imgs.push({ url: variant.imageUrl, color: variant.color || null });
    });
  }

  // Deduplicar por url (manteniendo el primer color encontrado)
  const seen = new Map();
  imgs.forEach(({ url, color }) => {
    if (!url) return;
    if (!seen.has(url)) {
      seen.set(url, { url, color });
    } else {
      // si ya existe y el existente no tiene color pero éste sí, actualizamos color
      const existing = seen.get(url);
      if (!existing.color && color) seen.set(url, { url, color });
    }
  });

  return Array.from(seen.values());
};

export default function ProductCard({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const allImages = normalizeImages(product);

  /*
  // 🔥 Normalización y eliminación de duplicados reales
  const normalizeUrl = (u) => u?.trim().toLowerCase();

  // Unificamos imágenes eliminando repetidos:
  const baseImages =
    product.images?.filter((img) => img && img.length > 0) || [];

  const variantImages =
    product.colorVariants?.map((variant) => ({
      url: variant.imageUrl,
      color: variant.color,
    })) || [];

  // Evitar que una imagen de variante duplique una imagen base
  const filteredVariants = variantImages.filter(
    (v) => !baseImages.some((img) => normalizeUrl(img) === normalizeUrl(v.url))
  );

  // 👇 unificamos imágenes generales + variantes
  const allImages = [
    ...(product.images?.map((img) => ({ url: img, color: null })) || []),
    ...(product.colorVariants?.map((variant) => ({
      url: variant.imageUrl,
      color: variant.color,
    })) || []),
  ];

  // const allImages = [
  //   ...baseImages.map((img) => ({ url: img, color: null })),
  //   ...filteredVariants,
  // ];
  */

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1 < allImages.length ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : allImages.length - 1
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
      <div
        className="rounded-xl shadow-md overflow-hidden flex flex-col pt-5 w-80 cursor-pointer"
        onClick={() => openModal(product)}
      >
        <div className="relative">
          {allImages.length > 0 ? (
            <>
              <img
                src={`${BASE_URL}${allImages[currentIndex].url}`}
                alt={`${product.name} - ${
                  allImages[currentIndex].color || "General"
                }`}
                className="image-sm m-auto"
              />

              {allImages.length > 1 && (
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
            {allImages[currentIndex]?.color ?? "-"}
          </span>

          {/* <span className="text-base font-semibold italic text-(--color-gray)">
            {allImages[currentIndex]?.color
              ? allImages[currentIndex].color
              : ""}
          </span> */}

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

      {/* Modal */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
}
