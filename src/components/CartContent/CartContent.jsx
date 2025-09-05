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
    <div className="cart-page">
      <Navbar />
      <main className="cart-main">
        {cart.length > 0 ? (
          <div className="cart-content">
            <CartTitle />
            <CartElements />
            <CartTotal />
          </div>
        ) : (
          <div>
            <h2 className="cart-message-empty">Tu carrito está vacío. </h2>
            <Link to="/products">
              <a className="cart-message-products">¡Descubre nuestros productos!</a>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartContent;
