import React from 'react'
import { useCartContext } from '../context/cart_context'
const ActualPay = () => {
  const { is_order_created_success } = useCartContext()
  return (
      <div>
          <p>Actual Pay Page</p>
      {console.log('checking if Order Created', is_order_created_success)}
    </div>
  )
}

export default ActualPay
