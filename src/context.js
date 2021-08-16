import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading] = useState(true)
  const [cart, setCart] = useState([])
  
useEffect(()=>{
  // setLoading(false)
  fetch(url).then(res=>res.json()).then(cart=>setCart(cart))
  setLoading(false)
},[0])
  // const defaultState = {
  //   increase : '',
  //   decrease : ''
  // }
  // const [state,dispatch] = useReducer(reducer,defaultState)
  const [increase,setIncrease] = useState(1)
  const clearCart = () =>{
    setCart([])
  }
  const RemoveSingleItem = (id)=>{
    const newCart =  cart.filter(item=>item.id !== id)
    setCart(newCart)
  }
  const IncreaseAmount = (id)=>{
    cart.map(item=>{
      if(item.id === id){
        // console.log(item.id,id)
         setIncrease(increase +1 )
         // console.log(increase)
         item.amount += 1 
      }
    })
    // setIncrease(increase + 1)
  }
    const DecreaseAmount = (id)=>{
    cart.map(item=>{
      if(item.id === id){
        // console.log(item.id,id)
         setIncrease(increase -1 )
         // console.log(increase)
         item.amount -= 1 
         if(item.amount === 0){
          RemoveSingleItem(id)
         }
      }
    })
    // setIncrease(increase + 1)
  }
  return (
    <AppContext.Provider
      value={{
        cart,
        clearCart,
        RemoveSingleItem,
        IncreaseAmount,
        DecreaseAmount,
        loading

      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
