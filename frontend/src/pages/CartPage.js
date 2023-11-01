import { useCartContext } from '../context/cart_context'
import CartContent from '../components/CartContent'
const CartPage = () => {
  const { cart } = useCartContext()
  return (
    <div>
      <h2>Cart Page</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sint
        dolores consectetur odit totam nemo, cum vitae quae maiores tempore
        repellendus perferendis commodi ut expedita omnis earum optio fugit
        fugiat.em
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
