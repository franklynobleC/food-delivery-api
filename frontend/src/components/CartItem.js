import React from 'react'
import '../styles/cart/cartitem.css'
import { useCartContext } from '../context/cart_context'

const CartItem = ({ name, price, description, image, quantity, id }) => {
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
      <div className='cart-item-name'>
        Name:
        <p>{name}</p>
      </div>

      <div>{description}</div>
      <div>{quantity}</div>

      <div className='cart-item-price'>Price: &#8358;{price}</div>
      <div className='remove-btn-container'>
        <button className='remove-btn' onClick={() => removeItem(id)}>
          remove item
        </button>
      </div>
    </section>
  )
}

export default CartItem
