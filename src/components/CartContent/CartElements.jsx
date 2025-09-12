import { useContext } from "react";
import { Context } from "../../context/Context";
import CartItemCounter from "./CartItemCounter";
import formatPrice from "../../utils/formatPrice";
import "./CartContent.css";

const CartElements = () => {
  const { cart, setCart } = useContext(Context);

  const deleteProduct = (_id) => {
    const newCart = cart.filter((element) => element.id !== _id);
    setCart(newCart);
  };

  return cart.map((product) => {
    return (
      <div
        className="py-2 rounded-xl flex flex-wrap gap-16 justify-center bg-(--color-lighter) text-start m-8 items-center w-2xl"
        key={product.id}
      >
        <img
          className="w-40 h-60 object-fill rounded-xl"
          src={product.img}
          alt={product.name}
        />
        <div className="flex flex-col justify-around gap-2.5">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <h3 className="text-xl font-bold text-(--color-secondary)">
            {formatPrice(product.price * product.quanty)}
          </h3>
          <CartItemCounter product={product} />
        </div>
        <h3
          className="cursor-pointer self-start mt-4"
          onClick={() => deleteProduct(product.id)}
        >
          ❌
        </h3>
      </div>
    );
  });
};

export default CartElements;
