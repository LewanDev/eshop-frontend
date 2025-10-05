import { useContext } from "react";
import { Context } from "../../context/Context";
import CartItemCounter from "./CartItemCounter";
import formatPrice from "../../utils/formatPrice";

const CartElements = () => {
  const { cart, setCart } = useContext(Context);

  // Agrupar productos por name
  const groupedProducts = cart.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const deleteVariant = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  return Object.entries(groupedProducts).map(([productName, variants]) => {
    const totalPrice = variants.reduce(
      (sum, item) => sum + item.price1 * item.quanty,
      0
    );
    const totalItems = variants.reduce((sum, item) => sum + item.quanty, 0);

    return (
      <div
        key={productName}
        className="py-4 px-6 mb-6 rounded-xl bg-(--color-lighter) flex flex-col gap-4"
      >
        <div className="flex flex-row justify-between">
          <h3 className="text-3xl font-bold text-(--color-secondary)">{productName}</h3>
          <p className="text-base italic text-(--color-gray)">
            Total del producto: {totalItems} unidad
            {totalItems !== 1 ? "es" : ""} → {formatPrice(totalPrice)}
          </p>
        </div>
        <div className="flex flex-row justify-around flex-wrap">
          {variants.map((product) => (
            <div
              key={product.cartId}
              className="flex flex-row items-center gap-2 border border-(--color-gray-light) rounded-xl p-3"
            >
              <img
                className="w-36 h-56 object-contain rounded-xl"
                src={product.selectedImage || product.img}
                alt={`${product.name} - ${product.selectedColor || ""}`}
              />

              <div className="flex flex-col gap-4 mx-5">
                {product.selectedColor && (
                  <p className="text-base italic text-center text-(--color-gray)">
                    {product.selectedColor}
                  </p>
                )}

                <h3 className="text-lg font-bold text-(--color-secondary)">
                  {formatPrice(product.price1 * product.quanty)}
                </h3>

                <CartItemCounter product={product} />

                <button
                  className="mt-1 text-xl cursor-pointer hover:text-red-500"
                  onClick={() => deleteVariant(product.cartId)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
};

export default CartElements;
