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

  const [myCart, setMyCart] = useState(cart)
  const [paymentOption, setPaymentOption] = useState('')
  const [userI, setUser] = useState({})
  let navigate = useNavigate()
  console.log('MYCART', myCart)

  //get  item from  local Storage
  let itemFromLocalStorage = localStorage.getItem('cart')
  let itemFromLocalStorageObj = JSON.parse(itemFromLocalStorage)

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

    if (cart.length) {
      console.log('myCart>>>>>MYCARTT!!! SUBMIT', myCart, cart)
      console.log('shippingFee', delivery_fee, 'Shipping fee 2',)
      console.log('user ID from DB', user.userId)
      console.log('payment option is>>', paymentOption)

      createOrder(myCart, user.userId, paymentOption, delivery_fee)
    }
  }
  useEffect(() => {
    // setShippingFee(delivery_fee)
    // setMyCart([...cart,itemFromLocalStorageObj])
    // setUser(user)
    // setPaymentOption('card')
  }, [cart])

  return (
    <div className='cart-total-container'>
      <div className='total-items'>
        <div>
          <h1>CART TOTAL PAGE</h1>
          {console.log(
            'THIS  IS FROM  TOTAL CART COMPONENT',
            itemFromLocalStorageObj
          )}

          <h4>Total Quantity:{total_quantity}</h4>
        </div>
        <div>
          <h4>Total Price: &#8358;{total_price}</h4>
        </div>
        <div>Delivery Fee:&#8358;{delivery_fee}</div>

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
