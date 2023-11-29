import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Link } from 'react-router-dom'

const AddToCart = ({ food }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, cart } = useCartContext()

  const { id } = food

  const handleAddToCart = () => {
    addToCart(id, quantity, food)
 let notify = () => {
  toast.success('Item Added Successfully!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
 }
    notify()

  }

  return (
    <div className=''>

      <button className='add-to-cart' onClick={()=>handleAddToCart()}>
        add to cart 2
      </button>
    </div>
  )
}

export default AddToCart
