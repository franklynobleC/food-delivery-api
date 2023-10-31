import React from 'react'
import { FoodList } from '../components'
import { useFoodsContext } from '../context/foods_context'
import { Error } from './index'
const FoodsPage = () => {
  const { foods_error: error } = useFoodsContext()

  if (error) {
    return <Error />
  }
  return (
    <section>
      <div>
        <FoodList />
      </div>
      <article>
        <h1>Products Page</h1>
      </article>
    </section>
  )
}

export default FoodsPage
