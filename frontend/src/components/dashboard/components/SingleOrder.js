import React, { useEffect } from 'react'

import { useAdminContext } from '../../../context/admin_context'
import { useParams } from 'react-router-dom'
import SingleOrderTotal from './SingleOrderTotal'
const SingleOrder = () => {
  const { order, fetchSingleOrder, orders, fetchOrders } = useAdminContext()
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
    fetchOrders()

    fetchSingleOrder(`${id}`)
  }, [id])

  return (
    <div>
      {orders.map((orderData, index) => {
        if (orderData._id !== id) return
        const { OrderItems } = orderData

        return (
          <div key={index}>
            {OrderItems.map((items, index) => {
              const { name, price, quantity } = items

              return (
                <div key={index}>
                  <div>Name: {name}</div>
                  <div>Price: {price}</div>
                  <div>Quantity: {quantity}</div>
                </div>
              )
            })}
            <div>Delivery Address: {orderData.deliveryAddress}</div>
            <div>Delivery Fee: {orderData.deliveryFee}</div>

            <div>Total Price: {orderData.totalPrice}</div>
            <div>Total Quantity: {orderData.totalQuantity}</div>
          </div>
        )
      })}
    </div>
  )
}

export default SingleOrder
