import { useContext } from "react";
import { Context } from "../../context/Context";

const CartTotal = () => {
  const { cart} = useContext(Context);

  const total = cart.reduce(
    (acc, element) => acc + element.price1 * element.quanty,
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
    <div className="flex flex-col items-center gap-5">
      <span className="text-2xl font-bold">Total a pagar: {formatPrice(total)}</span>
      
    </div>
  );
};

export default CartTotal;
