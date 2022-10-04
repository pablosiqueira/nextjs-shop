import classes from './ProductDetails.module.css'
import Button from 'react-bootstrap/Button';
import React, { useContext, useState } from 'react';
import CategoryBreadcrumb from './CategoryBreadcrumb';
import { CartContext } from '../../context/cart-context';
import Image from 'react-bootstrap/Image'
import TechnicalDetails from './TechnicalDetails';

const ProductDetails = (props) => {
    const [selectedSizeQty, setSelectedSizeQty] = useState()
    const [noSizeSelected, setNoSizeSelected] = useState()
    const cartCtx = useContext(CartContext)
    const [imgError,setImgError] = useState(false)

    const selectSizeHandler = (size,quantity) => {
        setNoSizeSelected(false)
        setSelectedSizeQty({size, quantity})
    }

    const addToCartHandler = () => {
        if(!selectedSizeQty){
            setNoSizeSelected(true)
            return
        }
        const data = {
            name: props.product.name,
            id: props.product.id,
            cartId: props.product.id + '?size=' + selectedSizeQty.size,
            size: selectedSizeQty.size,
            image: props.product.image,
            price: props.product.priceCurrent,
            quantity: 1,
            maxQuantity: selectedSizeQty.quantity
        }
        cartCtx.addToCart(data)
    }
    return (
        <>

        <CategoryBreadcrumb sections={[props.product.category, props.product.sport]} lastItem={props.product.name}/>

        <div className='d-flex justify-content-center flex-wrap mb-4'>
            <div className='my-2 mx-2'>
                <Image src={imgError ? '/img_not_found.png' : props.product.image} fluid style={{maxHeight: '15rem'}} 
                onError={()=>setImgError(true)}/>
            </div>
            <div className={classes.description}>
                <h4>{props.product.name}</h4>
                <h6 className={classes.oldPrice}>U$ {props.product.priceFull}</h6>
                <h5>U$ {props.product.priceCurrent}</h5>
                <h6><b>Color: </b>{props.product.color.join(', ')}</h6>
                <div className={classes.sizesGroup}>
                    <p className='mb-1'>Sizes:</p>
                        {props.product.sizes.map(item=>(
                            <React.Fragment key={item.size}>
                                {item.quantity !== '0' && <Button 
                                    variant={
                                        selectedSizeQty ? 
                                        (selectedSizeQty.size === item.size ? 'dark' : 'outline-dark') 
                                        : 'outline-dark'
                                    } 
                                    value={item.quantity} 
                                    size="lg"
                                    className='m-1' 
                                    onClick={() => selectSizeHandler(item.size, item.quantity)}
                                >
                                    {item.size}
                                </Button>}
                                {'  '}
                            </React.Fragment>
                        ))}
                    {selectedSizeQty && selectedSizeQty.quantity < 11 && <p className='my-2 text-danger'>Only {selectedSizeQty.quantity} avaliable</p>}
                    {noSizeSelected && <p className='my-2 text-danger'>Please select a size</p>}
                </div>
                <Button className={'mt-2 ' + classes.btnRed} onClick={addToCartHandler} size="lg">Add to cart</Button>
            </div>
        </div>
        <TechnicalDetails product={props.product} />                            
        </>
    )
}

export default ProductDetails