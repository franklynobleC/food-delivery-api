import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import CartTotal from './CartTotal'
import '../styles/cart/cartcontent.css'
import OrderSummary from './OrderSummary'
import { checkToken } from '../utils/constants'

const CartContent = () => {
  const { cart, clearCart, } = useCartContext()
  const { is_logged_in } = useAuthContext()

  // pass the cart  item  here
  localStorage.setItem('cart', JSON.stringify(cart))
  const token = localStorage.getItem('token')

  {
    // token ? setIsTokenPresent(true) : setIsTokenPresent(false)

    if (cart.length < 1) {
      return (
        <>
          <Link to='/foods'>
            <h1> Cart is Empty Fill it</h1>
          </Link>
        </>
      )
    }

    return (
      <div className='cart-content'>
        cart Content page
        <div className='order-summary-div'>
          <OrderSummary />
        </div>
        {cart.map(item => {
          return <CartItem key={item.id} {...item} />
        })}
        <div>
          <Link to='/foods'>add more orders</Link>
        </div>
        <button className='clear-btn' onClick={clearCart}>
          clear cart
        </button>
        <div className='signin-or-checkout'>
          {token ? (
            <div className='checkout-link'>
              <Link to='/checkout'>proceed to Checkout</Link>
            </div>
          ) : (
            <div className='signin-link'>
              <Link to='/signin'>login to checkout</Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default CartContent
