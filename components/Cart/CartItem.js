import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import {BsTrash} from 'react-icons/bs'
import CartItemFooter from "./CartItemFooter";
import { CartContext } from '../../context/cart-context';
import { useContext } from "react";
import Image from "react-bootstrap/Image";

const CartItem = (props) => {
    const cartCtx = useContext(CartContext)
    console.log(props.product)

    const removeHandler = (event) => {
        event.preventDefault()
        cartCtx.removeFromCart(props.product.cartId,'total')
    }

    return (
    <>
    <Card className="my-2">
    <Card.Body>
        <div className="d-flex">
            <Image src={props.product.image} style={{height:'8rem',width:'8rem',objectFit:'contain'}} className="mx-2" fluid/>
            <div>
                <Card.Title className="font-small">{props.product.name}</Card.Title>
                <Card.Text>
                    Size: {props.product.size}
                </Card.Text>
                <Button variant="outline-danger" size="sm" onClick={removeHandler}>Remove Item <BsTrash /></Button>
            </div>
        </div>
    </Card.Body> 
        <Card.Footer>
          <CartItemFooter initial={props.product.quantity} max={props.product.maxQuantity} price={props.product.price} cartId={props.product.cartId}/>
        </Card.Footer>
    </Card>
    </>
    )
}

export default CartItem