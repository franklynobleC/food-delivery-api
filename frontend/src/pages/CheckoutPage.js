import React, { Link } from 'react'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import { CartSummary, CartToTal } from '../components'
import '../styles/cart/cartpage.css'
const CheckoutPage = () => {
  const { cart } = useCartContext()
  const { is_logged_in } = useAuthContext()

  if (cart.length < 1) {
    return (
      <div>
        <Link to='foods'>
          <h1>Your Cart is Empty, Fill it</h1>
        </Link>
      </div>
    )
  }
  if (cart.length > 0) {
    return (
      <div className='cart-summary'>
        <CartSummary />
        <div>

        </div>
        </div>
    )
  }
  // if () {
  //   return (
  //     <div>
  //       <h2>Please Log In</h2>
  //       <Link to='/login'>Login</Link>
  //     </div>
  //   )
  // }
}

export default CheckoutPage
