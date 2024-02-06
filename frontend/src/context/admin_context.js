import React, { useEffect, useState, useContext, useReducer } from 'react'
import admin_reducer from '../reducers/admin_reducer'
import { all_orders_url, all_payments_url } from '../utils/constants'
import axios from 'axios'
import { FoodsContext } from './foods_context'
const initialState = {
  is_error: false,
  is_processed: false,
  loading: false,
  payments_error: false,
  orders_error: false
}
export const AdminContext = React.createContext()

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(admin_reducer, initialState)
  const [ordersData, setOrdersData] = useState([])
  const [paymentsData, setPaymentsData] = useState([])
  const fetchOrders = async () => {
    const responseOrders = await axios.get(all_orders_url)
    const responseData = await responseOrders.data
    setOrdersData(responseData)
    console.log('this  is  orders Data', ordersData)
  }

  const fetchPayments = async () => {
    const responsePayments = await axios.get(all_payments_url)

    const responsePaymentData = await responsePayments.data

    setPaymentsData(responsePaymentData)
    console.log('all  payment Data', paymentsData)
  }

    useEffect(() => {

        console.log('Use effect from admin')
    fetchPayments()

    fetchOrders()
  }, [])

  return (
    <AdminContext.Provider value={{ ...state, fetchOrders, fetchPayments }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
