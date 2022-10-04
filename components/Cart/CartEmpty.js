import {FiShoppingCart} from 'react-icons/fi'
import Link from 'next/link';
import Button from "react-bootstrap/Button";

const CartEmpty = () => {
    return (
        <>
            <div className='d-block mx-auto text-center mt-4'>
                <FiShoppingCart size='5rem'/>
            </div>
            <div className='text-center'>
                <h3 className='text-center my-2'>Your cart is empty!</h3>
                <Link href="/products/all"><Button variant="outline-primary" className='my-2'>Browse products</Button></Link>
            </div>
        </>
    )
}

export default CartEmpty