import React, { useEffect, useReducer, useContext } from 'react'
import axios from 'axios'
import { register_user_url } from '../utils/constants'

const initialState = {
  user_sign_in: false,
  user_sign_in_error: false,
  user: {}
}
import {
  REGISTER_BEGIN,
  REGISTER_ERROR,
  REGISTER_USER,
  REGISTER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR
} from '../actions'
//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch

export const UserContext = React.createContext()

//create  user provider

export const UserProvider = ({ children }) => {
  //pass reducer function and  initial state Object
  //TODO: import and  use user sign_in_reducer

  const [state, dispatch] = useReducer(user_reducer, initialState)

  //Hit   API end point  for        register
  const registerUser = async url => {
    try {
      dispatch({ type: REGISTER_BEGIN })
      console.log('register action Begin')
      const response = await axios.post(url)
      const registeredUser = response.data
      console.log('Register  user Success',registeredUser)
      dispatch({ type: REGISTER_SUCCESS, payload: registeredUser })
    } catch (error) {
      console.log('Register  user Error')
      dispatch({ type: REGISTER_ERROR, payload: error.message })
    }
  }
  useEffect(() => {
    registerUser(register_user_url)
  }, [])

  //Todo: add  login, logout function

  return (
    <UserContext.Provider value={{ ...state, registerUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
