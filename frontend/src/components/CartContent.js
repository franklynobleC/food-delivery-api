import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { useCartContext } from '../context/cart_context'
import CartTotal from './CartTotal'
import  '../styles/cart/cartcontent.css'
const CartContent = () => {
  const { cart, clearCart } = useCartContext()
  // pass the cart  item  here
  return (
    <div className='cart-content'>
      <h5>cart Content page</h5>
      {cart.map(item => {
        console.log(item)
        return <CartItem key={item.id} {...item} />
      })}
      <CartTotal />
      <button onClick={clearCart}>clear cart</button>
    </div>
  )
}
export default CartContent
