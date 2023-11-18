import React, { useContext, useEffect, useState } from 'react'
import { useAuthContext } from './auth_context.js'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({})
  const { register, login, user } = useAuthContext()

  useEffect(() => {
    console.log("User from  userContext",user)
    setMyUser(user)
  }, [user])

  console.log('User1 this works', user)
  console.log('User2 this does not work', myUser)

  return (
    <UserContext.Provider value={{ myUser, register, login,user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
