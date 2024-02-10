import React, { useEffect } from 'react'
import PaymentList from '../../components/dashboard/components/PaymentList'
import { useAdminContext } from '../../context/admin_context'
const PaymentsPage = () => {

  return (
    <div>

      PaymentsPage
      <PaymentList />
    </div>
  )
}

export default PaymentsPage
