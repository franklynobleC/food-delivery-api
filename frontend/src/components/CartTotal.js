import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { Login } from '../components'
import { useAuthContext } from '../context/auth_context'

import { Link } from 'react-router-dom'
import { Route, useNavigate } from 'react-router-dom'

import '../styles/cart/carttotal.css'

//import { useAuthContext } from '../context/auth_context'
const CartTotal = () => {
  const {
    total_quantity,
    delivery_fee,
    total_price,
    cart,
    createOrder,
    is_order_created_success,
    checkOut,
    payment_option,
    clearFromLocalStorage
  } = useCartContext()
  const { is_logged_in } = useAuthContext()
  const { user, myUser } = useUserContext()

  const [myCart, setMyCart] = useState([])
  const [paymentOption, setPaymentOption] = useState('')
  const [userI, setUser] = useState({})
  let navigate = useNavigate()
  const token = localStorage.getItem('token')

  // console.log('MYCART', myCart)

  //get  item from  local Storage
  const CartItems = JSON.parse(localStorage.getItem('cart'))
  const userId = localStorage.getItem('userId')

  const handlePaymentChangeOption = e => {
    setPaymentOption(e.target.value)
  }
  const HandleSubmit = e => {
    e.preventDefault()

    if (paymentOption === '' || paymentOption === null) {
      console.log('payment option  is empty returned!!')
      return
    }

    if (cart.length > 0 || CartItems.length > 0) {
      if (!userId) {
        console.log('user id is null')
        return
      }

      createOrder(CartItems, userId, paymentOption, delivery_fee)
      //  TODO: ORDER CREATION,UPDATE, REDIRECT TO  PAYMENT  GATEWAY.

      console.log('Console Success', is_order_created_success)
      // const timeCheck = setTimeout(() => {

      // }, 4000)
      // clearTimeout(timeCheck)
    }
  }
  ;<div>
    <Link to='foods'>
      <h1>Your Cart is Empty, Fill it</h1>
    </Link>
  </div>

  return (
    <div className='cart-total-container'>
      <div className='total-items'>
        <div>
          <h3>YOUR CART TOTAL IS:</h3>
          {console.log('THIS  IS FROM  TOTAL CART COMPONENT', CartItems)}

          <h4>Total Quantity:{total_quantity}</h4>
        </div>
        <div>Delivery Fee: &#8358;{delivery_fee}</div>
        <div>
          <h4>Total Price: &#8358;{total_price + delivery_fee}</h4>
        </div>
        <div>Payment Opt: {paymentOption}</div>
        <div
          className={`payment ${
            paymentOption === 'card' || paymentOption === 'cash'
              ? ''
              : 'invalid'
          }`}
        >
          {paymentOption !== 'card' && paymentOption !== 'cash' && (
            <div>
              <p>Please select a payment option</p>
            </div>
          )}

          <fieldset>
            <legend>Select paymentOption </legend>
            <input
              type='radio'
              value='card'
              name='paymentOption'
              checked={paymentOption === 'card'}
              onChange={handlePaymentChangeOption}
            />
            <label htmlFor='card'>Pay with card</label>

            <input
              type='radio'
              name='paymentOption'
              value='cash'
              checked={paymentOption === 'cash'}
              onChange={handlePaymentChangeOption}
            />
            <label htmlFor='cash'> Pay on delivery </label>
          </fieldset>
        </div>
        <div>
          {console.log('success Message', is_order_created_success)}
          {/*   <Link to='/checkout'>checkout</Link>   */}
          {is_order_created_success ? (checkOut()) : ''}

            {/* { */}
              /* (window.location.href =
              'https://nodejs.org/en/guides/anatomy-of-an-http-transaction/') */
            {/* }
          ) : (
            <></>
          )} */}
          <form onSubmit={HandleSubmit}>
            <button className='submit'>pay now</button>
          </form>
        </div>
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
    </div>
  )
}

export default CartTotal
