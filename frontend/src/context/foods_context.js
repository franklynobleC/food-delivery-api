import axios from 'axios'
// import cookieParser from 'cookie-parser'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useAuthContext } from '../context/auth_context'
import {
  foods_url as url,
  single_food_url as single_url
} from '../utils/constants'

import {
  GET_FOODS_BEGIN,
  GET_FOODS_SUCCESS,
  GET_SINGLE_FOOD_SUCCESS,
  GET_SINGLE_FOOD_BEGIN,
  GET_SINGLE_FOOD_ERROR,
  SEARCH_FOODS,
  GET_FOODS_ERROR,
  UPDATE_SORT
} from '../actions.js'
import foods_reducer from '../reducers/foods_reducer'

//set initial state that would be passed
const initialState = {
  foods_loading: false,
  foods_error: false,
  foods: [],
  single_food_error: false,
  single_food_loading: false,
  single_food: {}
}

//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch
export const FoodsContext = React.createContext()

//creating FoodsProvider
export const FoodsProvider = ({ children }) => {
  //pass in  reducerFunction , and  initial state Object
  //TODO:create and  import foodsReducer, so  you can  use  in  this useReducerFunction
  const [state, dispatch] = useReducer(foods_reducer, initialState)
  const { token } = useAuthContext()
  const [UserToken, setUserToken] = useState('')
  const [token1, setToken] = useState('')
  //fetch Data from API   using axios

  const fetchFoods = async () => {
    const retrievedToken = localStorage.getItem('token')
    console.log('RETRIEVED TOKEN', retrievedToken)

    try {
      dispatch({ type: GET_FOODS_BEGIN })
      console.log('TOKEN CALL TO API FROM   FOODS Before GET Method', token)

      const response = await axios.get(url
      //   headers: {
      //     authorization: `Bearer ${retrievedToken}`
      //   }
      // }
      )

      const foods = await response.data
      console.log('FETCH FOODS  ', foods)
      dispatch({ type: GET_FOODS_SUCCESS, payload: foods })
    } catch (error) {
      console.log('TOKEN CALL TO API FROM   FOODS', token)

      console.log('Error fetching foods', token, error.message)
      dispatch({ type: GET_FOODS_ERROR, payload: error.message })
    }
  }
  const fetchSingleFood = async single_url => {
    dispatch({ type: GET_SINGLE_FOOD_BEGIN })
    try {
      const response = await axios.get(single_url)
      const singleFood = response.data

      dispatch({ type: GET_SINGLE_FOOD_SUCCESS, payload: singleFood })
      console.log('Single Food fetched', singleFood)
    } catch (error) {
      console.log('Single Food  Error', error.message)

      dispatch({ type: GET_SINGLE_FOOD_ERROR, payload: error.message })
    }
  }
  const updateSort = e => {
    const value = e.target.value
    console.log('Value from  sort  is', value)
    dispatch({ type: UPDATE_SORT, payload: { value } })
  }

  // if (token) {
  //     setUserToken(token)
  //   }
  useEffect(() => {

    fetchFoods()
  }, [])
  console.log('Token after Mount from  foodContext', token)

  return (
    <FoodsContext.Provider
      value={{ ...state, fetchSingleFood, updateSort, fetchFoods }}
    >
      {children}
    </FoodsContext.Provider>
  )
}

//to make  the Foods context Available Globally, export from here, make it Available
export const useFoodsContext = () => {
  return useContext(FoodsContext)
}
