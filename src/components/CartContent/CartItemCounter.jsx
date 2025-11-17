import { useContext } from "react";
import { Context } from "../../context/Context";

const CartItemCounter = ({ product }) => {
  const { cart, setCart, addProduct } = useContext(Context);

  const decrease = () => {
    //const productExists = cart.find((item) => item._id === product._id);
    const productExists = cart.find((item) => item.cartId === product.cartId);

    if (productExists && (productExists.quanty || 1) > 1) {
      // setCart(
      //   cart.map((item) =>
      //     item._id === product._id
      //       ? { ...item, quanty: productExists.quanty - 1 }
      //       : item
      //   )
      // );
      setCart(
        cart.map((item) =>
          item.cartId === product.cartId
            ? { ...item, quanty: productExists.quanty - 1 }
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
        <p className="text-2xl font-bold">{product.quanty || 1}</p>
        <p
          className="text-sm cursor-pointer"
          onClick={() => addProduct(product)}
        >
          ➕
        </p>
      </div>
    </div>
  );
};

export default CartItemCounter;
