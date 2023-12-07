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
  const userId = localStorage.getItem('userId')

  const handleEditData = () => {
    setIsOpen(!isOpen)
  }
  const handleChangeName = e => {
    // [e.target.name] = e.target.value
    setNewCustomerName(e.target.value)
    console.log('Name  is', newCustomerName)
  }
  const handleChangeEmail = e => {
    setNewCustomerEmail(e.target.value)
  }
  const handleChangeAddress = e => {
    setNewCustomerAddress(e.target.value)
  }
  const handleUpdate = () => {
    console.log('update Data handler Called')
    updateUser(userId, newCustomerName, newCustomerEmail, newCustomerAddress)

    setIsOpen(false)
  }
  const handleBackBtn = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    console.log(newCustomerAddress, newCustomerEmail, newCustomerName)
  }, [newCustomerAddress, newCustomerEmail, newCustomerName])

  if (token) {
    return (
      <div className='cart-summary'>
        <div>ORDER SUMMARY</div>
        <div>Confirm Order</div>
        <div>Total Quantity:{total_quantity}</div>
        <div>Total Price:{total_price}</div>

        <div></div>
        <section>
          <div>Customer Delivery Address:{single_userInfo}</div>

          <button type='submit' onClick={handleEditData}>
            change address
          </button>
        </section>
        {isOpen && (
          <div>
            <form onSubmit={handleUpdate}>
              name:
              <input
                required
                type='text'
                name='name'
                value={newCustomerName}
                onChange={handleChangeName}
              />
              Email:
              <input
                required
                type='email'
                name='email'
                value={newCustomerEmail}
                onChange={handleChangeEmail}
              />
              Customer Address:
              <input
                required
                type='text'
                name='address'
                value={newCustomerAddress}
                onChange={handleChangeAddress}
              />
              <button type='handleSubmit'>update</button>
            </form>
            <button  type='click' onClick={handleBackBtn}>back</button>
          </div>
        )}
        <CartToTal />

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
