import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { Login } from '../components'
import { useAuthContext } from '../context/auth_context'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { Route, useNavigate } from 'react-router-dom'
import mastercard from '../images/mastercard-4.svg'
import paystackImg from '../images/paystack-2.svg'
import vizacard from '../images/visa.svg'
import '../styles/cart/carttotal.css'
import { BeatLoader, MoonLoader } from 'react-spinners'

//TODO: CHECK  IF  TOKEN  IS EXPIRED, before creating order

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
    updateUser,

    // single_user_update,
    single_user_update
  } = useAuthContext()

  const [paymentOption, setPaymentOption] = useState('card')
  const [isLoading, setIsLoading] = useState(false)
  const [userI, setUser] = useState({})
  let navigate = useNavigate()
  const token = localStorage.getItem('Access_Token')
  const [formData, setFormData] = useState({
    name: user_name,
    email: user_email,
    deliveryAddress: user_address,
    phone: user_phone
  })
  //This  does  not Have Effect,  you can  override  this
  const override = {
    margin: '25%',

    color: 'green'
    // color: green
  }

  const CartItems = JSON.parse(localStorage.getItem('cart'))
  const userId = localStorage.getItem('userId')

  const handleChange = e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

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
        if (!formData.deliveryAddress || !formData.phone || !formData.email)
          return
        await updateUser(
          userId,
          formData.name,
          formData.email,
          formData.deliveryAddress,
          formData.phone
        )
        console.log('update user', single_user_update)
        // single_user_update
          createOrder(CartItems, userId, paymentOption, delivery_fee)
          // : null
      } catch (error) {
        console.log(error)
      }
      if (single_user_update) {
        console.log('single_user_update', single_user_update)
      }

      console.log('Console Success', is_order_created_success)
    }
  }

  return (
    <Wrapper>
      <div>
        {console.log('success Message', is_order_created_success)}
        {isLoading && (
          <div className='class-spinner-container'>
            <div> please wait loading ...</div>
            <MoonLoader width='5000' color='#36d7b7' font={4000} size={150}>
              loading ...
            </MoonLoader>
          </div>
        )}

        {is_order_created_success ? checkOut() : null}

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
            <button className='back' type='button' onClick={() => navigate(-1)}>back</button>
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
          className={`sign-in-before-checkout ${token ? '' : 'user-invalid'}`}
        >
          {token === false && <div> please login</div>}
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .back {
    justify-content: left;
    padding: 0.3rem 1rem;

    border-radius: 4px;
    color: white;
    border: none;
    display: flex;
    margin-top: 10px;
    margin-right: auto;
    align-items: left;
    background-color: grey;
  }
  .class-spinner-container {
    position: absolute;
    height: fit-content;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    z-index: 10; /* Ensure this is higher than the form's z-index */
    /* Optional: Add a background that covers the whole Wrapper with some transparency */
    background-color: rgba(0, 0, 0, 0.1);
    overflow-x: hidden;
    overflow-y: hidden;

    width: 100%; /* Cover the full width */
    height: 100%; /* Cover the full height */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`

export default CartTotal
