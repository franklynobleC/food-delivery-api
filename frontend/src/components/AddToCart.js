import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const AddToCart = ({ food }) => {
  const [amount, setAmount] = useState(4)
  const { addToCart,cart } = useCartContext()
  const { id } = food

  return (
    <div className=''>
      <Link
        to='/cart'
        className='btn-add-to-cart'
        onClick={() => addToCart(id, amount, food)}
      >
        add to cart
      </Link>
    </div>
  )
}

export default AddToCart
