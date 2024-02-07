import React, { useEffect, useState, useContext, useReducer } from 'react'
import admin_reducer from '../reducers/admin_reducer'
import {
  all_orders_url,
  all_payments_url,
  update_food_url,
  update_user_url,
  delete_food_url
} from '../utils/constants'
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
  const [ordersData, setOrdersData] = useState({})
  const [paymentsData, setPaymentsData] = useState([])
  const fetchOrders = async () => {
    const responseOrders = await axios.get(all_orders_url)
    const responseData = await responseOrders.data
    console.log(responseData)
    setOrdersData(responseData)
    console.log('this  is  orders Data', ordersData)
  }

  const fetchFoods = async () => {
    const foodsResponse = await axios.get(all_orders_url)

    const foodData = await foodsResponse.data
    console.log(foodData)
  }

  const fetchPayments = async () => {
    const responsePayments = await axios.get(all_payments_url)

    const responsePaymentData = await responsePayments.data

    setPaymentsData(responsePaymentData)
    console.log('all  payment Data', paymentsData)
  }

  const updateFood = async id => {
    const responseFood = await axios.patch(update_food_url + id)
    const responseFoodData = await responseFood.data

    console.log(responseFoodData)
  }
  const deleteFood = async id => {
    const responseDeleteFood = await axios.delete(delete_food_url + id)
    const deletedResponse = await responseDeleteFood.data
    console.log(deletedResponse)
  }

  useEffect(() => {
    console.log('Use effect from admin')
    fetchPayments()
    fetchFoods()
    fetchOrders()
  }, [])

  return (
    <AdminContext.Provider
      value={{
        ...state,
        fetchOrders,
        fetchPayments,
        fetchFoods,
        updateFood,
        deleteFood
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
