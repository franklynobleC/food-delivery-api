import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
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
    payment_option
  } = useCartContext()
  const { is_logged_in } = useAuthContext()
  const { user, myUser } = useUserContext()

  const [shippingFee, setShippingFee] = useState(0)
  const [myCart, setMyCart] = useState([])
  const [paymentOption, setPaymentOption] = useState('')
  const [userI, setUser] = useState({})
  let navigate = useNavigate()

  const HandleSubmit = e => {
    e.preventDefault()

    if (cart.length < 1) {
      return (
        <div>
          <Link to='foods'>
            <h1>Your Cart is Empty, Fill it</h1>
          </Link>
        </div>
      )
    }
    if (!is_logged_in) {
      console.log('not logged in!!!')
      return navigate('/login')
    }

    if (is_logged_in && cart.length > 0) {
      console.log('myCart>>>>>MYCARTT!!! SUBMIT', myCart)
      console.log('shippingFee', delivery_fee)
      console.log('user ID from DB', user.userId)
      console.log('payment option is>>', paymentOption)

      createOrder(myCart, user.userId, paymentOption, delivery_fee)
    }
  }
  useEffect(() => {
    setShippingFee(delivery_fee)
    setMyCart([...cart])

    setUser(user)
    setPaymentOption('card')
  }, [])

  return (
    <div className='cart-total-container'>
      <div className='total-items'>
        <div>
          <h1>CART TOTAL PAGE</h1>

          <h4>Total Quantity:{total_quantity}</h4>
        </div>
        <div>
          <h4>Total Price: &#8358;{total_price}</h4>
        </div>
        <div>Delivery Fee:&#8358;{delivery_fee}</div>
        {console.log('CART CONTENT  IS>>>', typeof cart)}

        <div>
          <Link to='/checkout'>checkout</Link>
          <form onSubmit={HandleSubmit}>
            <button className='submit'>pay now</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
