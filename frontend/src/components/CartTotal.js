import React from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import '../styles/cart/carttotal.css'
const CartTotal = () => {
  const { total_quantity, shipping_fee,total_price,cart } = useCartContext()
  return (
    <div className='cart-total-container'>
      <div className='total-items'>
        <div>
          <h1>CART TOTAL PAGE</h1>
          <h4>Total Quantity:{total_quantity}</h4>
        </div>
        <div><h4>Total Price: &#8358;{total_price}</h4>
</div>
        <div>Delivery Fee:&#8358;{shipping_fee}</div>
       { console.log("CART CONTENT  IS>>>", typeof cart)}

        <div>
          <Link to='/checkout'>checkout</Link>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
