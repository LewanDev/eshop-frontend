import { useContext } from "react";
import { Context } from "../../context/Context";
import CartItemCounter from "./CartItemCounter";

const CartElements = () => {
  const { cart, setCart } = useContext(Context);

  const deleteProduct = (_id) => {
    const newCart = cart.filter((element) => element.id !== _id);
    setCart(newCart);
  };

  return cart.map((product) => {
    return (
      <div className="cart-card-container" key={product.id}>
        <img src={product.img} alt={product.name} />
        <div className="cart-card-detail">
          <h3>{product.name}</h3>
          <CartItemCounter product={product} />
          <h3>${product.price * product.quanty}</h3>
        </div>
        <h3
          className="cart-btn-delete"
          onClick={() => deleteProduct(product.id)}
        >
          ❌
        </h3>
      </div>
    );
  });
};

export default CartElements;
