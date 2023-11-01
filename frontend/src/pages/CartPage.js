import { useCartContext } from '../context/cart_context'
import useCartContent from '../components/CartContent'
import { CartContent } from '../components/'
import   '../styles/cart/cartpage.css'
const CartPage = () => {
  return (
    <div className='cart-page'>
      <h2>Cart Page</h2>

      <CartContent />
    </div>
  )
}

export default CartPage
