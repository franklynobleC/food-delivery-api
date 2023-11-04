import axios from 'axios'

import React, { useContext, useEffect, useReducer } from 'react'

import { foods_url as url,single_food_url as single_url } from '../utils/constants'

import {
  GET_FOODS_BEGIN,
  GET_FOODS_SUCCESS,
  GET_SINGLE_FOOD_SUCCESS,
  GET_SINGLE_FOOD_BEGIN,
  GET_SINGLE_FOOD_ERROR,
  SEARCH_FOODS,
  GET_FOODS_ERROR
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
  //fetch Data from API   using axios

  const fetchFoods = async () => {
    try {
      dispatch({ type: GET_FOODS_BEGIN })
      console.log('getting Foods')

      const response = await axios.get(url)

      const foods = response.data
      console.log('getting Foods Successful')

      dispatch({ type: GET_FOODS_SUCCESS, payload: foods })
      console.log('Foods fetched', foods)
    } catch (error) {
      console.log('Error fetching foods', error.message)
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
  useEffect(() => {
    // fetchFoods(url)
    {
      /* add openSidebar here */
    }
  }, [])
  return (
    <FoodsContext.Provider value={{ ...state, fetchSingleFood }}>
      {children}
    </FoodsContext.Provider>
  )
}

//to make  the Foods context Available Globally, export from here, make it Available
export const useFoodsContext = () => {
  return useContext(FoodsContext)
}
