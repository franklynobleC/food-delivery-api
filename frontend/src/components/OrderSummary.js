import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/auth_context'
import { useNavigate } from 'react-router-dom'

const OrderSummary = () => {
  const { total_quantity, delivery_fee, total_price, cart } = useCartContext()
  const { user, getSingleUser, single_userInfo } = useAuthContext()
  // const [paymentOption, setPaymentOption] = useState('')
  // const [isTokenPresent, setIsTokenPresent] = useState(false)
const userId = localStorage.getItem('userId')

  let navigate = useNavigate()
  const token = localStorage.getItem('token')
  // const userId = localStorage.getItem('userId')

  const handConfirm = () => {
    console.log('handle Submit Clicked')
    if (token && cart && userId) {
      console.log('Logged in  && userID is', user.userId, 'USER ID', userId)

      let timeCheck = setTimeout(() => {
        getSingleUser(userId)
      }, 1000)
      navigate('/checkout')
      return () => clearTimeout(timeCheck)
    } else {
      let waitTime = setTimeout(() => {
        console.log('waiting for 1 sec')
        navigate('/login')
      }, 2000)
      return () => clearTimeout(waitTime)
    }
  }

  useEffect(() => {
    getSingleUser(userId)
  }, [userId])
  return (
    <Wrapper>
      <div className=''>
        <article>
          <div>
            <h3>ORDER SUMMARY</h3>
          </div>

          <div className='quantity-total'>
            <span>Total Quantity: {total_quantity}</span>
          </div>
          <p>Delivery Fee: {delivery_fee}</p>
          <div className='cart-total'>
            <hr />
            <div>Sub Total:</div>
            <span>
              <div> &#8358;{total_price}</div>
            </span>
          </div>
        </article>

        <div className='btn-container'>
          {token ? (
            <Link to='/checkout' className='btn-checkout'>
              Proceed To Checkout
            </Link>
          ) : (
            <Link to='/signin' className='btn-login'>
              Login
            </Link>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background-color: white;
  border-color: green;

  border-width: 0.5px;
  border-style: solid;
  border-radius: 5px;
  width: auto;
  max-width: fit-content;
  display: flex;
  flex-direction: flex-end;

  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);

    padding: 1.5rem 4rem;
  }
  span {
    margin-top: 5px;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn-checkout,
  .btn-login {
    width: fit-content;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    padding: 10px;
    margin-bottom: 5px;
    border: none;
    color: whitesmoke;
    background-color: green;
    vertical-align: auto;
    cursor: pointer;
    /* border-radius: 5px; */
    border-radius: 4px;
    padding: 1rem 1.5rem;
  }
  .clear {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    padding: 10px;
    background-color: red;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default OrderSummary
