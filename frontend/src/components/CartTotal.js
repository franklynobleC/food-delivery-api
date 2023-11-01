import React from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
const CartTotal = () => {
  const { total_quantity, shipping_fee } = useCartContext()
  return (
    <div>
      <div>
        <h4>{total_quantity}</h4>
      </div>
      <div>{shipping_fee}</div>
    </div>
  )
}

export default CartTotal
