import React from 'react'

const CartItem = ({ name, price, description, image }) => {
  {
    /* const {name, price, description,  image} = food
     */
  }
  return (
    <section>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        <h5>{name}</h5>
      </div>
      <div>
        <h5>{price}</h5>
      </div>
    </section>
  )
}

export default CartItem
