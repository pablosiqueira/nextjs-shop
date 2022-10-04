import CartItem from "./CartItem"
import Button from "react-bootstrap/Button"
import { useContext, useState } from "react"
import { UserContext } from "../../context/user-context"
import { CartContext } from "../../context/cart-context"
import Spinner from "react-bootstrap/Spinner"
import MessageModal from '../UI/MessageModal';
import { useRouter } from "next/router"
import classes from './Cart.module.css'

const CartList = (props) => {
    const router = useRouter()
    const userCtx = useContext(UserContext)
    const cartCtx = useContext(CartContext)
    const [isLoading,setIsLoading] = useState(false)
    const [modalShow,setModalShow] = useState(false)

    async function callPlaceOrderApi(enteredData){
        const response = await fetch('/api/place-order',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.json()
        console.log(resp)
        setIsLoading(false)
        setModalShow(true)
        setTimeout(()=>{
            cartCtx.clearCart()
            setModalShow(false)
            router.push('user/orders/' + userCtx.user._id)
        }, 3000);
    }

    const placeOrderHandler = () => {
        const date = new Date()
        const data = {...cartCtx.cart,address: userCtx.user.address, userId: userCtx.user._id.toString(), date}
        console.log(data)
        setIsLoading(true)
        callPlaceOrderApi(data)
    }
    return (
        <>
            <h1 className={"text-center my-4 " + classes.fontRoboto}>My Cart</h1>
            <div className={"d-block mx-auto " + classes.fontRoboto} style={{maxWidth: '500px'}}>
            {props.items.map(item => (
                <CartItem product={item} key={item.cartId}/>
            ))}
            </div>
            <div className={"d-block mx-auto mb-4 " + classes.fontRoboto}>
            <p className="text-center mb-2"><b>Total:</b> {props.total}</p>
            {!isLoading && <Button className={"d-block mx-auto " + classes.browseButton} onClick={placeOrderHandler}>Place Order</Button>}

            {isLoading && <div className='d-block mx-auto'>
            <Spinner className='d-block mx-auto' animation="border" role="status"></Spinner>
            <p className='text-center'>Loading...</p>
            </div>}

            <MessageModal show={modalShow} 
            onHide={() => {
                setModalShow(false)
                cartCtx.clearCart()
                router.push('user/orders/' + userCtx.user._id)
            }} 
            message={'The order has been placed!'}
        />

            </div>
        </>
    )
}

export default CartList