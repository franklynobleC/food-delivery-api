import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import AlertMessage from '../config/AlertMessage'
import { Link } from 'react-router-dom'

import toast, { toastConfig } from 'react-simple-toasts'
// import 'react-simple-toasts/dist/theme/success.css'

// toastConfig({ theme: 'success', position: 'top-right' })

const AddToCart = ({ food }) => {
  const { addToCart, cart, _id } = useCartContext()

  const [quantity, setQuantity] = useState(1)
  const [isAlert, setIsAlert] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    const { _id } = food
    // console.log('THIS IS  FROM FOOD   ADD TO CART', food)
    addToCart(_id, quantity, food)
    setIsAdded(true)

    toast('Item successfully added to cart')
  }

  return (
    <div className=''>
      <button className='add-to-cart' onClick={() => handleAddToCart()}>
        add to cart 2
      </button>
      {isAdded && (
        <AlertMessage toastTheme={'info item add'} message={'item added'} />
      )}
    </div>
  )
}

export default AddToCart
