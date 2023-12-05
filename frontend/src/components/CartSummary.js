import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import { CartToTal } from '../components'
import { useUserContext } from '../context/user_context'

import '../styles/cart/cartSummary.css'

const CartSummary = () => {
  const { is_logged_in, getSingleUser, single_userInfo, userInfo_name } =
    useAuthContext()
  const { user, myUser } = useUserContext()

  const { total_quantity, delivery_fee, total_price, cart } = useCartContext()
  const [newCustomerAddress, setNewCustomerAddress] = useState('')
  let navigate = useNavigate()
  // const { deliveryAddress } = single_userInfo

  useEffect(() => {
    setTimeout(() => {
      getSingleUser(user.userId)
      console.log('waiting  2 sec to get Single Data from      CartSummary')
    }, 2000)
    // console.log('Get Single User Called', deliveryAddress)
  }, [user.userId])

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
            <div>Customer Delivery Address:{single_userInfo}</div>
          </section>
          <CartToTal />
          <Link>
            <button> Confirm Order</button>
          </Link>
          {console.log(
            'checking Single user Data',
            single_userInfo,
            userInfo_name
          )}
        </div>
      )
  }
  return navigate('/login')
}

export default CartSummary
