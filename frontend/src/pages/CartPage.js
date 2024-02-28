import React from 'react'
import { useCartContext } from '../context/cart_context'
import useCartContent from '../components/CartContent'
import { CartContent } from '../components/'
// import '../styles/cart/cartpage.css'
import styled from 'styled-components'

const CartPage = () => {
  return (
    <main>
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.main`
  max-width: 150vh;
  margin: 0 auto;
  max-height: 1500px;
  background-color: black;

  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
