import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
    if (!user) {
      alert("Debes iniciar sesión para confirmar tu pedido.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 💥 ESTRUCTURA EXACTA QUE ESPERA EL BACKEND
    const pedido = {
      cliente: user.client?._id,
      items: cart.map((item) => ({
        itemId: item._id || item.id,
        color: item.selectedColor,
        cantidad: item.quanty,
        precio: item.price1,
      })),
    };
    console.log("Pedido enviado:", pedido);

    try {
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) throw new Error("Error al enviar el pedido");

      clearCart();
      alert("Pedido confirmado.");
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
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const ContextProvider = ({ children }) => {
//   const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   const savedUser = JSON.parse(localStorage.getItem("user")) || null;
//   const [cart, setCart] = useState(savedCart);
//   const [user, setUser] = useState(savedUser);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

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

//   const clearCart = () => setCart([]);

//   const confirmCart = async (navigate) => {
//     // Si el usuario no está logueado, redirigimos
//     if (!user) {
//       alert("Debes iniciar sesión para confirmar tu pedido.");
//       navigate("/login");
//       return;
//     }

//     // Si el carrito está vacío
//     if (cart.length === 0) {
//       alert("Tu carrito está vacío.");
//       return;
//     }

//     const pedido = {
//       cliente: user.client?._id, // 👈 este es el campo que Mongoose pide
//       items: cart.map((item) => ({
//         item: item._id || item.id,
//         nombre: item.name,
//         color: item.selectedColor,
//         cantidad: item.quanty,
//         precio: item.price1,
//       })),
//     };

//     try {
//       const res = await fetch(`${API_URL}/order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(pedido),
//       });

//       if (!res.ok) throw new Error("Error al enviar el pedido");

//       clearCart();
//       alert("Pedido confirmado.");
//     } catch (err) {
//       console.error("❌ Error al confirmar pedido:", err);
//       alert("Hubo un error al enviar tu pedido. Intenta nuevamente.");
//     }
//   };

//   return (
//     <Context.Provider
//       value={{
//         cart,
//         setCart,
//         addProduct,
//         clearCart,
//         confirmCart,
//         user,
//         setUser,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;
