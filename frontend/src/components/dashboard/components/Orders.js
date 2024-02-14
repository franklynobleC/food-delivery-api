import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminContext } from '../../../context/admin_context'
const Orders = () => {
  const { fetchOrders, orders, payments } = useAdminContext()
  useEffect(() => {
    fetchOrders()
  }, [])
  if (!orders) {
    return (
      <div className='orders'>
        <h2>No Orders Found from dashboard</h2>
      </div>
    )
  }
  return (
    <div className='payments-div'>
      <div>
        <h2>All ORDERS</h2>
      </div>
      <div className='payment-header-container'>
        <div className='main-header-content'>Customer Email</div>
        <div className='main-header-content'>Order Status</div>
        <div className='main-header-content'> Order Date</div>
      </div>
      {orders.map((order, index) => (
        <div className='payment-content-container' key={index}>
          <div className='content'>{'user email'}</div>
          <div className='content'>{order.orderStatus}</div>
          <div className='content'>{'date time'}</div>
          <div>   <Link  to={'/dashboard/orders/'+order._id}>show Order</Link>   </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
