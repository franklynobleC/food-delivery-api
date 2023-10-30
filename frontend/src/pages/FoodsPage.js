import React from 'react'
import { FoodList } from '../components'

const FoodsPage = () => {
  return (
    <section>
      <div>
        {console.log('FROM FoodsPage')}
        <FoodList />
      </div>
      <article>
        <h1>Products Page</h1>
      </article>
    </section>
  )
}

export default FoodsPage
