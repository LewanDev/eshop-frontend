import { useContext } from "react";
import { Context } from "../../context/Context";

const CartTotal = () => {
  const { cart, clearCart, confirmCart } = useContext(Context);

  const total = cart.reduce(
    (acc, element) => acc + element.price * element.quanty,
    0
  );
  const formatPrice = (price, locale = "es-AR", currency = "ARS") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0, // Adjust if you need decimals
    }).format(price);
  };
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-2xl font-bold">Total a pagar: {formatPrice(total)}</span>
      <div className="text-center text-xl flex flex-row items-center justify-center gap-2.5">
        <button
          onClick={clearCart}
          className="border-0 outline-0 text-(--color-lighter) py-2.5 px-5 bg-(--color-green-dark) cursor-pointer text-lg rounded-xl transition-all duration-500 hover:bg-(--color-green-darker)"
        >
          Confirmar pedido
        </button>
        <button
          onClick={confirmCart}
          className="border-0 outline-0 text-(--color-lighter) py-2.5 px-5 bg-(--color-red) cursor-pointer text-lg rounded-xl transition-all duration-500 hover:bg-(--color-red-dark)"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
