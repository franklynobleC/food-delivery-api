import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SingleFood = ({ image, price, id, name }) => {
  return (
    <section>
      <div>
        <img src={image} alt={name} />

        <Link to={`/foods/${id}`} className='link'>
        </Link>
        <FaSearch/>
      </div>
      <footer >
        <h5>{name}</h5>
        <p>{ price}</p>
      </footer>
        <p>Single Product Page</p>
    </section>
  )
}
export default SingleFood
