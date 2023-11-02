import React from 'react'
import '../styles/cart/cartitem.css'

const CartItem = ({ name, price, description, image }) => {
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
    </section>
  )
}

export default CartItem
