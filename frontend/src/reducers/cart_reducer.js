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
      console.log('ADD TO CART>>>>>>', tempItem)

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
  if (action.type === COUNT_CART_TOTALS) {
    const { total_price, total_quantity } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem
        {
          /*calculate  the amount of  item(total quantity of  item)*/
        }
        total.total_quantity += amount
        total.total_price += price * amount
        console.log('TOTAL>>>>>>>>>', total)

        return total
      },
      {
        total_price: 0,
        total_quantity: 0
      }
    )
    console.log(total_price, total_quantity)
    return { ...state, total_price, total_quantity }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  //remove single item  from cart
  if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload
    console.log(state.cart)
    let tempcart2 = state.cart
    console.log('IS ID>>>', id)
    let filteredOrder = tempcart2.filter(item => item.id !== id)
    return { ...state, cart: filteredOrder }
  }

  throw new Error(`No matching ${action.type} -action  type`)
  //check for  another Action Dispatch
}

export default cart_reducer
