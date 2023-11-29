import React, { useEffect, useState } from 'react'
import {  } from 'react-router-dom'
import { useAuthContext, token } from '../context/auth_context'

import { useFoodsContext } from '../context/foods_context'
import { Cart, Foods } from '../pages'
import { Link, Redirect, useNavigate } from 'react-router-dom'
import { DotLoader } from 'react-spinners'

const Login = () => {
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    loginUser,
    is_registered,
    is_logged_in,
    userId,
    is_error,
    is_authenticated,
    token,

    user
  } = useAuthContext()
  const { fetchFoods, foods_loading } = useFoodsContext()

  // let navigate = useNavigate()

  useEffect(() => {}, [userEmail, userPassword, is_error, is_logged_in])

  const handleSubmit = e => {
    e.preventDefault()
    console.log(userPassword, userEmail)
    loginUser(userEmail, userPassword)

  }

  return (
    <form class='login-container' onSubmit={handleSubmit}>
      <div class='email-container'>
        <h2> Login </h2>
        <div class='email'></div>
        <input
          type='email'
          class='email-input-text'
          placeholder='enter email'
          autofocus
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
      </div>
      <div class='password-container'>
        <div class='password'></div>
        <input
          type='text'
          class='password-input-text'
          placeholder='enter password'
          autofocus
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
        />
      </div>
      <div class='signup-container'>
        <button class='sign-up' type='submit'>
          Login
        </button>
      </div>
      <div class='password-reset-login'>
        <a href='/'>Home page</a>

        <a href='./index.html'> forgot password? Reset password</a>
      </div>
    </form>
  )
}

export default Login
