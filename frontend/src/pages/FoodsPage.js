import React, { useEffect, useState, CSSProperties } from 'react'
import { DotLoader, BeatLoader, ClipLoader } from 'react-spinners'
import { FoodList } from '../components'
import { useFoodsContext } from '../context/foods_context'
import { useAuthContext } from '../context/auth_context'
import { Error } from './index'
import '../styles/foods.css'

const FoodsPage = () => {
  const { foods_error: error, foods, foods_loading } = useFoodsContext()

  const { is_logged_in, user, token } = useAuthContext()
  const [UserToken, setUserToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const override = {
    // display: 'block',
    margin: '25%',
    // marginRight: '50px',

    Color: 'green'
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section>
      <article>
        {console.log('EMPTY PRODUCTS PAGE', user)}
        {isLoading ? (
          <div className='class-spinner-container'>
                   <div className='spinner-message'>loading please wait ..</div>
            <BeatLoader cssOverride={override} size={30} color='#36d7b7' className='spinner-component' />
          </div>
        ) : (
          <FoodList />
        )}
        <h1>Products Page</h1>
      </article>
    </section>
  )
}

export default FoodsPage
