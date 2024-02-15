import React, { useEffect, useState } from 'react'

import { useAdminContext } from '../../../context/admin_context'
import { useParams } from 'react-router-dom'
import SingleOrderTotal from './SingleOrderTotal'
import { convertDate } from './convertDate'
const SingleOrder = () => {
  const [userData, setUserData] = useState({ name: '', deliveryAddress: '' })
  const [orderInfo, setOrderInfo] = useState({
    totalPrice: '',
    totalQuantity: '',
    deliveryFee: '',
    orderDate: ''
  })
  const { order, fetchSingleOrder, orders, users, fetchOrders } =
    useAdminContext()
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
    console.log(orders)
    console.log(users)
    const userId = users.find(user => user._id)
    console.log(userId)
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
        } else {
          return
        }

        // console.log(userData.name, userData.deliveryAddress)
      })
    }
    fetchSingleOrder(`${id}`)
  }, [id, orders])

  return (
    <div>
      <div>{userData.name}</div>
      <div>{userData.name}</div>
      <div>{userData.deliveryAddress}</div>
      <div>Order Info</div>
      <div>Total Price:{orderInfo.totalPrice}</div>
      <div> Delivery Fee: {orderInfo.deliveryFee}</div>
      <div> OrderQuantity:{orderInfo.totalQuantity}</div>
      <div> Order Date: {orderInfo.orderDate}</div>
    </div>
  )
}
export default SingleOrder
