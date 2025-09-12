import { useContext } from "react";
import { Context } from "../../context/Context";
import formatPrice from "../../utils/formatPrice";

const ProductDetail = ({ product, onClose }) => {
  const { addProduct } = useContext(Context);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-(--color-transparent-o6) flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-(--color-lighter) p-5 rounded-xl w-full max-w-3xl flex flex-row relative"
        onClick={(e) => e.stopPropagation()} // evita cerrar si clickeas adentro
      >
        <button
          className="absolute top-2.5 right-4 text-xl cursor-pointer transition-transform duration-200 hover:scale-110"
          onClick={onClose}
        >
          ✖
        </button>
        <img src={product.img} alt={product.name} className="max-w-3xs" />
        <div className="py-0 px-2.5 flex flex-col items-start">
          <span className="text-2xl font-bold py-2.5 px-0">{product.name}</span>
          <span className="text-base italic py-2.5 px-0">{product.desc}</span>
          <span className="text-lg font-bold text-(--color-secondary)">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm italic py-1.5 px-0">
            Medidas: {product.measures}
          </span>
          <span className="text-sm italic py-1.5 px-0">
            Artículo: {product.art}
          </span>

          <button
            className="border-2 border-solid border-transparent outline-0 p-2.5 self-center text-(--color-lightest) bg-(--color-secondary) text-center font-bold cursor-pointer w-full max-w-xs text-base rounded-xl mt-auto transition-all duration-500 hover:border-2 hover:border-solid hover:border-(--color-secondary) hover:rounded-xl hover:bg-(--color-lighter) hover:text-(--color-secondary)"
            onClick={(e) => {
              e.stopPropagation(); // evita abrir modal al clickear botón
              addProduct(product);
            }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
