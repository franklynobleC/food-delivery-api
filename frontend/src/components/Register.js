import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/auth_context'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { BitLoader } from 'react-spinners'
import 'react-simple-toasts/dist/theme/info.css'
import 'react-simple-toasts/dist/theme/success.css'
import 'react-simple-toasts/dist/theme/sunset.css'
import 'react-simple-toasts/dist/theme/chroma.css'
import 'react-simple-toasts/dist/theme/failure.css'
import { useLocation } from 'react-router-dom'

import '../styles/foods.css'
import { BeatLoader, MoonLoader } from 'react-spinners'

import { supabaseClient } from '../config/supabaseClient'

import { toastConfigAlert, ShowToast } from '../toastConfigAlert'
import styled from 'styled-components'

const Register = () => {
  const { login, email, password, registerUser } = useAuthContext()
  const [isShow, setIsShow] = useState(false)
  const [authMode, setAuthMode] = useState('register')
  const [userRegistered, setUserRegistered] = useState(false)
  const [isUserPresent, setIsUserPresent] = useState(false)
  const [isUserFound, setIsUserFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailPresent, setIsEmailPresent] = useState(false)
  const location = useLocation()

  toastConfigAlert.theme = 'success'
  toastConfigAlert.position = 'center'

  //This  does  not Have Effect,  you can  override  this
  const override = {
    margin: '25%',
    color: 'green'
  }

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const checkUserRegistered = async email => {
    supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .then(response => {
        const { data } = response
        console.log(data)
        if (data.length > 0) {
          return setIsEmailPresent(true), setIsUserFound(true)
        } else {
          return setIsEmailPresent(false), setIsUserFound(false)
        }
      })
  }

  const handleChange = event => {
    event.preventDefault()
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value
    })
  }
  const handleRegister = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email: loginData.email,
        password: loginData.password
      })

      const { user, session } = data
      if (error) {
        const { message } = error
        if (message) {
          toastConfigAlert.theme = 'sunset'

          ShowToast('an Error occurred User Already Exist!')
          setIsLoading(false)
          return
        }
        return
      }

      if (data.user) {
        registerUser(loginData.email, loginData.password)

        setIsLoading(false)
        ShowToast('Registration successful!')
        setIsLoading(false)

        setAuthMode('login')
      } else {
        toastConfigAlert.theme = 'failure'
        setIsLoading(false)

        //TODO: IS USER  IS  NOT  FOUND  THEN THERE  MUST  BE AN ERROR DURING REGISTRATION

        ShowToast('an Error occurred from  else!')
        return
      }
    } catch (error) {
      setIsLoading(false)
      toastConfigAlert.theme = 'info'

      //TODO: IS USER  IS  NOT  FOUND  THEN THERE  MUST  BE AN ERROR DURING REGISTRATION

      ShowToast('an Error occurred!')
      return
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    setIsLoading(true)

    let data = await checkUserRegistered(loginData.email)
    console.log(data)

    try {
      supabaseClient.auth
        .signInWithPassword({
          email: loginData.email,
          password: loginData.password
        })
        .then(data => {
          console.log(data.data.user)
          const { user, session } = data.data
          setIsUserPresent(true)
          user ? setIsUserFound(true) : setIsUserFound(false)

          console.log('data', user, session)
          if (isEmailPresent === true && !user) {
            setIsUserFound(false)
            setIsLoading(false)
            console.log(isEmailPresent)
            toastConfigAlert.theme = 'failure'
            ShowToast('Invalid Credentials!')
            return
          }
          if ((!user || user === null) && isEmailPresent === false) {
            console.log('USER NOT FOUND')
            setIsUserFound(false)
            setIsLoading(false)
            toastConfigAlert.theme = 'failure'

            ShowToast('Error! user does not exist!')
            console.log('USER NOT FOUND', isEmailPresent)

            return
          }
          if (session.access_token) {
            setIsUserPresent(true)
            login(
              loginData.email,

              loginData.password
            )

            setIsLoading(false)
            ShowToast('Login successful!')

            localStorage.setItem('Access_Token', session.access_token)

            //  change  thePathsName to  '/dashboard'
            location.pathname.startsWith('/login') ||
              location.pathname.startsWith('/')
            // console.log(location.pathname)
            setTimeout(() => {
              window.history.back()
            }, 2000)
            // console.log(loData)
            // console.log(location)
          }
        })

      //TODO:  IF USER  IS  NOT  FOUND  SET eRROR MESSAGE  USER NOT FOUND  BLESS   REGISTER TO CONTINUE
      console.log(isUserPresent, isUserFound)
      isUserFound ? setIsLoading(false) : setIsLoading(false)
    } catch (error) {
      // const { stack, message } = error
      setIsLoading(false)

      console.log('error', error)

      toastConfigAlert.theme = 'info'

      //TODO: IS USER  IS  NOT  FOUND  THEN THERE  MUST  BE AN ERROR DURING REGISTRATION

      ShowToast('an Error occurred!')

      console.log('error', error)
    }
    console.log(isLoading)
  }
  return (
    <Wrapper>
      {isLoading && (
        <div className='class-spinner-container'>
          <MoonLoader
            // visible={true}
            width='5000'
            // duration='20000'
            color='#36d7b7'
            // color='green'
            font={4000}
            size={150}
            cssOverride={override}
          ></MoonLoader>
        </div>
      )}

      {authMode === 'login' ? (
        <div className='form-container'>
          <form class='login-container' onSubmit={handleLogin}>
            <div class='inside-form-div'>
              <h4> Login in Form</h4>

              <div class='email-container'>
                <div>
                  <label htmlFor=''>Email</label>
                </div>
                <input
                  type='email'
                  required
                  class='email-input-text'
                  placeholder='email'
                  autofocus
                  name='email'
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              <div class='password-container'>
                <div>
                  <label htmlFor=''>Password</label>
                </div>
                <input
                  required
                  type='password'
                  class='password-input-text'
                  placeholder='password'
                  autofocus
                  name='password'
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='submit-data'>
                Login
              </button>
              <div class='password-reset-login'></div>
            </div>
          </form>
        </div>
      ) : (
        <div className='form-container'>
          <form className='login-container' onSubmit={handleRegister}>
            <div className='inside-form-div'>
              <h4> Sign in Form</h4>
              Register Page
              <div className='email-container'>
                <div>
                  <label htmlFor=''>Email</label>
                </div>

                <input
                  type='email'
                  required
                  class='email-input-text'
                  placeholder=' email'
                  autofocus
                  name='email'
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              <div className='password-container'>
                <div>
                  <label htmlFor=''>Password</label>
                </div>
                <input
                  required
                  type='password'
                  class='password-input-text'
                  placeholder='password'
                  autofocus
                  name='password'
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
              <button type='submit' className='submit-data'>
                Register
              </button>
              <div class='password-reset-login'>Reset</div>
            </div>
          </form>
        </div>
      )}

      <div className='auth-mode'>
        <button
          className='auth-ode'
          onClick={() =>
            setAuthMode(authMode === 'login' ? 'register' : 'login')
          }
        >
          {authMode === 'login'
            ? 'Need an account? Register'
            : 'Have an account? Login'}
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .class-spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
    /* background-color: red; */
    transform: translate(-50%, -50%);
    z-index: 10; /* Ensure this is higher than the form's z-index */
    /* Optional: Add a background that covers the whole Wrapper with some transparency */
    background-color: rgba(0, 0, 0, 0.1);

    width: 100%; /* Cover the full width */
    height: 100%; /* Cover the full height */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-ode {
    color: green;
    position: relative;
    border: none;
    background-color: inherit;
    font-size: larger;
    color: #73d802;

    width: 100%;
    top: 10px;
    bottom: auto;
    right: 0;
    top: 600px;
  }

  .auth-ode:hover,
  .submit-data {
    cursor: pointer;
  }
  margin: auto;
  height: auto;
  .form-container {
    /* z-index: 1; */
    background-image: radial-gradient(#163805, #000002);

    border-radius: 5px;
  }

  div > label {
    color: whitesmoke;
  }
  .submit-data {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #4ccd99; */
    background-color: #4c8e06;
    color: whitesmoke;
    font-size: large;

    width: 40%;

    padding: 1rem;
    border: none;
    border-radius: 5px;
  }

  .inside-form-div {
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 50vw;
    height: 60vh;
  }

  .email-container {
    margin-bottom: 20px;
    padding: 10px;
  }
  .register-container {
    margin-bottom: 20px;
    padding: 10px;
  }
  div > h4 {
    color: whitesmoke;
  }
  input {
     background-color: transparent;
  border: 1px solid #cecece;
  border-radius: 5px;
  color: #e0eafc;
  padding: 8px;
  height: 35px;
  /* padding: 1.5rem; */
    /* min-width: 35vh;
    border: none;
    border-radius: 5px; */

    /* Media query for mobile devices */
    @media (max-width: 768px) and (min-width: 268px) {
      .form-container {
        /* background-color: green; */
        border-radius: 5px;
      }

      .inside-form-div {
        margin: 0 auto;
        background-color: red;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        width: 40px;
        height: 50vh;
      }
      input {
        width: 20vw;

        padding: 15px;
        padding: 1.5rem;
        border: none;
        border-radius: 5px;
      }
    }
    position: relative;
  }
`

export default Register
