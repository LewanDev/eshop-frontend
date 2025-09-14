import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import formatPrice from "../../utils/formatPrice";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const ProductDetail = ({ product, onClose }) => {
  const { addProduct } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleColorChange = (e) => {
    setCurrentIndex(parseInt(e.target.value, 10));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const selectedVariant = product.colorVariants[currentIndex];

    // Creamos un objeto con el producto + variante seleccionada
    const productWithVariant = {
      ...product,
      cartId: `${product._id || product.id}-${selectedVariant.color}`, // identificador único en carrito
      selectedColor: selectedVariant.color,
      selectedImage: `${BASE_URL}${selectedVariant.imageUrl}`,
      quanty: 1,
    };

    addProduct(productWithVariant);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-(--color-transparent-o6) flex justify-center items-center z-10"
      onClick={onClose}
    >
      <div
        className="bg-(--color-lighter) py-6 px-8 rounded-xl w-full max-w-3xl flex flex-row relative gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2.5 right-4 text-xl cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Imagen principal */}
        <img
          src={`${BASE_URL}${product.colorVariants[currentIndex].imageUrl}`}
          alt={`${product.name} - ${product.colorVariants[currentIndex].color}`}
          className="image-sm-1"
        />

        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold ">{product.name}</span>
          <span className="text-base italic ">{product.description}</span>
          <div className="flex flex-row w-full justify-between">
            <span className="text-lg font-bold text-(--color-secondary)">
              {formatPrice(product.price1)}
            </span>
            <span className="text-base italic py-1.5">
              Medidas: {product.measure}
            </span>
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <span className="text-base italic">Artículo: {product.code}</span>
            </div>
            <div className="flex flex-row items-center gap-3.5">
              <span className="text-base">Color: </span>
              <select
                className="select-light "
                value={currentIndex}
                onChange={handleColorChange}
              >
                {product.colorVariants.map((variant, index) => (
                  <option key={index} value={index}>
                    {variant.color}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Select para variantes de color */}
          <button className="btn-secondary-2" onClick={handleAddToCart}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
