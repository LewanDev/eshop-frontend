import {useContext } from "react"
import { Context } from "../../context/Context"

import Navbar from "../NavBar/Navbar"
import CartElements from "./CartElements"
import CartTotal from "./CartTotal"

import './CartContent.css'
import CartTitle from "./CartTitle"

const CartContent = () => {
  const {cart} = useContext(Context)
  return (
    <>
      <Navbar />
      {cart.length > 0 ? (
        <div className="cart-content">
          <CartTitle />
          <CartElements />
          <CartTotal />
        </div>
      ) : (
        <h2 className='cart-message-empty'>Tu carrito está vacío</h2>
      )}
    </>
  )
}

export default CartContent