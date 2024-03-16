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
  // const token = localStorage.getItem('Token_Access')
  const token = localStorage.getItem('Access_Token')
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
    return <CartToTal />
  }
  return navigate('/login')
}

export default CartSummary
