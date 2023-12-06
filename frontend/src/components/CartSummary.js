import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import { CartToTal } from '../components'
import { useUserContext } from '../context/user_context'

import '../styles/cart/cartSummary.css'

const CartSummary = () => {
  const {
    is_logged_in,
    single_userInfo,
    userInfo_name,
    user_email,
    updateUser
  } = useAuthContext()
  const { user, myUser } = useUserContext()

  const { total_quantity, delivery_fee, total_price, cart } = useCartContext()
  // const [newCustomerAddress, setNewCustomerAddress] = useState('')
  const [newCustomerName, setNewCustomerName] = useState(userInfo_name)
  const [newCustomerAddress, setNewCustomerAddress] = useState(single_userInfo)
  const [newCustomerEmail, setNewCustomerEmail] = useState(user_email)
  const [isOpen, setIsOpen] = useState(false)
  let navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleEditData = () => {
    setIsOpen(!isOpen)
  }
  const handleChange1 = e => {
    // [e.target.name] = e.target.value
    setNewCustomerName(e.target.value)
    console.log('Name  is', newCustomerName)
  }
  const handleChange2 = e => {
    // [e.target.name] = e.target.value
    setNewCustomerEmail(e.target.value)
    console.log('Email  is', newCustomerEmail)
  }
  const handleChange3 = e => {
    // [e.target.name] = e.target.value
    setNewCustomerAddress(e.target.value)
    console.log('Address  is', newCustomerAddress)
  }
  const handleUpdate = () => {
    console.log('update Data handler Called')
    updateUser(
      user.userId,
      newCustomerAddress,
      newCustomerEmail,
      newCustomerName
    )

    setIsOpen(false)
  }

  {
    if (token)
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
            <button type='submit' onClick={handleEditData}>
              change address
            </button>
          </section>
          {isOpen && (
            <form onSubmit={handleUpdate}>
              name:
              <input
                type='text'
                name='name'
                value={newCustomerName}
                onChange={handleChange1}
              />
              Email:
              <input
                type='email'
                name='email'
                value={newCustomerEmail}
                onChange={handleChange2}
              />
              Customer Address:
              <input
                type='text'
                name='address'
                value={newCustomerAddress}
                onChange={handleChange3}
              />
              <button type='handleSubmit'>Submit</button>
            </form>
          )}
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
