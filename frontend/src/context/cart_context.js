import axios from 'axios'

import React, { useContext, useEffect, useReducer } from 'react'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  COUNT_CART_TOTALS
} from '../actions'
const initialState = {
  cart: [],
  total_quantity: 0,
  total_price: 0,
  payment_option: 'cash',
  delivery_fee: 20
}

// In   Context  is a feature that allows you to
//  share data between components without passing it
//  through intermediate components explicitly.It
//  provides a way to pass data down the component
//  tree without the need for prop drilling.
const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [useState, dispatch] = useReducer(reducer, initialState)

  //add to  cart function
  const addToCart = (id, food) => {
    dispatch({ type: ADD_TO_CART, payload: { id, food } })
  }
  //remove an  item from  cart
  const removeItem = id => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
  //clear  the entire  cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  useEffect(() => {
    //dispatch this when  component mounts
    dispatch({ type: COUNT_CART_TOTALS })
    //also, adding  to  the Dependency array, so it would remount when  item  in  the component  is changed
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

//
export const useCartContext = () => {
  return useCartContext(CartContext)
}
