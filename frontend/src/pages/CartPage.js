import { useCartContext } from '../context/cart_context'
import useCartContent from '../components/CartContent'
import { CartContent } from '../components/'
const CartPage = () => {
  return (
    <div>
      <h2>Cart Page</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sint
        dolores consectetur odit totam nemo, cum vitae quae maiores tempore
        repellendus perferendis commodi ut expedita omnis earum optio fugit

      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni omnis quo
        ea id incidunt accusamus eaque dolorum alias at tenetur impedit, ipsam,
        sequi rem eveniet esse beatae saepe dolores hic.
      </p>
      <CartContent />
    </div>
  )
}

export default CartPage
