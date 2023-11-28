import React, { useEffect, useState } from 'react'
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
    payment_option,
    clearFromLocalStorage
  } = useCartContext()
  const { is_logged_in } = useAuthContext()
  const { user, myUser } = useUserContext()

  const [myCart, setMyCart] = useState([])
  const [paymentOption, setPaymentOption] = useState('')
  const [userI, setUser] = useState({})
  let navigate = useNavigate()
  console.log('MYCART', myCart)

  //get  item from  local Storage
  const CartItems = JSON.parse(localStorage.getItem('cart'))

  const handlePaymentChangeOption = e => {
    e.preventDefault()
    setPaymentOption(e.target.name)
    console.log(e.target.value)
    let payWith = e.target.name
    console.log(payWith)

    setPaymentOption(payWith)

  }
  const HandleSubmit = e => {
    e.preventDefault()

    if (cart.length > 0 || CartItems.length > 0) {
      console.log('myCart>>>>>MYCARTT!!! SUBMIT', myCart, cart)
      console.log('shippingFee', delivery_fee, 'Shipping fee 2')
      console.log('user ID from DB', user.userId)
      console.log('payment option is>>', payment_option)
      console.log('Payment Option', paymentOption)

      createOrder(CartItems, user.userId, payment_option, delivery_fee)
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
          <h1>CART TOTAL PAGE</h1>
          {console.log('THIS  IS FROM  TOTAL CART COMPONENT', CartItems)}

          <h4>Total Quantity:{total_quantity}</h4>
        </div>
        <div>
          <h4>Total Price: &#8358;{total_price}</h4>
        </div>
        <div>Delivery Fee: &#8358;{delivery_fee}</div>
        <div>Payment Opt: {paymentOption}</div>

        <fieldset>
          <legend>Select paymentOption </legend>
          <input
            type='radio'
            id='card'
            name='card'
            value={paymentOption}
            checked={paymentOption === 'card'}
            onChange={handlePaymentChangeOption}
          />
          <label htmlFor='card'>Pay with card</label>

          <input
            type='radio'
            id='cash'
            name='cash'
            value={paymentOption}
            checked={paymentOption === 'cash'}
            onChange={handlePaymentChangeOption}
          />
          <label htmlFor='cash'> Pay on delivery </label>
        </fieldset>

        <div>
          {/*   <Link to='/checkout'>checkout</Link>   */}
          <form onSubmit={HandleSubmit}>
            <button className='submit'>pay now</button>
          </form>
        </div>
        {is_logged_in ? (
          ''
        ) : (
          <Link to='/signin' className='cart-total-btn'>
            Sing In
          </Link>
        )}
      </div>
    </div>
  )
}

export default CartTotal
