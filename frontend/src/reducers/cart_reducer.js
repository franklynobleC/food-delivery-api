import {
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  ADD_TO_CART
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, food } = action.payload
    //check  if id  is  found  in  cart  array
    const tempItem = state.cart.find(i => i.id === id)
    if (tempItem) {
      //check if  the  item  is  in  the     Cart,  iterate  over it
      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount

          return { ...cartItem, amount: newAmount }

          //if  item  is  found  in  cart  array  update  amount
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      //if  item  is  not  found  in  cart  array  add  it
      const newItem = {
        id: id,
        name: food.name,
        amount,
        image: food.image,
        price: food.price
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  throw new Error(`No matching ${action.type} -action  type`)
  //check for  another Action Dispatch
}
//remove single item  from cart

export default cart_reducer
