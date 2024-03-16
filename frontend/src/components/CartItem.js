import React from 'react'
// import ItemQuantity from './ItemQuantity'
// import { useCartContext } from '../context/cart_context'
import { useFoodsContext } from '../context/foods_context'
import { useCartContext } from '../context/cart_context'
import { OrderSummary } from '../components'
import styled from 'styled-components'

const CartItem = ({ name, price, description, image, quantity, id }) => {
  const { removeItem, cart, updateItemQuantity } = useCartContext()

  const handleRemove = id => {
    removeItem(id)
  }
  const handleIncrease = id => {
    console.log(cart)
    console.log('Increase')
    let item = cart.find(cat => cat.id === id)
    if (item) {
      // updateItemQuantity(id, item.quantity + 1)
    }
  }

  const handleDecrease = id => {
    console.log(cart)
    let item = cart.find(cat => cat.id === id)
    if (item && item.quantity > 1) {
      // updateItemQuantity(id, item.quantity - 1)
    }
  }
  return (
    <Wrapper>
      <div className='title'>
        <img src={image} alt={name} className='cart-image' />
        <div className='item-details'>
          <div className='cart-item-name'>Name: {name}</div>

          <div className='cart-item-quantity'>quantity: {quantity}</div>
          <div className='price'>
            {' '}
            <span>Price: &#8358; {price}</span>{' '}
          </div>
        </div>
      </div>
      <h5 className='price'>{price}</h5>

      <button
        type='button'
        className='remove-btn'
        onClick={() => handleRemove(id)}
      >
        remove item
      </button>
      <span></span>
      {/* <button
        type='button'
        className='decrease-btn'
        onClick={() => handleIncrease(id)}
      >
        Increase0000
      </button> */}

      {/* <button
        type='button'
        className='increase-btn'
        onClick={() => handleDecrease(id)}
      >
        Decrease1111
      </button> */}
    </Wrapper>
  )
}
const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .increase-btn {
    background-color: red;
  }
  .decrease-btn {
    background-color: red;
  }
  .price {
    display: grid;
  }
  align-items: center;
  background-color: white;
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 2rem 1rem;
  justify-items: center;
  margin-bottom: 1rem;
  align-items: center;
  max-width: fit-content;
  /* margin-left: 15%; */
  margin-top: 0.5rem;

  border-color: red;

  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    /* border-radius: var(--radius); */
    border-radius: 5px;
    object-fit: cover;
  }
  /* background-color: var(--clr-white); */
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    /* height: 1.5rem; */
    /* display: flex; */
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    background-color: red;
    cursor: pointer;
  }
  .subtotal {
    display: block;
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
    font-size: 1rem;
  }
  .price-small {
    display: none;
  }
  .price {
    font-size: 1rem;
    color: var(--clr-primary-5);
    font-weight: 400;
  }
  .name {
    font-size: 0.85rem;
  }
  .color {
    font-size: 0.85rem;
    span {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-template-rows: 65px;
  img {
    height: 100%;
  }
  .title {
    height: 100%;
    display: grid;
    grid-template-columns: 100px 200px;
    align-items: center;
    gap: 1rem;
    text-align: left;
  }
  .amount-btn {
    width: 100px;
    button {
      width: 1.5rem;
      height: 1rem;
      font-size: 1rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`

export default CartItem
