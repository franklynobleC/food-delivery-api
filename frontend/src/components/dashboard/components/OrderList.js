import React from 'react'
import { useAdminContext } from '../../../context/admin_context'
const OrderList = () => {
  const { orders, payments } = useAdminContext()

  if (!orders) {
    return (
      <div>
        {' '}
        <h2>No Orders Found from dashboard</h2>
      </div>
    )
  }
  return orders.map(order => {
    console.log(order)
    return (
      <div>
        <h3>From Dashboard</h3>
        <div>{order}</div>
      </div>
    )
  })
}

export default OrderList
