import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import { CartToTal } from '../components'
import { useUserContext } from '../context/user_context'
import { FiChevronRight, FiArrowLeft } from 'react-icons/fi'

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
      <div className='cart-summary-final'>
        <div>
          <h3>ORDER SUMMARY place Order Now:</h3>
        </div>

        <div className='total-quantity-summary'>
          <div>Total Quantity:</div>
          <div className='actual-total-quantity'>{total_quantity}</div>
        </div>
        <div className='total-quantity-summary'>
          <div>Sub-Total:</div>
          <div className='actual-total-price'>{total_price}</div>
        </div>
        <section className='customer-address'>
          <div className='delivery-details'>
            <h4>Customer Delivery Details:</h4>
          </div>
          <div className='address-grid'>
            <div className='user-address'>{single_userInfo}</div>

            <div className='change-address'>
              <button
                className='change-address-btn'
                type='submit'
                onClick={handleEditData}
              >
                change address
                <FiChevronRight className='icon-size' />
              </button>
            </div>
          </div>

          <div className='cart-details-summary'>
            <div>cart here</div>
          </div>
          <div className='modify-cart-div'>
            <Link to='/cart' className='modify-summary-cart-link'>
              modify cart
            </Link>
          </div>
        </section>
        {isOpen && (
          <div className='update-data-form-div'>
            <h4>Update User Data</h4>
            <form onSubmit={handleUpdate}>
              <div className='inside-form-container'>
                <div className='form-input-name'>
                  Name:
                  <input
                    required
                    type='text'
                    name='name'
                    value={newCustomerName}
                    onChange={handleChangeName}
                  />
                </div>
                <div className='form-input-email'>
                  Email:
                  <input
                    required
                    type='email'
                    name='email'
                    value={newCustomerEmail}
                    onChange={handleChangeEmail}
                  />
                </div>
                <div className='form-input-address'>
                  Address:
                  <input
                    required
                    type='text'
                    name='address'
                    value={newCustomerAddress}
                    onChange={handleChangeAddress}
                  />
                </div>

                <div className='form-input-address'>
                  <button className='btn-update' type='handleSubmit'>
                    update
                  </button>
                </div>
                <div className='update-btn-container'></div>
              </div>
            </form>
            <button className='btn-back' type='click' onClick={handleBackBtn}>
              <FiArrowLeft className='back-icon' />
              back
            </button>
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
