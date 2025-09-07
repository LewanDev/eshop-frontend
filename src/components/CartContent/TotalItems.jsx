import { useContext } from "react";
import { Context } from "../../context/Context";

const TotalItems = () => {
  const { cart } = useContext(Context);
  const itemsQuanty = cart.reduce((acc, el) => acc + el.quanty, 0);
  return <span className="bg-(--color-red) text-(--color-lighter) rounded-full text-xs py-0.5 px-1 absolute">{itemsQuanty}</span>;
};

export default TotalItems;
