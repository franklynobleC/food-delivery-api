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
  const {
    is_logged_in,
    user,
    getSingleUser,
    single_userInfo,
    userInfo_name,
    user_email
  } = useAuthContext()
  const [paymentOption, setPaymentOption] = useState('')
  const [isTokenPresent, setIsTokenPresent] = useState(false)

  let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  const handConfirm = () => {
    console.log('handle Submit Clicked')
    if (token && cart && userId) {
      console.log('Logged in  && userID is', user.userId, 'USER ID', userId)

      let timeCheck = setTimeout(() => {
        getSingleUser(userId)
      }, 1000)
      navigate('/checkout')
      return () => clearTimeout(timeCheck)
    } else {
      let waitTime = setTimeout(() => {
        console.log('waiting for 1 sec')
        navigate('/login')
      }, 2000)
      return () => clearTimeout(waitTime)
    }
  }

  useEffect(() => {
    getSingleUser(userId)
  }, [userId])
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
