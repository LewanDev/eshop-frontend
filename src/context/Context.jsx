import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(savedCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product) => {
    const productExists = cart.find((item) => item.cartId === product.cartId);

    if (productExists) {
      setCart(
        cart.map((item) =>
          item.cartId === product.cartId
            ? { ...item, quanty: item.quanty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quanty: 1 }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmCart = () => {
    // acá podés mandar el pedido al backend
  };

  return (
    <Context.Provider value={{ cart, setCart, addProduct, clearCart }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
