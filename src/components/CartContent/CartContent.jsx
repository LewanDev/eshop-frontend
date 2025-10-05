// import { useContext } from "react";
// import { Context } from "../../context/Context";

// import Navbar from "../NavBar/Navbar";
// import CartElements from "./CartElements";
// import CartTotal from "./CartTotal";
// import Footer from "../Footer/Footer";

// import "./CartContent.css";
// import { Link } from "react-router-dom";

// const CartContent = () => {
//   const { cart } = useContext(Context);
//   // Calcula la suma total de unidades
//   const totalItems = cart.reduce((acc, item) => acc + item.quanty, 0);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex flex-1 justify-center items-center p-5">
//         {cart.length > 0 ? (
//           <div className="my-6 mx-1">
//             <div className="flex flex-row justify-around items-center">
//               <span className="text-3xl font-bold">Carrito de compras</span>
//               <span className="text-xl italic">
//                 {totalItems} Artículo{totalItems !== 1 ? "s" : ""}
//               </span>
//             </div>
//             <CartElements />
//             <CartTotal />
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-2xl text-(--color-gray) text-center">
//               Tu carrito está vacío.{" "}
//             </h2>
//             <Link to="/products">
//               <a className="text-2xl text-[var(--color-primary)] text-center no-underline transition-all duration-500 hover:text-[var(--color-secondary)]">
//                 ¡Descubre nuestros productos!
//               </a>
//             </Link>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CartContent;

import { useContext } from "react";
import { Context } from "../../context/Context";

import Navbar from "../NavBar/Navbar";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const CartContent = () => {
  const { cart } = useContext(Context);

  // Total de unidades en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quanty, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 justify-center items-center p-5">
        {cart.length > 0 ? (
          <div className="my-6 mx-1 w-full max-w-5xl">
            <div className="flex flex-row justify-between items-center mb-6">
              <span className="text-3xl font-bold">Carrito de compras</span>
              <span className="text-xl italic">
                {totalItems} Artículo{totalItems !== 1 ? "s" : ""}
              </span>
            </div>
            <CartElements />
            <CartTotal />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl text-(--color-gray)">Tu carrito está vacío.</h2>
            <Link to="/products">
              <span className="text-2xl text-[var(--color-primary)] no-underline hover:text-[var(--color-secondary)] transition-all duration-500">
                ¡Descubre nuestros productos!
              </span>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartContent;
