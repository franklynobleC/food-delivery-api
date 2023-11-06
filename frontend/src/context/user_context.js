import React, { useContext, useEffect, useState } from 'react'
import { useAuthContext } from './auth_context.js'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const { register, login, user } = useAuthContext()
  const [myUser, setMyUser] = useState(null)

  useEffect(() => {
    setMyUser(user)
  }, [user])
  console.log('myUser', myUser)
  console.log('User', user)

  return (
    <UserContext.Provider value={{ myUser, register, login,user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
