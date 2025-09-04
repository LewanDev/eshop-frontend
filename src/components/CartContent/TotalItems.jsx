import { useContext } from "react";
import { Context } from "../../context/Context";

const TotalItems = () => {
  const { cart } = useContext(Context);
  const itemsQuanty = cart.reduce((acc, el) => acc + el.quanty, 0);
  return <span className="cart-items-total">{itemsQuanty}</span>;
};

export default TotalItems;
