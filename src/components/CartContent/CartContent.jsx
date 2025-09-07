import { useContext } from "react";
import { Context } from "../../context/Context";

import Navbar from "../NavBar/Navbar";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import Footer from "../Footer/Footer";

import "./CartContent.css";
import CartTitle from "./CartTitle";
import { Link } from "react-router-dom";

const CartContent = () => {
  const { cart } = useContext(Context);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 justify-center items-center p-5">
        {cart.length > 0 ? (
          <div className="my-6 mx-1">
            <CartTitle />
            <CartElements />
            <CartTotal />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-(--color-gray) text-center">
              Tu carrito está vacío.{" "}
            </h2>
            <Link to="/products">
              <a className="text-2xl text-[var(--color-primary)] text-center no-underline transition-all duration-500 hover:text-[var(--color-secondary)]">
                ¡Descubre nuestros productos!
              </a>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartContent;
