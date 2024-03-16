import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'

import { Link } from 'react-router-dom'
// import { toast}
import toast, { toastConfig } from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/success.css'
// import 'react-simple-toasts/dist/theme/info.css'

// toastConfig({ theme: 'success', position: 'top-right' })
import { toastConfigAlert, ShowToast } from '../toastConfigAlert'
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

    toastConfigAlert.theme = 'success'
    toastConfigAlert.position = 'top-right'
    ShowToast('Item successfully added to cart')
  }

  return (
    <div className=''>
      <button className='add-to-cart' onClick={() => handleAddToCart()}>
        add to cart
      </button>
    </div>
  )
}

export default AddToCart
