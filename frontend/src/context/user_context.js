import React, { useContext, useEffect, useState } from 'react'
import { useAuthContext } from './auth_context.js'
import { useFoodsContext } from '../context/foods_context.js'
import { useNavigate } from 'react-router-dom'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({})
  const { register, login, user } = useAuthContext()
  const { registerUser, state, email, password, is_registered } =
    useAuthContext()
  const [checkRegister, setCheckRegister] = useState(is_registered)

  const fetchFoods = useFoodsContext()
  // let navigate = useNavigate()

  useEffect(() => {
    console.log('User from  userContext', user)
    setMyUser(user)
    if (is_registered) {
      setCheckRegister(true)
    }
  }, [user, is_registered])
  const handleNavigate = () => {
    if (user || myUser) {
      console.log(
        'This  is from  the     fetching Data  if  user  is Available',
        user,
        'And  my user Data ',
        myUser,
        'CHECkING  IS REGISTERED',
        is_registered,
        'CHECK rEGISTER VARIABLE',
        checkRegister
      )
      // fetchFoods()
      // navigate('/') // Use navigate to redirect to a specific path
    }
  }
  console.log(
    'CHECkING  IS REGISTERED',
    is_registered,
    'CHECK rEGISTER VARIABLE',
    checkRegister
  )

  console.log('User1 this works', user)
  console.log('User2 this does not work', myUser)

  return (
    <UserContext.Provider
      value={{
        myUser,
        register,
        login,
        user,
        handleNavigate,
        checkRegister,
        is_registered
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
