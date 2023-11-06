import axios from 'axios'

import React, { useContext, useEffect, useReducer } from 'react'
import { create_orders_url } from '../utils/constants'
import cart_reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  CREATE_ORDER,
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR
} from '../actions'
const initialState = {
  cart: [],
  total_quantity: 0,
  total_price: 0,
  payment_option: 'cash',
  delivery_fee: 0,
  is_order_created_success: false,
  is_order_error: false,
  is_loading: false
}

// In   Context  is a feature that allows you to
//  share data between components without passing it
//  through intermediate components explicitly.It
//  provides a way to pass data down the component
//  tree without the need for prop drilling.
const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_reducer, initialState)

  //add to  cart function
  const addToCart = (id, amount, food) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, food } })
  }
  //remove an  item from  cart
  const removeItem = id => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
  //clear  the entire  cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }
  const createOrder = async (cart, id, delivery_fee) => {
    dispatch({ type: CREATE_ORDER_BEGIN })
    console.log(
      'THIS IS FROM CREAT ORDER  POST REQUEEST  TO BACKEND',
      cart,
      id,
      delivery_fee
    )
    console.log('ABOVE DETAILS FOR  CREATED ORDER BEGIN!!')

    try {
      const response = await axios.post(create_orders_url, {
        _id: id,
        OrderItems: cart,

        deliveryFee: delivery_fee
      })
      const createdOrder = await response.data
      console.log('CREATED ORDER SUCCESS')
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: createdOrder })
    } catch (error) {
      console.log('CREATE ORDERS ERROR')
      console.log(error)
      dispatch({
        type: CREATE_ORDER_ERROR,
        payload: error.response.data.message
      })
    }
  }
  // useEffect(() => {
  //   createOrder()
  // }, [])
  // this would be implemented when  the components loads(when  the Page  loads)
  useEffect(() => {
    //dispatch this when  component mounts
    dispatch({ type: COUNT_CART_TOTALS })
    //also, adding  to  the Dependency array, so it would remount when  item  in  the component  is changed
  }, [state.cart, state.order])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeItem, createOrder }}
    >
      {children}
    </CartContext.Provider>
  )
}

//
export const useCartContext = () => {
  return useContext(CartContext)
}
