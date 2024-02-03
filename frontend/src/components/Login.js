import React, { useEffect, useState } from 'react'

import { useAuthContext, token } from '../context/auth_context'

import { useFoodsContext } from '../context/foods_context'
import { Cart, Foods } from '../pages'
import { Link, Redirect, useNavigate, useLocation } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'

const Login = () => {
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let navigate = useNavigate()
  const location = useLocation()

  // const [previousPage, setPreviousPage] = useState(window.location.href)
  // let navigate = useNavigate()

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

  const handleSubmit = e => {
    e.preventDefault()
    console.log(userPassword, userEmail)
    loginUser(userEmail, userPassword)
    navigate(-1)

  }
  useEffect(() => {
    let timeCheck = setTimeout(() => {
      // fetchFoods()
  // navigate(-1)

    }, 2000)
    return () => clearTimeout(timeCheck)
  }, [userEmail, userPassword, is_error, is_logged_in])
  if (is_logged_in) {
    return (
      <div>
        <ScaleLoader />
      </div>
    )
  } else {
    return (
      <div>
        <form class='login-container' onSubmit={handleSubmit}>
          <div class='email-container'>
            <h2> Login </h2>
            <div class='email'></div>
            <input
              required
              type='email'
              class='email-input-text'
              placeholder='enter email'
              autofocus
              value={userEmail}
              name='userEmail'
              onChange={e => setUserEmail(e.target.value)}
            />
          </div>
          <div class='password-container'>
            <div class='password'></div>
            <input
              required
              type='text'
              class='password-input-text'
              placeholder='enter password'
              autofocus
              value={userPassword}
              name='userPassword'
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

            <Link to='/passwordReset'>forgot password? Reset password</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
