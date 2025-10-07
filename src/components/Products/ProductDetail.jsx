import { useContext, useState, useMemo } from "react";
import { Context } from "../../context/Context";
import formatPrice from "../../utils/formatPrice";
import ItemCounter from "./ItemCounter";
import "./Products.css";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const ProductDetail = ({ product, onClose }) => {
  const { addProduct, cart } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  // 👉 selecciona la variante actual
  const selectedVariant = product.colorVariants[currentIndex];
  const cartId = `${product._id || product.id}-${selectedVariant.color}`;
  const existingItem = cart.find((item) => item.cartId === cartId);

  const selectedVariantProduct = useMemo(
    () => ({
      ...product,
      cartId,
      selectedColor: selectedVariant.color,
      selectedImage: `${BASE_URL}${selectedVariant.imageUrl}`,
      quanty: existingItem ? existingItem.quanty : 1,
    }),
    [product, selectedVariant, existingItem]
  );

  const handleColorChange = (e) =>
    setCurrentIndex(parseInt(e.target.value, 10));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (disableBtn) return;

    addProduct(selectedVariantProduct);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);

    setDisableBtn(true);
    setTimeout(() => setDisableBtn(false), 1000);
  };

  // 🔍 Imagen ampliada
  const openModal = (e) => {
    e.stopPropagation();
    document.body.classList.add("modal-open");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setZoom(false);
    document.body.classList.remove("modal-open");
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) closeModal();
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setZoom((prev) => !prev);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-(--color-transparent-o6) flex justify-center items-center z-10"
      onClick={onClose}
    >
      {/* Notificación tipo toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-(--color-secondary) text-white px-5 py-3 rounded-lg shadow-lg transition-all duration-300 z-50">
          Producto agregado al carrito ✔
        </div>
      )}

      <div
        className="bg-(--color-lighter) py-6 px-8 rounded-xl w-full max-w-3xl flex flex-row relative gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          className="absolute top-2.5 right-4 text-xl cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Imagen principal */}
        <img
          src={`${BASE_URL}${selectedVariant.imageUrl}`}
          alt={`${product.name} - ${selectedVariant.color}`}
          className="image-md-1 cursor-zoom-in"
          onClick={openModal}
        />

        {/* Modal */}
        {showModal && (
          <div
            className="modal-overlay fixed inset-0 bg-(--color-transparent-o6) bg-opacity-80 flex justify-center items-center z-50 overflow-hidden"
            onClick={handleOverlayClick}
          >
            <div
              className="max-h-screen flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${BASE_URL}${selectedVariant.imageUrl}`}
                alt={product.name}
                className={`max-h-[90vh] w-auto rounded-lg transition-transform duration-300 ${
                  zoom ? "scale-[1.8] cursor-zoom-out" : "scale-100 cursor-zoom-in"
                }`}
                onClick={toggleZoom}
              />
            </div>
          </div>
        )}

        {/* Info producto */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">{product.name}</span>
          <span className="text-base italic">{product.description}</span>

          <div className="flex flex-row w-full justify-between">
            <span className="text-lg font-bold text-(--color-secondary)">
              {formatPrice(product.price1)}
            </span>
            <span className="text-base italic py-1.5">
              Medidas: {product.measure}
            </span>
          </div>

          <span className="text-base italic">Artículo: {product.code}</span>

          <div className="flex flex-row justify-center items-center gap-5 mt-3">
            {/* Color */}
            <div className="flex flex-row items-center gap-3.5">
              <span className="text-base">Color: </span>
              <select
                className="select-light-sm"
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

            {/* Contador */}
            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ItemCounter
                initial={existingItem ? existingItem.quanty : 1}
                onChange={(newValue) =>
                  addProduct({ ...selectedVariantProduct, quanty: newValue })
                }
              />
            </div>

            {/* Botón agregar */}
            <button
              className="btn-secondary-2"
              onClick={handleAddToCart}
              disabled={disableBtn}
            >
              {disableBtn ? "..." : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
