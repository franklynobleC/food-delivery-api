import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const AddToCart = ({ food }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, cart } = useCartContext()

  const { id,  } = food

  return (
    <div className=''>
      {console.log("from add to cart QUant",quantity)}
      <Link
        to='/cart'
        className='btn-add-to-cart'
        onClick={() => addToCart(id, quantity, food)}
      >
        add to cart 2
      </Link>
    </div>
  )
}

export default AddToCart
