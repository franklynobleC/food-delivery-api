import React, { useState } from 'react'
import { FoodList } from '../components'
import { useFoodsContext } from '../context/foods_context'
import { useAuthContext } from '../context/auth_context'
import { Error } from './index'
const FoodsPage = () => {
  const { foods_error: error } = useFoodsContext()
  const { is_logged_in, user, token } = useAuthContext()
  const [UserToken, setUserToken] = useState(null)

  return (
    <section>
      <article>
        {console.log("EMPTY PRODUCTS PAGE",user)}
        <FoodList />
        <h1>Products Page</h1>
      </article>
    </section>
  )

  // if (error) {
  //   return <Error />
  // }
}

export default FoodsPage
