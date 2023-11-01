import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'

const AddToCart = ({ food }) => {
  const { addToCart } = useCartContext()
  const { id } = food

  return (
    <div>
      <Link to='/cart'>
        className='btn-add-to-cart'
        {onClick(() => addToCart(id, food))}
        add to cart
      </Link>
    </div>
  )
}

export default AddToCart
