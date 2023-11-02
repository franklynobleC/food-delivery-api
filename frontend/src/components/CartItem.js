import React from 'react'
import '../styles/cart/cartitem.css'
import { useCartContext } from '../context/cart_context'

const CartItem = ({ name, price, description, image,id }) => {
  const { removeItem } = useCartContext()
  {
    /* const {name, price, description,  image} = food
     */
  }
  return (
    <section className='cart-item-container'>
      <div className='cart-item-image-container'>
        <img src={image} alt={name} className='cart-image' />
      </div>
      <div className='cart-item-name'>Name:{name}</div>

      <div>{description}</div>

      <div className='cart-item-price'>Price: &#8358;{price}</div>
      <button className='remove-btn' onClick={() => removeItem(id)}>
        remove item
      </button>
    </section>
  )
}

export default CartItem
