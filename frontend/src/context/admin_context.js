import React, { useEffect, useState, useContext, useReducer } from 'react'
import admin_reducer from '../reducers/admin_reducer'
import {
  all_orders_url,
  all_payments_url,
  update_food_url,
  update_user_url,
  delete_food_url,
  foods_url,
  all_users_url
} from '../utils/constants'
import axios from 'axios'
import { FoodsContext } from './foods_context'
import {
  GET_ALL_PAYMENTS_ERROR,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_FOODS_ERROR,
  GET_FOODS_SUCCESS,
  UPDATE_SINGLE_FOOD,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR
} from '../actions'
const initialState = {
  is_error: false,
  is_processed: false,
  loading: false,
  payments_error: false,
  orders_error: false,
  foods_error: false,
users_error:false,
  orders: [],
  payments: [],
  users: []
}
export const AdminContext = React.createContext()

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(admin_reducer, initialState)
  const [ordersData, setOrdersData] = useState([])
  const [paymentsData, setPaymentsData] = useState([])
  const fetchOrders = async () => {
    try {
      const responseOrders = await axios.get(all_orders_url)
      const orders = await responseOrders.data
      console.log(orders)
      setOrdersData(orders)
      console.log('this  is  orders Data', ordersData)
      dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: orders })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchFoods = async () => {
    try {
      const foodsResponse = await axios.get(foods_url)

      const foods = await foodsResponse.data
      console.log(foods)
      dispatch({ type: GET_ALL_FOODS_SUCCESS, payload: foods })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_FOODS_ERROR, payload: err.message })
    }
  }
  const fetchUsers = async () => {
    try {
      const userResponse = await axios.get(all_users_url)
      const users = await userResponse.data
      console.log(users)
      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: users })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_ALL_USERS_ERROR, payload: err.message })
    }
  }

  const fetchPayments = async () => {
    try {
      const responsePayments = await axios.get(all_payments_url)

      const payments = await responsePayments.data

      console.log(payments)
      setPaymentsData(payments)
      console.log('all  payment Data', paymentsData)
      dispatch({ type: GET_ALL_PAYMENTS_SUCCESS, payload: payments })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_ALL_PAYMENTS_ERROR, payload: err.message })
    }
  }

  const updateFood = async id => {
    try {
      const responseFood = await axios.patch(update_food_url + id)
      const responseFoodData = await responseFood.data

      console.log(responseFoodData)
      // dispatch({type: UPDATE_SINGLE_FOOD})
    } catch (err) {
      console.log(err)
    }
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
    fetchUsers()
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
