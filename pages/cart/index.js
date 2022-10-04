import { useContext } from "react"
import {CartContext} from "../../context/cart-context"
import CartList from "../../components/Cart/CartList"
import CartEmpty from "../../components/Cart/CartEmpty"
import Head from "next/head"

let pageStart = true

const Cart = () => {
    const CartCtx = useContext(CartContext)
    const cart = CartCtx.cart
    if(cart && cart.items.length > 0 &&  pageStart){
        console.log('check db')
        CartCtx.updatePrices()
        pageStart = false
    }
    return (
        <>
            <Head>
                <title>Cart</title>
            </Head>
            {(cart && cart.items.length > 0) && <CartList total={cart.totalAmount} items={cart.items}/>}
            {(!cart || cart.items.length < 1) && <CartEmpty />}
        </>
    )
}

export default Cart