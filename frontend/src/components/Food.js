import React from 'react'
import { FaSearch } from 'react-icons/fa'

import { Link } from 'react-router-dom'

const Food = ({ name, image, id, price }) => {
  return (
    <div>
      <article>
        <img src={image} alt={name} />
        <Link to={`/foods/${id}`} className='link'>
          <FaSearch />
        </Link>
      </article>
      <footer>
        <h6>{name}</h6>
        <p>{price}</p>
      </footer>
    </div>
  )
}

export default Food
