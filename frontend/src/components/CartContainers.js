import React from 'react'
import CartItem from './CartItem'

const cart = {
  items: [
    {
      id: 1,
      name: 'pizza',
      price: 10,
      quantity: 1
    },
    {
      id: 2,
      name: 'pizza',
      price: 10,
      quantity: 1
    }
  ]
}
const CartContainer = () => {
  if (cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>

          <h4 className='empty-cart'>is currently empty </h4>
        </header>
      </section>
    )

    return (
      <section className='cart'>
        {/* cart header */}
        {cart.items}
        <header>
          <h2>your bag</h2>
        </header>
        {/*  cart  items */}
      </section>
    )
  }
}

export default CartContainer
