import React from 'react'
import '../styles/error.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className='error-page'>
        <article>
          <h3>An error occurred........</h3>
          <Link to='/' className='back-to-home-link'>
            <h4> Return to home page</h4>
          </Link>
        </article>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  color: black;
  margin: 60px;

  overflow: hidden;

  .error-page {
    overflow: hidden;
    text-align: center;
    background-color: grey;
    padding: 4rem;
    border: none;
    border-radius: 5px;
  }
  .back-to-home-link {
    text-decoration: none;
    color: white;
    font-weight: bolder;
    font-size: larger;
  }
`

export default ErrorPage
