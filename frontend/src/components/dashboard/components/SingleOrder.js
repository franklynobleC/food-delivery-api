import React, { useEffect, useState } from 'react'

import { useAdminContext } from '../../../context/admin_context'
import { useParams } from 'react-router-dom'
import SingleOrderTotal from './SingleOrderTotal'
import { convertDate } from './convertDate'
import '../../../styles/admindashboard/userOrderInfo.css'
const SingleOrder = () => {
  const [userData, setUserData] = useState({ name: '', deliveryAddress: '' })
  const [orderInfo, setOrderInfo] = useState({
    totalPrice: '',
    totalQuantity: '',
    deliveryFee: '',
    orderDate: ''
  })
  const { fetchSingleOrder, orders, users } = useAdminContext()
  const { id } = useParams()

  useEffect(() => {
    console.log(id)

    const userId = users.find(user => user._id)

    if (userId && orders) {
      orders.map((orderData, index) => {
        if (orderData._id === id) {
          setOrderInfo({
            totalPrice: orderData.totalPrice,
            totalQuantity: orderData.totalQuantity,
            deliveryFee: orderData.deliveryFee,
            orderDate: convertDate(orderData.createdAt)
          })
          console.log(orderData)
          if (orderData.user !== userId._id) return
          const { name, deliveryAddress } = userId

          setUserData({ name: name, deliveryAddress: deliveryAddress })
          console.log(
            name,
            deliveryAddress,
            orderData.totalPrice,
            orderData.totalQuantity
          )
          const { OrderItems } = orderData
          OrderItems.map(singleOrder => {
            console.log('NEW ORDER', singleOrder)
          })
          return
        }
        return

        // console.log(userData.name, userData.deliveryAddress)
      })
    }
    fetchSingleOrder(`${id}`)
  }, [id, orders])

  return (
    <div className='user-info-header'>
      <div className='user-info'>
        <h2>User's Order Information</h2>
        <div className='content-order'>Name: {userData.name}</div>
        <div className='content-order'>Address: {userData.deliveryAddress}</div>
      </div>
      <h3>Order Information</h3>
      <div className='order-info'>
        <div className='content-order'>Total Price: {orderInfo.totalPrice}</div>
        <div className='content-order'>
          Delivery Fee: {orderInfo.deliveryFee}
        </div>
        <div className='content-order'>
          {' '}
          OrderQuantity:  {orderInfo.totalQuantity}
        </div>
        <div className='content-order'> Order Date:  {orderInfo.orderDate}</div>
      </div>
    </div>
  )
}
export default SingleOrder
