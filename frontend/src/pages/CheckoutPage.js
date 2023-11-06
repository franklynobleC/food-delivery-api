import React, { Link } from 'react'
import { useCartContext } from '../context/cart_context'
const CheckoutPage = () => {
  const { cart } = useCartContext()

  if (cart.length < 1) {
    return (
      <div>
        <Link to='foods'>
          <h1>Your Cart is Empty, Fill it</h1>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <h2>CheckOut page!</h2>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nihil,
      dolor dicta nam quod doloremque maxime aperiam natus unde alias nisi
      ducimus repellat iusto soluta eaque quos magni iure veniam? Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Cumque, non autem, ducimus
      tenetur at eveniet saepe magnam voluptas nobis quae ex. Explicabo,
      impedit? Reprehenderit deserunt quisquam exercitationem, sunt mollitia
      dolor?
    </div>
  )
}

export default CheckoutPage