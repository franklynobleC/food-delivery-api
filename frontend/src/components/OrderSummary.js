import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/auth_context'
import { useNavigate } from 'react-router-dom'

const OrderSummary = () => {
  const { total_quantity, delivery_fee, total_price, cart } = useCartContext()
  const { user, getSingleUser, single_userInfo } = useAuthContext()
  const [paymentOption, setPaymentOption] = useState('')
  const [isTokenPresent, setIsTokenPresent] = useState(false)
  // const token = localStorage.getItem('token')

  let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

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

        <div>
          {token ? (
            <div>
              <button className='btn'>
                <Link to='/checkout'>Proceed to Checkout</Link>
              </button>
            </div>
          ) : (
            <div className=''>
              <button className='btn'>
                <Link to='/signin'>Login</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  margin-top: 0.5rem;
  display: grid;
  align-items: center;
  color: rgb(53, 53, 53);
  max-width: fit-content;
  /* justify-content: center; */
  /* background-color: grey; */
  border-radius: 4px;
  position: relative;
  /* left: 10px; */
  top: 0px;
  right: 0px;
  left: 70%;
  justify-content: flex-end;
  /* justify-content: center; */
  border-color: green;
  border-style: solid;
  border-width: 1px;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);

    padding: 4.5rem 6rem;
    /* padding-left: 20px; */
  }
  span {
    margin-top: 10px;
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
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    padding: 10px;
    margin-bottom: 5px;
    border: none;
  }
  .clear {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    padding: 10px;
    background-color: red;
  }
`

export default OrderSummary
