import React from 'react'
import CartItem from './CartItem'
import { useGlobalContext } from './context'

const CartContainer = () => {
  //TODO: get Item from Global Context
  const { cart } = useGlobalContext()
  //check if  cart is  empty, if  empty return, else
  if (cart.length === 0) {
    return (
      <section className='cart'>

        <header>
          <h2>your bag</h2>

          <h4 className='empty-cart'>is currently empty </h4>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
      <h2>your bag</h2>
      </header>
      {/*  cart  items */}
      <div>
      {cart.map((item) =>{
return <CartItem key={item.id} item={...item} />
      })}
      </div>
      {/*cart footer */}
      <footer>
        <hr />
<h4> total <span>N0.00</span> </h4>
        <div>
        </div>
        <button className='btn clear-btn'>
        clear cart
        </button>
      </footer>
    </section>
  )
}
export default CartContainer
