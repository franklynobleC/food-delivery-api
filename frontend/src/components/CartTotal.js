import React from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
const CartTotal = () => {
  const { total_quantity, shipping_fee } = useCartContext()
  return (
    <div>
      <div>
        <h1>CART TOTAL PAGE</h1>
        <h4>Total Amount: &#8358;{total_quantity}</h4>
      </div>
      <div>Delivery Fee:&#8358;{shipping_fee}</div>
    </div>
  )
}

export default CartTotal
