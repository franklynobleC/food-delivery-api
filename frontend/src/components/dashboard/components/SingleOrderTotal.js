import React, { useEffect } from 'react'
import { useAdminContext } from '../../../context/admin_context'
//TODO:  add  the   loop through and  bring  the  Ca
const SingleOrderTotal = () => {
  const { orders, fetchOrders } = useAdminContext()
  useEffect(() => {
    fetchOrders()
},[])
  return (
    <div>
      {console.log(orders)}
      SingleOrderTotal
      <h1>Single Total</h1>
      {orders.map((orderDatas, index) => (
        <div  key={index}>
          <div>Total Price:{ orderDatas.totalPrice}</div>
          <div>Total Quantity:{ orderDatas.totalQuantity}</div>
</div>
     ))}
    </div>
  )
}

export default SingleOrderTotal
