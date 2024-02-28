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
        <div>
          cart Content page
          {cart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
          <hr />
          <div className='add-more-link'>
            <Link to='/foods' className='btn-add-more'>
              add more to cart
            </Link>

            <button type='button' className='clear' onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
        <OrderSummary />
      </Wrapper>
    )
  }
}
const Wrapper = styled.section`
  margin: 0 auto; /* This centers the Wrapper in the parent */
  padding: 20px; /* Add some padding */
  box-sizing: border-box;

  width: 100%;

  background-color: whitesmoke;
  /* min-height: 100vh; */
  /* max-height: calc(1300vh - 250px); */

  /* max-height: 1200px; */
  /* max-width: 1200px; You can set a max-width as per your design */
  margin: 0 auto; /* This centers the Wrapper in the parent */
  padding: 20px; /* Add some padding */
  box-sizing: border-box;
  .checkout-link {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  .foods-link {
    background-color: green;
    padding: 0.5rem 2rem;
    display: flex;
    /* max-width: fit-content; */
    border-radius: 4px;
    position: relative;
    color: white;
    font-weight: Bold;
    cursor: pointer;

    justify-content: flex-end;

    border: none;
  }
  .btn-add-more {
    font-weight: Bold;
    cursor: pointer;
    border-radius: 4px;
    background: grey;
    margin-bottom: 0.5rem;

    text-transform: capitalize;
    padding: 1rem 0.5rem;

    color: whitesmoke;

    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }

  /* background-color: whitesmoke; */

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
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
  }

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
    text-transform: capitalize;

    /* justify-content: flex-end; */

    border: none;
  }
`
export default CartContent
