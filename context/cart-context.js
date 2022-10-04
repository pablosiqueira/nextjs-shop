import React, {useState, useEffect} from "react";

export const CartContext = React.createContext({
    cart:[],
    addToCart: (product) => {},
    removeFromCart: (cartId,quantity) => {},
    increaseQuantityFromCart: (cartId) => {},
    clearCart: () => {},
    updatePrices: (cart) => {}
  })



const CartContextProvider = props => {
    const [cart, setCart] = useState()

    const adjustedPrice = (price) => {
      if(price < 0 || !price){
        return 0
      }
      let newPrice = Math.floor(price * 100) / 100
      return newPrice
    }


    const addToCartHandler = (product) => {
      setCart(prevState => {
        const prodIndex = prevState.items.findIndex(x => x.cartId === product.cartId)
        console.log(prevState.totalAmount)
        console.log(product.price)
        const newPrice = parseFloat(prevState.totalAmount)  + parseFloat(product.price)
        console.log(newPrice)
        if(prodIndex === -1){
          const newItems = [...prevState.items, product]
          newPrice = adjustedPrice(newPrice)
          localStorage.setItem('cart', JSON.stringify({items: newItems, totalAmount: newPrice}))
          return {items: newItems, totalAmount: newPrice}
        }else{
          if(prevState.items[prodIndex].maxQuantity > prevState.items[prodIndex].quantity){
            let updatedItems = prevState.items
            updatedItems[prodIndex].quantity++
            newPrice = adjustedPrice(newPrice)
            localStorage.setItem('cart', JSON.stringify({items: updatedItems, totalAmount: newPrice}))
            return {items: updatedItems, totalAmount: newPrice.toFixed(2)}
          }else{
            return prevState
          }
        }
      })
    }

    const removeFromCartHandler = (cartId, quant) => {
      setCart(prevState => {
        const prodIndex = prevState.items.findIndex(x => x.cartId === cartId)
        const item = prevState.items[prodIndex]
        let newPrice
        let newItems
        if(quant === 'total' || item.quantity === 1){
          newPrice = (parseFloat(prevState.totalAmount) - (parseFloat(item.price) * parseFloat(item.quantity)))
          newItems = prevState.items.filter(prod => prod.cartId != cartId)
        }else{
          newPrice = parseFloat(prevState.totalAmount) - parseFloat(item.price)
          newItems = prevState.items
          newItems[prodIndex].quantity--
        }
        newPrice = adjustedPrice(newPrice)
        localStorage.setItem('cart', JSON.stringify({items: newItems, totalAmount: newPrice}))
        return {items: newItems, totalAmount: newPrice}
      })
    }

    const increaseFromCartHandler = (cartId) => {
      setCart(prevState => {
        const prodIndex = prevState.items.findIndex(x => x.cartId === cartId)
        const item = prevState.items[prodIndex]
        let newPrice = parseFloat(prevState.totalAmount) 
        let newItems = prevState.items
        if(item.quantity < item.maxQuantity){
          newPrice = newPrice + parseFloat(item.price)
          console.log('newPrice: ' + newPrice)
          newItems[prodIndex].quantity++
          newPrice = adjustedPrice(newPrice)
          localStorage.setItem('cart', JSON.stringify({items: newItems, totalAmount: newPrice}))
          return {items: newItems, totalAmount: newPrice}
        }
      })
    }

    const clearCartHandler = () => {
        setCart()
        localStorage.removeItem("cart")
    }

    const updatePricesHandler = () =>  {
      if(cart){
        let ids = {}
        cart.items.map((item,index) => {
          ids = {...ids,['val' + index]: item.id}
        })
        console.log('ids')
        console.log(ids)
        const searcParams = new URLSearchParams(ids)
        fetch('/api/get-updated-products?' + searcParams.toString())
        .then((res) => res.json())
        .then((data) => {
          console.log(data)    
          let newCart = {items: [], totalAmount: 0}
          let newTotal = cart.totalAmount
          cart.items.map(item => {
            let currentItem = {...item}
            let matchItem = data.filter(selected => item.id === selected._id.toString())
            if(matchItem.length > 0){
              console.log(matchItem)
              if(matchItem[0].price.current !== item.price){
                //console.log('different')
                //console.log(currentItem)
                newTotal = newTotal - (item.price * item.quantity)
                currentItem.price = matchItem[0].price.current
                newTotal = newTotal + (matchItem[0].price.current * item.quantity)
              }
              newCart.items.push(currentItem)
            }else{ //product not in database
              newTotal = newTotal - (item.price * item.quantity)
            }  
          })
          newCart.totalAmount = adjustedPrice(newTotal)
          setCart(newCart)
          localStorage.setItem('cart', JSON.stringify(newCart))
        })
      }
    }


    

    useEffect(() => {
        if (typeof window !== 'undefined') {
      // Perform localStorage action
          if(!cart){
            console.log('useeffect')
            const localCart = JSON.parse(localStorage.getItem("cart")) || {items: [], totalAmount:0}
            setCart(localCart)
            console.log(localCart)
          }
        }
      }, [])

    const contextValue = {
        cart,
        addToCart: addToCartHandler,
        removeFromCart: removeFromCartHandler,
        increaseQuantityFromCart: increaseFromCartHandler,
        clearCart: clearCartHandler,
        updatePrices: updatePricesHandler
    }
    return (
        <CartContext.Provider value={contextValue}>
        {props.children}</CartContext.Provider>
    )
}

export default CartContextProvider