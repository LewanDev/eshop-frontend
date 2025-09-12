import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import ProductDetail from "./ProductDetail";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Title from "../Misc/Title";
import formatPrice from "../../utils/formatPrice";

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
      <Navbar />
      <Title>Nuestros productos</Title>

      <div className="flex justify-around flex-wrap">
        {products.map((product) => (
          <div
            className="flex flex-col justify-between max-w-lg m-5 rounded-xl bg-(--color-lighter) p-2.5 items-center"
            key={product.id}
            onClick={() => openModal(product)}
          >
            <img src={product.img} alt={product.name} />
            <span className="text-2xl font-bold py-2.5 px-0">{product.name}</span>
            <span className="text-xl font-bold pb-2.5 text-(--color-secondary-dark)">{formatPrice(product.price)}</span>
            <button
              className="border-2 border-solid border-transparent outline-0 p-2.5 self-center text-(--color-lightest) bg-(--color-secondary) text-center font-bold cursor-pointer w-full max-w-xs text-base rounded-xl mt-auto transition-all duration-500 hover:border-2 hover:border-solid hover:border-(--color-secondary) hover:rounded-xl hover:bg-(--color-lighter) hover:text-(--color-secondary)"
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
      </div>

      <Footer />
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
