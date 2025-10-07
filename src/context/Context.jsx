import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const ContextProvider = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const savedUser = JSON.parse(localStorage.getItem("user")) || null;
  const [cart, setCart] = useState(savedCart);
  const [user, setUser] = useState(savedUser);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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

  const clearCart = () => setCart([]);

  const confirmCart = async (navigate) => {
    // Si el usuario no está logueado, redirigimos
    if (!user) {
      alert("Debes iniciar sesión para confirmar tu pedido.");
      navigate("/login");
      return;
    }

    // Si el carrito está vacío
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const pedido = {
      fecha: new Date().toLocaleString(),
      usuario: {
        nombre: user.name,
        email: user.email,
        telefono: user.phone || "No especificado",
      },
      items: cart.map((item) => ({
        id: item.id || item._id,
        nombre: item.name,
        color: item.selectedColor,
        cantidad: item.quanty,
        precio: item.price1,
      })),
    };

    try {
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) throw new Error("Error al enviar el pedido");

      clearCart();
      alert("Pedido confirmado. Recibirás un correo con los detalles.");
    } catch (err) {
      console.error("❌ Error al confirmar pedido:", err);
      alert("Hubo un error al enviar tu pedido. Intenta nuevamente.");
    }
  };

  return (
    <Context.Provider
      value={{
        cart,
        setCart,
        addProduct,
        clearCart,
        confirmCart,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

// import { createContext, useEffect, useState } from "react";

// export const Context = createContext();

// const ContextProvider = ({ children }) => {
//   const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   const [cart, setCart] = useState(savedCart);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addProduct = (product) => {
//     const productExists = cart.find((item) => item.cartId === product.cartId);

//     if (productExists) {
//       setCart(
//         cart.map((item) =>
//           item.cartId === product.cartId
//             ? { ...item, quanty: item.quanty + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quanty: 1 }]);
//     }
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const confirmCart = () => {
//     // acá podés mandar el pedido al backend
//   };

//   return (
//     <Context.Provider value={{ cart, setCart, addProduct, clearCart }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;
