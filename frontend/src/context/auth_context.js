import React, { useEffect, useReducer, useContext, useState } from 'react'
import axios from 'axios'
import {
  register_user_url,
  login_user_url,
  logout_user_url
} from '../utils/constants'
import auth_reducer from '../reducers/auth_reducer'
// import { useFoodsContext } from '../context/foods_context'
import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER,
  LOGOUT_USER_ERROR
} from '../actions'

const initialState = {
  is_registered: false,
  register_error: false,
  register_loading: false,
  is_logged_in: false,
  is_authenticated: false,
  is_error: false,
  loading: false,
  email: '',
  password: '',
  user: {}
}

//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch

export const AuthContext = React.createContext()

//create  user provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  // const { fetchFoods } = useFoodsContext()

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

      console.log('Register  SucceSS AFTER  RESPONSE FROM  CONTEXT')
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
      const response = await axios.post(
        login_user_url,

        { email: email, password: password }
      )

      const userLoginData = response.data

      console.log(userLoginData, 'RAW DATA FROM RESPONSE')
      const { token, tokenUser } = await userLoginData
      let retrievedToken = localStorage.setItem('token', JSON.stringify(token))
      setToken(retrievedToken)

      // setToken(token)
      setUser(tokenUser)

      console.log('LOGIN SUCCESS FROM  USER 1', tokenUser, 'tokenUser', token)
      console.log('LOGIN SUCCESS FROM  USER 2', token, user)

      console.log('call foods Context Here')

      dispatch({ type: LOGIN_USER_SUCCESS, payload: userLoginData })
    } catch (err) {
      console.log('LOGIN ERROR CONTEXT')

      dispatch({ type: LOGIN_USER_ERROR, payload: err.message })
    }
  }

  //CALL  THIS  METHOD  IN  THE  COMPONENT  TO  LOGOUT
  const logoutUser = async () => {
    try {
      const response = await axios.get(logout_user_url)

      const payloadData = await response.data
      console.log(payloadData)
      console.log('LOG OUT SUCCESS')
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      dispatch({ type: LOGOUT_USER_SUCCESS, payload: payloadData })
    } catch (error) {
      console.log('LOG OUT eRROR')

      dispatch({ type: LOGOUT_USER_ERROR, payload: error.message })
    }
  }
  useEffect(() => {}, [state.email, state.password, token, user])

  //TODO: add  login, logout function

  return (
    <AuthContext.Provider
      value={{ ...state, registerUser, loginUser, logoutUser, token, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
