import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import ProductDetail from "./ProductDetail"; // importamos el modal

import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addProduct } = useContext(Context);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  
  return (
    <>
      {products.map((product) => (
        <div
          className="card"
          key={product.id}
          onClick={() => openModal(product)}
        >
          <img src={product.img} alt={product.name} />
          <span className="card-name">{product.name}</span>
          <span className="card-price">${product.price}</span>
          <button
            className="btn-add-product"
            onClick={(e) => {
              e.stopPropagation();
              addProduct(product);
            }}
          >
            Agregar
          </button>
        </div>
      ))}

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};
/*
  return products.map((product) => {
    return (
      <div className="card" key={product.id}>
        <img src={product.img} alt={product.name} />
        <span className="card-name">{product.name}</span>
        <span className="card-price">${product.price}</span>
        <button onClick={() => addProduct(product)}>Agregar</button>
      </div>
    );
  });
};
*/
export default Products;
