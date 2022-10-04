import Nav from 'react-bootstrap/Nav'
import Link from 'next/link';
import {FiShoppingCart} from 'react-icons/fi'
import Badge from 'react-bootstrap/Badge';
import { useContext,useEffect,useState } from 'react';
import { CartContext } from '../../context/cart-context';

const NavCartIcon = () => {
    const cartCtx = useContext(CartContext)

    const getCartQuantity = () => {
        let quantity = 0
        if(cartCtx.cart){
            cartCtx.cart.items.map(item => {
                quantity = quantity + item.quantity
            })
        }
        return quantity
    }

    const [itemsQuantity, setItemsQuantity] = useState(getCartQuantity())


    useEffect(()=>{
        console.log('cart change')
        setItemsQuantity(getCartQuantity())
    },[cartCtx.cart])
    
    return (
        <>
            <Nav>
              <Link href='/cart'>
                <a className='text-decoration-none'>
                    <div className='d-flex justify-content-center'>
                        <div className='mr-1'><FiShoppingCart color='#262626' size='2.5rem' title='Cart'/></div>
                        {itemsQuantity > 0 && <Badge bg="dark" pill style={{height:'fit-content'}}>{itemsQuantity}</Badge>}
                    </div>
                </a>
              </Link>
            </Nav>
        </>
    )
}

export default NavCartIcon