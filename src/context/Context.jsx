import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(savedCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product) => {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...product, quanty: productExists.quanty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmCart = () => {
    
  }

  return (
    <>
      <Context.Provider value={{ cart, setCart, addProduct, clearCart }}>
        {children}
      </Context.Provider>
    </>
  );
};

export default ContextProvider;
