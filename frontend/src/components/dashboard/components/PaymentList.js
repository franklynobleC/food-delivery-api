import React, { useEffect } from 'react'
import { useAdminContext } from '../../../context/admin_context'
import '../../../styles/admindashboard/payments.css'
const PaymentList = () => {
  const { fetchPayments, payments } = useAdminContext()
  useEffect(() => {
    fetchPayments()
    console.log('fetching payments')
  }, [])

  return (
    <div className='payments-div'>
<div>
  <h2>ALL PAYMENTS</h2>
</div>

      <div className='payment-header-container'>
        <div className='main-header-content'>Payment ID</div>
        <div className='main-header-content'>Payment Status</div>
        <div className='main-header-content'>Food Amount</div>
      </div>
      {payments.map((paymentData, index) => (
        <div key={index} className='payment-content-container'>
          <div className='content'>{paymentData._id}</div>
          <div className='content'>{paymentData.paymentStatus}</div>
          <div className='content'>{paymentData.amount + 'ite'}</div>
          <div className='btn-dashboard-payment'>
            <div>
              <button className='edit'>update</button>
            </div>
            <div>
              <button className='delete'>delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PaymentList
