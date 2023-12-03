import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { useCartContext } from '../context/cart_context'
import { useAuthContext } from '../context/auth_context'
import CartTotal from './CartTotal'
import '../styles/cart/cartcontent.css'
const CartContent = () => {
  const { cart, clearCart } = useCartContext()
  const { is_logged_in } = useAuthContext()
  // pass the cart  item  here
  localStorage.setItem('cart', JSON.stringify(cart))

  {
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
      <div className='cart-content'>
        <h5>cart Content page</h5>
        {cart.map(item => {
          return <CartItem key={item.id} {...item} />
        })}
        <div>
          <Link to='/foods'>add more orders</Link>
        </div>
        <CartTotal />
        <button className='clear-btn' onClick={clearCart}>
          clear cart
        </button>

          {is_logged_in ? (
            <div className='checkout'>
              ;<Link to='/checkout'>proceed to Checkout</Link>
            </div>
          ) : (
            <div className='signin'>
              <Link to='/signin'>login to checkout</Link>
            </div>
          )}

      </div>
    )
  }
}
export default CartContent
