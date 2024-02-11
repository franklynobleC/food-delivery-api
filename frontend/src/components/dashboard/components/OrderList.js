import React from 'react'

import '../../styles/admindashboard/orders.css'

import { useAdminContext } from '../../../context/admin_context'
const OrderList = () => {
  const { orders, payments } = useAdminContext()

  if (!orders) {
    return (
      <div className='orders'>

        <h2>No Orders Found from dashboard</h2>
      </div>
    )
  }
  return orders.map(order => {
    console.log(order)
    return (
      <div className='orders'>
        {console.log('FROM ORDERS  CONTEXT', orders)}
        {console.log('FROM payments  CONTEXT', payments)}
        <h3>From Dashboard</h3>
        <div>{orders}</div>
      </div>
    )
  })
}

export default OrderList
