import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import { CartToTal } from '../components'
import '../styles/cart/cartSummary.css'

const CartSummary = () => {
  const { is_logged_in } = useAuthContext()
  const { total_quantity, delivery_fee, total_price, cart } = useCartContext()
  const [newCustomerAddress, setNewCustomerAddress] = useState('')
  let navigate = useNavigate()

  {
    if (is_logged_in)
      return (
        <div className='cart-summary'>
          <div>ORDER SUMMARY</div>
          <div>Confirm Order</div>
          <div>Total Quantity:{total_quantity}</div>
          <div>Total Price:{total_price}</div>
          {/*<div> Delivery Fee:{delivery_fee}</div> */}
          {console.log('this  is from  Cart Summary ', is_logged_in)}

          <div></div>
          <section>
            <div>Customer Delivery Address</div>
          </section>
          <CartToTal />

          <Link>
            <button> Confirm Order</button>
          </Link>
        </div>
      )
  }
  return navigate('/login')
}

export default CartSummary
