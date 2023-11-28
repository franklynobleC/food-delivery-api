import React from 'react'
import '../styles/error.css'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <article>
        <h3>Errors Page.......</h3>;
        <Link to='/' className='back-to-home-link'>
          Back to home
        </Link>
      </article>
    </div>
  )
}

export default ErrorPage
