import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import CartTotal from './CartTotal'
import '../styles/cart/cartcontent.css'
import OrderSummary from './OrderSummary'
import { checkToken } from '../utils/constants'
import styled from '@emotion/styled'

const CartContent = () => {
  const { cart, clearCart } = useCartContext()
  const { is_logged_in } = useAuthContext()

  // pass the cart  item  here
  localStorage.setItem('cart', JSON.stringify(cart))
  const token = localStorage.getItem('token')

  {
    // token ? setIsTokenPresent(true) : setIsTokenPresent(false)

    if (cart.length < 1) {
      return (
        <>
          <Link to='/foods'>
            <h1> Cart is Empty Fill it</h1>
          </Link>
        </>
      )
    }

    return (
      <Wrapper>
        cart Content page
        <div>
          {cart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div className='add-more-link'>
          <Link to='/foods'>add more to cart</Link>
        </div>
        <OrderSummary />;{/* <div className='clear'> */}
        <button className='clear' onClick={clearCart}>
          Clear cart
        </button>
      </Wrapper>
    )
  }
}
const Wrapper = styled.section`
  .checkout-link {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .add-more-link {
    /* display: grid; */
    /* justify-content: space-between; */
    /* margin-top: 10rem; */
    /* background-color: white;
    border-width: 1px;
    border-style: solid;
    max-width: fit-content;
    padding: 1rem 1rem; */
  }
background-color:white;
  .clear-btn {
    background: var(--clr-black);
  }
  .clear {
    background-color: red;
    padding: 1rem 8rem;
    display: flex;
    /* max-width: fit-content; */
    border-radius: 4px;
    position: relative;
    color: whitesmoke;
    font-weight: Bold;
    cursor: pointer;

    top: 1px;
    right: 0px;
    left: 72.5%;
    justify-content: flex-end;

    border: none;
  }
`
export default CartContent
