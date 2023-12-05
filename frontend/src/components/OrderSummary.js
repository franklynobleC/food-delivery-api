import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'

import { useAuthContext } from '../context/auth_context'
import { useNavigate } from 'react-router-dom'
import '../styles/cart/OrderSummary.css'

const OrderSummary = () => {
  const {
    total_quantity,
    delivery_fee,
    total_price,
    cart,
    createOrder,
    payment_option,
    clearFromLocalStorage
  } = useCartContext()
  const { is_logged_in,} = useAuthContext()
  const [paymentOption, setPaymentOption] = useState('')
  let navigate = useNavigate()
  const handConfirm = () => {
    // e.preventDefault()
    console.log('handle Submit Clicked')
    if (is_logged_in && cart) {
      console.log('Logged in')
      return navigate('/checkout')
    } else {
      let waitTime = setTimeout(() => {
        console.log('waiting for 1 sec')
        navigate('/login')
      }, 2000)
      return () => clearTimeout(waitTime)
    }
  }
  return (
    <div style={{ marginTop: '200px' }}>
      <div className='cart-summary'>
        <div>
          <h3>ORDER SUMMARY</h3>
        </div>

        <div>Confirm Order</div>
        <div className='quantity-total'>
          <span>Total Quantity: {total_quantity}</span>
        </div>

        <div className='cart-total'>
          <div>Sub Total:</div>
          <div> &#8358;{total_price - delivery_fee}</div>
        </div>

        <div className='confirm-btn-container'>
          <button className='confirm-btn' type='submit' onClick={handConfirm}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
