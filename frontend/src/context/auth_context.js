import React, { useEffect, useReducer, useContext, useState } from 'react'
import axios from 'axios'
import { register_user_url, login_user_url } from '../utils/constants'
import auth_reducer from '../reducers/auth_reducer'

import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER
} from '../actions'

const initialState = {
  is_registered: false,
  register_error: false,
  register_loading: false,
  is_logged_in: false,
  isAuthenticated: false,
  error: false,
  loading: false,
  email: '',
  password: '',
  user: {},
  token: ''
}

//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch
export const token = JSON.parse(localStorage.getItem('token'))
export const AuthContext = React.createContext()
//create  user provider
export const AuthProvider = ({ children }) => {
  //pass reducer function and  initial state Object
  //TODO: import and  use user sign_in_reducer

  const [state, dispatch] = useReducer(auth_reducer, initialState)

  //Hit   API end point  for        register
  const registerUser = async (email, password) => {
    try {
      dispatch({ type: REGISTER_USER })
      console.log('register action Begin')
      console.log(
        'FROM USER  CONTEXT!!!!!!',
        'EMAIL!!',
        email,
        'PASSWORD',
        password
      )
      console.log(email, password, 'FROM   REGISTER CONTEXT>>>>>')

      const response = await axios.post(register_user_url, {
        email: email,
        password: password
      })
      const registeredUser = await response.data

      console.log('Register  SucceSSSS AFTER  RESPONSE FROM  CONTEXT')
      dispatch({ type: REGISTER_SUCCESS, payload: registeredUser })
    } catch (error) {
      console.log(
        'FROM  REGISTER CONTEXT, ERROR, NOT!! SUCCESSFUL',
        error.message
      )
      dispatch({ type: REGISTER_ERROR, payload: error.message })
    }
  }

  const loginUser = async (email, password) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const response = await axios.post(login_user_url, {
        email: email,
        password: password
      })

      const userLoginData = await response.data
      console.log(userLoginData, 'RAW DATA FROM RESPONSE')
      // localStorage.setItem('token', JSON.stringify(userLoginData.token))
      // const { token } = await userLoginData

      dispatch({ type: LOGIN_USER_SUCCESS, payload: userLoginData })
    } catch (err) {
      console.log('LOGIN ERROR CONTEXT')

      dispatch({ type: LOGIN_USER_ERROR, payload: err.message })
    }
  }
  useEffect(() => {}, [state.email, state.password])
  useEffect(() => {})
  // const setUserDataNameAndPassword = userData => {

  // }

  //Todo: add  login, logout function

  return (
    <AuthContext.Provider value={{ ...state, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
