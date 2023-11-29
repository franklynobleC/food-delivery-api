import React, { useContext, useEffect, useState } from 'react'
import { useAuthContext } from './auth_context.js'
import { useFoodsContext } from '../context/foods_context.js'
import { useNavigate } from 'react-router-dom'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({})
  const { register, login, user } = useAuthContext()
  const fetchFoods = useFoodsContext()
  // let navigate = useNavigate()

  useEffect(() => {
    console.log('User from  userContext', user)
    setMyUser(user)
  }, [user])
  const handleNavigate = () => {
    if (user || myUser) {
      console.log(
        'This  is from  the     fetching Data  if  user  is Available',
        user,
        'And  my user Data ',
        myUser
      )
      // fetchFoods()
      // navigate('/') // Use navigate to redirect to a specific path
    }
  }

  console.log('User1 this works', user)
  console.log('User2 this does not work', myUser)

  return (
    <UserContext.Provider
      value={{ myUser, register, login, user, handleNavigate }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
