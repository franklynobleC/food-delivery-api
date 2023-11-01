import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { useCartContext } from '../context/cart_context'
const CartContent = () => {
  const { cart, clearCart } = useCartContext()
  // pass the cart  item  here
  return (
    <div>
      <h5>cart Content page</h5>
      {cart.map(item => {
        return <CartItem key={item.id} {...item} />
      })}
    </div>
  )
}
export default CartContent
