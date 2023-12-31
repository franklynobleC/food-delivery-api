import React, { useEffect, useReducer, useContext, useState } from 'react'
import axios from 'axios'
import {
  register_user_url,
  login_user_url,
  logout_user_url,
  single_user_url,
  update_user_url
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
  LOGOUT_USER_ERROR,
  GET_SINGLE_USER_BEGIN,
  SINGLE_USER_ERROR,
  SINGLE_USER_SUCCESS,
  REGISTER_USER_BEGIN
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
  user: {},
  single_userInfoError: false,
  single_userInfoLoading: false,
  single_userInfo: '',
  userInfo_name: '',
  user_email: ''
}

//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch

export const AuthContext = React.createContext()

//create  user provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState({})
  // const { fetchFoods } = useFoodsContext()

  //pass reducer function and  initial state Object
  //TODO: import and  use user sign_in_reducer

  const [state, dispatch] = useReducer(auth_reducer, initialState)

  //Hit   API end point  for        register
  const registerUser = async (
    name,
    email,
    phone,
    deliveryAddress,
    password
  ) => {
    try {
      dispatch({ type: REGISTER_USER_BEGIN })
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
        name: name,
        email: email,
        password: password,
        phone: phone,
        deliveryAddress: deliveryAddress
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

      const userLoginData = await response.data

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
  const updateUser = async (userId, name, email, address) => {
    try {
      const configuration = {
        method: 'patch',
        url: update_user_url + userId,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        data: {
          name: name,
          email: email,
          deliveryAddress: address
        }
      }

      const response = await axios(configuration)

      const userUpdatedData = await response.data
      console.log('Raw Data from Updated  request', userUpdatedData)
    } catch (error) {
      console.log(error)
    }
  }
  const getSingleUser = async userId => {
    dispatch({ type: GET_SINGLE_USER_BEGIN })
    try {
      const response = await axios.get(single_user_url + userId)
      const userData = await response.data
      setUserInfo(userData)
      console.log('USER  INFO  IS', userInfo)

      dispatch({ type: SINGLE_USER_SUCCESS, payload: userData })
      console.log(userData, 'RAW DATA FROM RESPONSE')
    } catch (error) {
      console.log(error)
      dispatch({ type: SINGLE_USER_ERROR, payload: error })
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
  useEffect(() => {}, [
    state.email,
    state.password,
    token,
    user,
    JSON.stringify(localStorage.getItem('token'))
  ])

  //TODO: add  login, logout function

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        token,
        user,
        getSingleUser,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
