// import { useContext } from "react";
// import { Context } from "../../context/Context";
// import CartItemCounter from "./CartItemCounter";
// import formatPrice from "../../utils/formatPrice";
// import "./CartContent.css";

// const CartElements = () => {
//   const { cart, setCart } = useContext(Context);

//   const deleteProduct = (cartId) => {
//     const newCart = cart.filter((element) => element.cartId !== cartId);
//     setCart(newCart);
//   };

//   // Agrupa por producto (name o id)
//   const groupedProducts = cart.reduce((acc, item) => {
//     const key = item.name; // o item.id si querés
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(item);
//     return acc;
//   }, {});

//   return cart.map((product) => {
//     return (
//       <div
//         className="py-2 rounded-xl flex flex-wrap gap-16 justify-center bg-(--color-lighter) text-start m-8 items-center w-2xl"
//         key={product.cartId}
//       >
//         <img
//           className="w-40 h-60 object-contain rounded-xl"
//           src={product.selectedImage ? `${product.selectedImage}` : product.img}
//           alt={product.name}
//         />
//         <div className="flex flex-col justify-around gap-2.5">
//           <h3 className="text-2xl font-bold">{product.name}</h3>

//           {/* Color seleccionado */}
//           {product.selectedColor && (
//             <p className="text-base italic text-(--color-gray)">
//               Color: {product.selectedColor}
//             </p>
//           )}

//           <h3 className="text-xl font-bold text-(--color-secondary)">
//             {formatPrice(product.price1 * product.quanty)}
//           </h3>
//           <CartItemCounter product={product} />
//         </div>
//         <h3
//           className="cursor-pointer self-start mt-4"
//           onClick={() => deleteProduct(product.cartId)}
//         >
//           ❌
//         </h3>
//       </div>
//     );
//   });
// };

// export default CartElements;
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
