import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/products.css'

const ListView = ({ foods }) => {
  return (
    <section className='main'>
      {foods.map(food => {
        const { name, price, image, id, description } = food
        return (
          <div className='food-container'>
            <div key={id} className='food-image-container'>
              <img src={image} alt={name} className='food-image' />
            </div>
            <div className='food-name'>
              <h4>{name}</h4>
            </div>
            <div className='food-price'>{price}</div>
            <div className='food-description'>
              {description.substring(0, 150)}...
            </div>
            <div className='details-link'>
              <Link to={`/foods/${id}`} className='btn'>
                Details
              </Link>
            </div>
            <div class='food-spacer'></div>
          </div>
        )
      })}
    </section>
  )
}
export default ListView
