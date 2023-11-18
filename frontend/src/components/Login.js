import React, { useState } from 'react'
import { useAuthContext, token } from '../context/auth_context'
import { useFoodsContext } from '../context/foods_context'
import { Cart, Foods } from '../pages'
import { Link, Redirect, useNavigate } from 'react-router-dom'

const Login = () => {
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  // const tokenCookie = useCookies('token')
  // console.log(tokenCookie, 'TOKEN COOKIE')

  // const [tokenSet, setToken] = useState(null)
  const {
    loginUser,
    is_registered,
    is_logged_in,
    userId,
    isAuthenticated,
    token,

    user
  } = useAuthContext()
  const { fetchFoods } = useFoodsContext()

  // const history = useHistory()
  let navigate = useNavigate()
  console.log('Before  LOGIN', token, 'USER DATA  IS')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(userPassword, userEmail)

    loginUser(userEmail, userPassword)

    // setTimeout(() => {
      // fetchFoods()
    // }, 3000)
    // console.log('AFTER  LOGIN', token)
    navigate('/foods')
  }
  console.log(is_logged_in)
  console.log('from user loggedIn Data WITH USER ID', userId)

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
        <div></div>
        <a href='./index.html'> forgot password? Reset password</a>
      </div>
    </form>
  )
}

export default Login
