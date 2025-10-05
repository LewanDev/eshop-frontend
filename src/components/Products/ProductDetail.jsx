// import { useContext, useState, useMemo } from "react";
// import { Context } from "../../context/Context";
// import formatPrice from "../../utils/formatPrice";
// import ItemCounter from "./ItemCounter";

// import "./Products.css";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

// const ProductDetail = ({ product, onClose }) => {
//   const { addProduct } = useContext(Context);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [zoom, setZoom] = useState(false);

//   const handleColorChange = (e) => {
//     setCurrentIndex(parseInt(e.target.value, 10));
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     const selectedVariant = product.colorVariants[currentIndex];

//     // Creamos un objeto con el producto + variante seleccionada
//     const productWithVariant = {
//       ...product,
//       cartId: `${product._id || product.id}-${selectedVariant.color}`, // identificador único en carrito
//       selectedColor: selectedVariant.color,
//       selectedImage: `${BASE_URL}${selectedVariant.imageUrl}`,
//       quanty: 1,
//     };

//     addProduct(productWithVariant);
//   };

//   // 🔍 Modal + Zoom handlers
//   const handleImageClick = (e) => {
//     e.stopPropagation();
//     document.body.classList.add("modal-open"); // 🔒 bloquea scroll del body
//     setShowModal(true);
//   };

//   const handleModalClick = (e) => {
//     if (e.target.classList.contains("modal-overlay")) {
//       setShowModal(false);
//       setZoom(false);
//       document.body.classList.remove("modal-open"); // 🔓 desbloquea scroll
//     }
//   };

//   const toggleZoom = (e) => {
//     e.stopPropagation();
//     setZoom((prev) => !prev);
//   };

//   return (
//     <div
//       className="fixed top-0 left-0 w-full h-full bg-(--color-transparent-o6) flex justify-center items-center z-10"
//       onClick={onClose}
//     >
//       <div
//         className="bg-(--color-lighter) py-6 px-8 rounded-xl w-full max-w-3xl flex flex-row relative gap-5"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-2.5 right-4 text-xl cursor-pointer transition-transform duration-200 hover:scale-110"
//           onClick={onClose}
//         >
//           ✖
//         </button>

//         {/* Imagen principal */}
//         <img
//           src={`${BASE_URL}${product.colorVariants[currentIndex].imageUrl}`}
//           alt={`${product.name} - ${product.colorVariants[currentIndex].color}`}
//           className="image-md-1 cursor-zoom-in"
//           onClick={handleImageClick}
//         />
//         {/* Modal de imagen */}
//         {showModal && (
//           <div
//             className="modal-overlay fixed inset-0 bg-(--color-transparent-o6) bg-opacity-80 flex justify-center items-center z-50 cursor-zoom-in overflow-hidden"
//             onClick={handleModalClick}
//           >
//             <div className="modal-content max-h-screen flex justify-center items-center">
//               <img
//                 src={`${BASE_URL}${product.colorVariants[currentIndex].imageUrl}`}
//                 alt={product.name}
//                 className={`modal-image max-h-[90vh] w-auto rounded-lg transition-transform duration-300 ${
//                   zoom ? "scale-[1.8] cursor-zoom-out" : "scale-100"
//                 }`}
//                 onClick={toggleZoom}
//               />
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col gap-4">
//           <span className="text-2xl font-bold ">{product.name}</span>
//           <span className="text-base italic ">{product.description}</span>
//           <div className="flex flex-row w-full justify-between">
//             <span className="text-lg font-bold text-(--color-secondary)">
//               {formatPrice(product.price1)}
//             </span>
//             <span className="text-base italic py-1.5">
//               Medidas: {product.measure}
//             </span>
//           </div>
//           <div className="flex flex-row items-center justify-between w-full">
//             <div>
//               <span className="text-base italic">Artículo: {product.code}</span>
//             </div>
//           </div>

//           {/* 
//           <div className="flex flex-row justify-center ">
//             <button className="btn-secondary-2" onClick={handleAddToCart}>
//               Agregar
//             </button>
//           </div> */}

//           {/* Selecciona el producto actual con color elegido */}
//           {(() => {
//             const { cart } = useContext(Context);
//             const selectedVariant = product.colorVariants[currentIndex];

//             // ID único del producto con su color
//             const cartId = `${product._id || product.id}-${
//               selectedVariant.color
//             }`;

//             // Buscamos si ya existe en el carrito
//             const existingItem = cart.find((item) => item.cartId === cartId);

//             // Construimos el producto con su cantidad actual
//             const selectedVariantProduct = useMemo(
//               () => ({
//                 ...product,
//                 cartId,
//                 selectedColor: selectedVariant.color,
//                 selectedImage: `${BASE_URL}${selectedVariant.imageUrl}`,
//                 quanty: existingItem ? existingItem.quanty : 1,
//               }),
//               [product, selectedVariant, existingItem]
//             );

//             return (
//               <div className="flex flex-row justify-center items-center gap-5 mt-3">
//                 <div className="flex flex-row items-center gap-3.5">
//                   <span className="text-base">Color: </span>
//                   <select
//                     className="select-light-sm"
//                     value={currentIndex}
//                     onChange={handleColorChange}
//                   >
//                     {product.colorVariants.map((variant, index) => (
//                       <option key={index} value={index}>
//                         {variant.color}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* 🧩 Bloqueamos la propagación del click */}
//                 <div onClick={(e) => e.stopPropagation()}>
//                   <ItemCounter
//                     initial={existingItem ? existingItem.quanty : 1}
//                     onChange={(newValue) => {
//                       const updatedProduct = {
//                         ...selectedVariantProduct,
//                         quanty: newValue,
//                       };
//                       addProduct(updatedProduct);
//                     }}
//                   />
//                 </div>

//                 <button
//                   className="btn-secondary-2"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleAddToCart(e);
//                   }}
//                 >
//                   Agregar
//                 </button>
//               </div>
//             );
//           })()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
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

  const handleColorChange = (e) => setCurrentIndex(parseInt(e.target.value, 10));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addProduct(selectedVariantProduct);
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
    // se cierra solo si el click fue directamente en el overlay, no en hijos
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
              onClick={(e) => e.stopPropagation()} // 🔒 bloquea propagación
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

            {/* Contador (sin cerrar modal) */}
            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()} // 🚫 previene cierre
            >
              <ItemCounter
                initial={existingItem ? existingItem.quanty : 1}
                onChange={(newValue) =>
                  addProduct({ ...selectedVariantProduct, quanty: newValue })
                }
              />
            </div>

            {/* Botón agregar */}
            <button className="btn-secondary-2" onClick={handleAddToCart}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
