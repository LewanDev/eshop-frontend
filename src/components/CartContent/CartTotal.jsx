import { useContext } from "react";
import { Context } from "../../context/Context";

const CartTotal = () => {
  const { cart, clearCart, confirmCart } = useContext(Context);

  const total = cart.reduce(
    (acc, element) => acc + element.price * element.quanty,
    0
  );
  return (
    <div className="cart-total">
      <span>Total a pagar: ${total}</span>
      <button onClick={clearCart} className="btn-cart-confirm">Hacer pedido</button>
      <button onClick={confirmCart} className="btn-cart-clear">Vaciar carrito</button>
    </div>
  );
};

export default CartTotal;
