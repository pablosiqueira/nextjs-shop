import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { CartContext } from '../../context/cart-context';

const CartItemFooter = props => {
    const cartCtx = useContext(CartContext)
    const [selectedQuantity, setSelectedQuantity] = useState(props.initial)
    
    const reduceQuantityHandler = (event) => {
        event.preventDefault()
        cartCtx.removeFromCart(props.cartId,1)
        setSelectedQuantity(prevState => {
            if(prevState > 1){
                return prevState - 1
            }else{
                return 0
            }
        })
    }

    const increaseQuantityHandler = (event) => {
        event.preventDefault()
        if(selectedQuantity < props.max){
            cartCtx.increaseQuantityFromCart(props.cartId)
            setSelectedQuantity(prevState => {
                    return prevState + 1
            })
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
                <InputGroup>
                <InputGroup.Text>Quantity</InputGroup.Text>
                <Button variant="outline-secondary" onClick={reduceQuantityHandler}>-</Button>
                <Form.Control
                    aria-label="Product quantity"
                    value={selectedQuantity}
                    max={props.max}
                    min='0'
                    style={{maxWidth: '3.5rem'}}
                    className='text-center'
                    disabled
                />
                <Button variant="outline-secondary" onClick={increaseQuantityHandler}>+</Button>
            </InputGroup></div>
            <div><b>US$ {props.price}</b></div>
          </div>  
    )
}

export default CartItemFooter