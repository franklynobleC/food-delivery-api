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
  // const { token } = useAuthContext()
  const [userToken, setUserToken] = useState(null)

  //fetch Data from API   using axios

  const fetchFoods = async () => {
    // const fetchFoods = async () => {

    let retrievedToken = JSON.parse(localStorage.getItem('token'))
    let userToken = retrievedToken.token
    console.log('RETRIEVED TOKEN', retrievedToken, userToken)

    try {
      dispatch({ type: GET_FOODS_BEGIN })
      console.log('TOKEN CALL TO API FROM   FOODS Before GET Method')

      console.log(retrievedToken)
      setUserToken(userToken)

      // const headers = {'Content-Type': 'application/json', authorization:`Bearer${userToken}` }
      console.log(
        'Data being sent to foods API',
retrievedToken,
        'USERtOKEN  IS',
        userToken
      )
      const configuration = {
        method: 'GET',
        url: url,
        headers: {
          Authorization: `Bearer ${retrievedToken}`,

        }
      }
      console.log(userToken)
      console.log(configuration)
      const response = await axios(configuration)
      // console.log(configuration)

      // console.log('TOKEN  IN TO  FOODS coNTEXTS', token)

      const foods = response.data
      console.log('FETCH FOODS  ', foods)
      dispatch({ type: GET_FOODS_SUCCESS, payload: foods })
    } catch (error) {
      console.log('TOKEN CALL TO API FROM   FOODS')

      console.log('Error fetching foods', error.message)
      dispatch({ type: GET_FOODS_ERROR, payload: error.message })
    }
  }
  useEffect(() => {
    if (userToken) {
      setUserToken(userToken)

      fetchFoods()
    }
  }, [userToken])
  //end here
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
  // useEffect(() => {
  //   // if (userToken) {
  //   //   setUserToken(userToken)
  //   //   fetchFoods()
  //   // }
  //   // fetchFoods()
  // }, [userToken])
  console.log(
    'Token after Mount from  foodContext ',

    'USERtOKEN IS',
    userToken
  )

  return (
    <FoodsContext.Provider
      value={{ ...state, fetchSingleFood, fetchFoods, updateSort }}
    >
      {children}
    </FoodsContext.Provider>
  )
}

//to make  the Foods context Available Globally, export from here, make it Available
export const useFoodsContext = () => {
  return useContext(FoodsContext)
}
