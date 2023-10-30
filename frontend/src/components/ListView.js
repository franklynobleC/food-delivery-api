import React from 'react'
import { Link } from 'react-router-dom'
const ListView = ({ foods }) => {
  return (
    <>
      {foods.map(food => {
        const { name, price, image, id, description } = food
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5>{price}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/foods/${id}`} className='btn'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </>
  )
}
export default ListView
