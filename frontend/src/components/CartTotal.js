import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { Login } from '../components'
import { useAuthContext } from '../context/auth_context'

import { Link } from 'react-router-dom'
import { Route, useNavigate } from 'react-router-dom'
import mastercard from '../images/mastercard-4.svg'
import paystackImg from '../images/paystack-2.svg'
import vizacard from '../images/visa.svg'
import '../styles/cart/carttotal.css'

const CartTotal = () => {
  const {
    total_quantity,
    delivery_fee,
    total_price,
    cart,
    createOrder,
    is_order_created_success,
    checkOut,

    clearFromLocalStorage
  } = useCartContext()

  const {
    getSingleUser,
    user_address,
    user_name,
    user_phone,
    user_email,
    updateUser
  } = useAuthContext()

  const [paymentOption, setPaymentOption] = useState('card')
  const [userI, setUser] = useState({})
  let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({
    name: user_name,
    email: user_email,
    deliveryAddress: user_address,
    phone: user_phone
  })

  const CartItems = JSON.parse(localStorage.getItem('cart'))
  const userId = localStorage.getItem('userId')

  const handleChange = e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    console.log('data submit', formData)

    console.log('payment option', paymentOption)
    if (paymentOption === '' || paymentOption === null) {
      console.log('payment option  is empty returned!!')
      return
    }

    if (cart.length > 0 || CartItems.length > 0) {
      if (!userId) {
        return
      }
      console.log(userId)
      try {
        console.log(formData)
        if (!formData) return
        await updateUser(
          userId,
          formData.name,
          formData.email,
          formData.deliveryAddress,
          formData.phone
        )
      } catch (error) {
        console.log(error)
      }

      //uncomment this  to  create Order
      Todo: createOrder(CartItems, userId, paymentOption, delivery_fee)
      //  TODO: ORDER CREATION,UPDATE, REDIRECT TO  PAYMENT  GATEWAY.

      console.log('Console Success', is_order_created_success)
    }
  }

  return (
    <div>
      {console.log('success Message', is_order_created_success)}

      {is_order_created_success ? checkOut() : ''}

      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-grid'>
          <h2>Payment Form</h2>
          <p> Accept secure card payments with PayStack</p>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Delivery Address'>Delivery Address</label>
            <input
              type='address'
              id='phone'
              name='deliveryAddress'
              value={formData.deliveryAddress}
              onChange={handleChange}
            />
          </div>
          <div className='images-container'>
            <img src={mastercard} alt='' className='image-data' />
            <img src={paystackImg} alt='' className='image-data' />
            <img src={vizacard} alt='' className='image-data' />
          </div>
          <button className='btn-pay'>
            Pay &#8358;{total_price + delivery_fee}
          </button>
        </div>
      </form>

      {token ? (
        ''
      ) : (
        <Link to='/signin' className='cart-total-btn'>
          Sing In
        </Link>
      )}
      <div
        div
        className={`sing-in-before-checkout ${token ? '' : 'user-invalid'}`}
      >
        {token === false && <div> please login</div>}
      </div>
    </div>
  )
}

export default CartTotal
