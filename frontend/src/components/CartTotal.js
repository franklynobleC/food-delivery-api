import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import '../styles/cart/carttotal.css'
import { useUserContext } from '../context/user_context'
const CartTotal = () => {
  const {
    total_quantity,
    shipping_fee,
    total_price,
    cart,
    createOrder,
    payment_option
  } = useCartContext()
  const { userId } = useUserContext()

  const [shippingFee, setShippingFee] = useState(0)
  const handleSubmit = e => {
    e.preventDefault()
    console.log(cart, shipping_fee, payment_option, userId)
    createOrder(cart, shipping_fee, payment_option, userId)
  }
  return (
    <div className='cart-total-container'>
      <div className='total-items'>
        <div>
          <h1>CART TOTAL PAGE</h1>
          {console.log(
            'FROM CHECK OUT  PAGE USER ID',
            userId,
            'payment option is',
            payment_option
          )}
          <h4>Total Quantity:{total_quantity}</h4>
        </div>
        <div>
          <h4>Total Price: &#8358;{total_price}</h4>
        </div>
        <div>Delivery Fee:&#8358;{shipping_fee}</div>
        {console.log('CART CONTENT  IS>>>', typeof cart)}

        <div>
          <Link to='/checkout'>checkout</Link>
          <form onSubmit={handleSubmit}>
            <button className='submit'>pay now</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
