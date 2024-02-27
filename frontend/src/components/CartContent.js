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
      <Wrapper className='section'>
        cart Content page
        <div className='items-flex '>
          {cart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div>
          <Link to='/foods'>add more orders</Link>
        </div>
        {<OrderSummary />}
        <div>
          <button className='clear-btn' onClick={clearCart}>
            clear cart
          </button>
        </div>
        <div className='signin-or-checkout'>
          {token ? (
            <div className='checkout-link'>
              <Link to='/checkout'>proceed to Checkout</Link>
            </div>
          ) : (
            <div className='signin-link'>
              <Link to='/signin'>login to checkout</Link>
            </div>
          )}
        </div>
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
  background-color: white;
  .clear-btn {
    background: var(--clr-black);
  }
`
export default CartContent
