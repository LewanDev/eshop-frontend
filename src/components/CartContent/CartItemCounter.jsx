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
    <div className="cart-itemcounter">
      <div className="cart-addremove">
        <p className="btn" onClick={decrease}>
          ➖
        </p>
        <p className="quanty">{product.quanty}</p>
        <p className="btn" onClick={() => addProduct(product)}>
          ➕
        </p>
      </div>
    </div>
  );
};

export default CartItemCounter;
