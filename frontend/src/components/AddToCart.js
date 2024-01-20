import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
// import  { cloneElement } from 'react-toastify'

import { Link } from 'react-router-dom'

//for  react  alert

import toast, { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/success.css'
toastConfig({ theme: 'success', position: 'top-right' })

const AddToCart = ({ food }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, cart } = useCartContext()
  const [isAlert, setIsAlert] = useState(false)

  const handleAddToCart = () => {
    addToCart(id, quantity, food)
    toast('Item successfully added to cart ')
  }

  return (
    <div className=''>
      <button className='add-to-cart' onClick={() => handleAddToCart()}>
        add to cart 2
      </button>
    </div>
  )
}

export default AddToCart
