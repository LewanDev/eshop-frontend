import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../NavBar/Navbar";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Footer from "../Footer/Footer";

const CartContent = () => {
  const { cart, clearCart, confirmCart } = useContext(Context);
  const navigate = useNavigate();

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
                {totalItems} Unidad{totalItems !== 1 ? "es" : ""}
              </span>
            </div>
            <CartElements />
            <CartTotal />
            <div className="flex flex-row justify-center gap-2.5 mt-10">
              <button onClick={() => confirmCart(navigate)} className="btn-green">
                Confirmar pedido
              </button>
              <button onClick={clearCart} className="btn-red">
                Vaciar carrito
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl text-(--color-gray)">
              Tu carrito está vacío.
            </h2>
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
