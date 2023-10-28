import React from 'react'
import { useGlobalContext } from './context'
const CartItem = ({ id, img, name, price, description }) => {
  ;<article className='cart-item'>
    <img src={img} alt={name} />
    <div>
      <h4>{price}</h4>
      <h4 className='food-price'>N{price} </h4>
      {/*remove button */}
      <button className='remove-btn' onClick={() => console.log('remove btn')}>
        remove
      </button>
    </div>
    {/*increase amount   */}

    <button
      className='amount-btn'
      onClick={() => console.log('increase amount')}
    ></button>
    {/* amount  */}
    <p className='amount'>{amount} </p>
    {/* decrease amount*/}
    <button className='amount-btn' onClick={() => console.log('decrease')}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
      </svg>
    </button>
  </article>
}
