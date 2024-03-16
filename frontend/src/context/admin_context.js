import React, { useEffect, useState, useContext, useReducer } from 'react'
import admin_reducer from '../reducers/admin_reducer'
import {
  all_orders_url,
  all_payments_url,
  update_food_url,
  update_user_url,
  create_food_url,
  delete_food_url,
  foods_url,
  all_users_url,
  single_order_url,
  single_user_url,
  get_all_foods_images_url
} from '../utils/constants'
import axios from 'axios'

import {
  GET_ALL_PAYMENTS_ERROR,
  GET_ALL_PAYMENTS_SUCCESS,
  GET_FOODS_ERROR,
  GET_FOODS_SUCCESS,
  UPDATE_SINGLE_FOOD,
  // SINGLE_USER_SUCCESS,

  GET_ALL_FOODS_SUCCESS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  GET_SINGLE_ORDER_ERROR,
  GET_SINGLE_ORDER_SUCCESS,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_ERROR,
  CREATE_SINGLE_FOOD_ERROR,
  CREATE_SINGLE_FOOD_SUCCESS,
  GET_IMAGES_ERROR,
  GET_IMAGES_SUCCESS
} from '../actions'
const initialState = {
  is_error: false,
  is_processed: false,
  loading: false,
  payments_error: false,
  orders_error: false,
  foods_error: false,
  users_error: false,
  users: [],
  orders: [],
  payments: [],
  order: [],
  singleUser: [],
  created_food: [],
  created_food_error: false,
  foods_images: []
}
export const AdminContext = React.createContext()

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(admin_reducer, initialState)
  const [ordersData, setOrdersData] = useState([])
  const [paymentsData, setPaymentsData] = useState([])
  const [imagesData, setImagesData] = useState([])
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

  const fetchSingleOrder = async id => {
    try {
      const singleOrderResponse = await axios.get(`${single_order_url + id}`)
      const order = await singleOrderResponse.data
      console.log(order)

      dispatch({ type: GET_SINGLE_ORDER_SUCCESS, payload: order })
    } catch (err) {
      console.log('error', err)
      dispatch({ type: GET_SINGLE_ORDER_ERROR, payload: err.message })
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
  useEffect(() => {
    const getAllFoodsImages = async () => {
      try {
        const FoodImagesResp = await axios.get(get_all_foods_images_url)
        const FoodImages = await FoodImagesResp.data
        setImagesData(FoodImages)
        console.log(FoodImages, 'all  images  Data')

        dispatch({ type: GET_IMAGES_SUCCESS, payload: FoodImages })
      } catch (err) {
        console.log(err)
        dispatch({ type: GET_IMAGES_ERROR, payload: err.message })
      }

      console.log(imagesData, 'all  images  Data')
    }
    console.log('images  called')
    getAllFoodsImages()
  }, [])

  useEffect(() => {
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

    fetchUsers()
  }, [])

  const fetchSingleUser = async id => {
    try {
      const singleUserResponse = await axios.get(single_user_url + id)
      const singleUserData = singleUserResponse.data

      dispatch({ type: SINGLE_USER_SUCCESS, payload: singleUserData })
    } catch (err) {
      console.log(err)
      dispatch({ type: SINGLE_USER_ERROR, payload: err.message })
    }
  }
  // const deleteFood = async id => {}

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

  const updateFood = async (name, description, price, image_url, id) => {
    console.log(
      'Before    backend Submit',
      name,
      description,
      price,
      image_url,
      id
    )
    try {
      const responseFood = await axios.patch(`${update_food_url + id}`, {
        name: name,
        description,
        price,
        image: image_url
      })
      const responseFoodData = await responseFood.data

      console.log('updated Food', responseFoodData)
      // dispatch({type: UPDATE_SINGLE_FOOD})
    } catch (err) {
      console.log(err)
    }
  }
  const deleteFood = async id => {
    try {
      const responseDeleteFood = await axios.delete(delete_food_url + id)
      const deletedResponse = await responseDeleteFood.data
      console.log(deletedResponse)
      console.log('success Data Deleted Successfully')
    } catch (err) {
      console.log(err, 'Error Data')
    }
  }

  const createFoods = async (name, description, price, image_url, category) => {
    try {
      const createFoods = await axios.post(create_food_url, {
        name,
        price,
        description,
        image: image_url,
        category
      })

      const createdFood = await createFoods.data
      console.log('Success sent  to DB', createdFood)
      dispatch({ type: CREATE_SINGLE_FOOD_SUCCESS, payload: createdFood })
    } catch (err) {
      console.log(err)
      dispatch({ type: CREATE_SINGLE_FOOD_ERROR, payload: err.message })
    }
  }

  //TODO: add     this use Effect to  the Admin Page  instead

  return (
    <AdminContext.Provider
      value={{
        ...state,
        fetchOrders,
        fetchPayments,
        fetchFoods,
        updateFood,
        deleteFood,
        fetchSingleOrder,
        fetchSingleUser,
        createFoods
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
