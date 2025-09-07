import { useContext } from "react";
import { Context } from "../../context/Context";

const CartItemCounter = ({ product }) => {
  const { cart, setCart, addProduct } = useContext(Context);
  const decrease = () => {
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists.quanty !== 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...product, quanty: productExists.quanty - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4 items-center">
        <p className="text-sm cursor-pointer" onClick={decrease}>
          ➖
        </p>
        <p className="text-2xl font-bold">{product.quanty}</p>
        <p className="text-sm cursor-pointer" onClick={() => addProduct(product)}>
          ➕
        </p>
      </div>
    </div>
  );
};

export default CartItemCounter;
