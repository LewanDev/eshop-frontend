import { useContext } from "react";
import { Context } from "../../context/Context";

const ProductDetail = ({ product, onClose }) => {
  const { addProduct } = useContext(Context);
  return (
    <div className="modal-prod-detail" onClick={onClose}>
      <div
        className="modal-content-prod-detail"
        onClick={(e) => e.stopPropagation()} // evita cerrar si clickeas adentro
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <img src={product.img} alt={product.name} />
        <div className="modal-desc-prod-detail">
          <span className="modal-name">{product.name}</span>
          <span className="modal-desc">{product.desc}</span>
          <span className="modal-price">${product.price}</span>
          <span className="modal-measures">Medidas: {product.measures}</span>
          <span className="modal-art">Artículo: {product.art}</span>

          <button
            className="btn-add-product"
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
