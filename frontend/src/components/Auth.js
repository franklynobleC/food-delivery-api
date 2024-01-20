import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth_context'
import { useUserContext } from '../context/user_context'
import '../styles/user/register.css'
function Auth () {
  const { registerUser, state, email, password } = useAuthContext()
  const { is_registered, checkRegister } = useUserContext()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    password: ''
  })
  let navigate = useNavigate()
  const handleChange = event => {
    // event.preventDefault()
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
    console.log(
      'Form Values  are',
      formValues,
      formValues.name,
      formValues.email,
      formValues.phone,
      formValues.deliveryAddress,
      formValues.password
    )
  }
  const handleSubmit = e => {
    e.preventDefault()

    console.log('FROM FORM  SUBMIT>>>>.')

    registerUser(
      formValues.name,
      formValues.email,
      formValues.phone,
      formValues.deliveryAddress,
      formValues.password
    )
  }
  setTimeout(() => {
    console.log('Checking is  registered', is_registered)
    is_registered ? navigate('/login') : ''
  }, 2000)

  return (
    <form class='login-container' onSubmit={handleSubmit}>
      <div class='name-container'>
        <h2> Sign in Form</h2>
        <div class='name'></div>
        <input
          type='name'
          required
          class='name-input-text'
          placeholder='enter name'
          name='name'
          autofocus
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <div class='phone-container'>
        <input
          type='phone'
          required
          class='phone-input-text'
          placeholder='enter phone'
          autofocus
          name='phone'
          value={formValues.phone}
          onChange={handleChange}
        />
      </div>
      <div class='delivery-address-container'>
        <input
          type='text'
          required
          class='delivery-input-text'
          placeholder='enter delivery address'
          autofocus
          name='deliveryAddress'
          value={formValues.deliveryAddress}
          onChange={handleChange}
        />
      </div>
      <div class='email-container'>
        <input
          type='email'
          required
          class='email-input-text'
          placeholder='enter email'
          autofocus
          name='email'
          value={formValues.email}
          onChange={handleChange}
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
          name='password'
          value={formValues.password}
          onChange={handleChange}
        />
      </div>
      <div class='signup-container'>
        <button class='sign-up'>Sign up</button>
      </div>
      <div class='password-reset-login'>
        <Link to={{ pathname: '/login', state: { from: location.pathname } }}>
          already have an account? Login
        </Link>
        <div></div>
        {is_registered ? navigate('/login') : ''}
        <Link to='reset'>forgot password? Reset password</Link>
      </div>
      {console.log(is_registered, checkRegister)}
    </form>
  )
}
export default Auth
