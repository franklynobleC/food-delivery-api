/* trunk-ignore-all(prettier) */
import axios from 'axios'
// import cookieParser from 'cookie-parser'

import React, { useContext, useEffect, useReducer, useState } from 'react'

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
  single_food: {},
  is_data_fetched: false
}

//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch
export const FoodsContext = React.createContext()

//creating FoodsProvider
export const FoodsProvider = ({ children }) => {
  //pass in  reducerFunction , and  initial state Object
  //NOTE:create and  import foodsReducer, so  you can  use  in  this useReducerFunction
  const [state, dispatch] = useReducer(foods_reducer, initialState)
  // const { token } = useAuthContext()
  const [userTokenData, setUserToken] = useState(null)
  const [foodsData, setFoodsData] = useState([])

  //fetch Data from API   using axios

  const fetchFoods = async () => {
    //NOTE: convert  to  valid  json String Object: this would   would enable  possible read from  the Backend;
    // if   allocated directly without  using  JSON.parse, it would  read "null"from  the  backend

    // let retrievedToken = JSON.parse(localStorage.getItem('token'))

    try {
      dispatch({ type: GET_FOODS_BEGIN })

      // console.log(configuration)
      const response = await axios.get(url)

      const foods = await response.data
      console.log('FETCH FOODS  ', foods)
      setFoodsData(foods)
      dispatch({ type: GET_FOODS_SUCCESS, payload: foods })
    } catch (error) {
      console.log('TOKEN CALL TO API FROM   FOODS')

      console.log('Error fetching foods', error.message)
      dispatch({ type: GET_FOODS_ERROR, payload: error.message })
    }
  }
  useEffect(() => {
    fetchFoods()
  }, [userTokenData])
  //end here

  const fetchSingleFood = async id => {
    dispatch({ type: GET_SINGLE_FOOD_BEGIN })
    try {
      const response = await axios.get(single_url + id)
      const singleFood = response.data

      dispatch({ type: GET_SINGLE_FOOD_SUCCESS, payload: singleFood })
      console.log('Single Food fetched', singleFood)
    } catch (error) {
      console.log('Single Food  Error', error.message)

      dispatch({ type: GET_SINGLE_FOOD_ERROR, payload: error.message })
    }
  }
    //    useEffect(() => {
    //       }, [id])
    // }
    // fetchSingleFood(id)

  const updateSort = e => {
    const value = e.target.value
    console.log('Value from  sort  is', value)
    dispatch({ type: UPDATE_SORT, payload: { value } })
  }

  console.log(
    'Token after Mount from  foodContext ',

    'USERtOKEN IS',
    userTokenData
  )

  return (
    <FoodsContext.Provider
      value={{ ...state, fetchSingleFood, fetchFoods, updateSort, foodsData }}
    >
      {children}
    </FoodsContext.Provider>
  )
}

//to make  the Foods context Available Globally, export from here, make it Available
export const useFoodsContext = () => {
  return useContext(FoodsContext)
}
