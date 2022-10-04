import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import classes from './ProductsList.module.css'
import {FaRegEdit} from 'react-icons/fa'
import { useState } from 'react';

const ProductCard = props => {
    const [imgError,setImgError] = useState(false)
    let linkHref = (props.mode === 'show') ?  ('/' + props.product.id) : ('/dev/edit-product/' + props.product.id)

    return(
        <Link href={linkHref}>
            <Col className={classes.pointer}>
                <Card className={classes.prodCard}>
                    <Card.Img variant="top" src={imgError ? '/img_not_found.png' : props.product.image} className={classes.prodImg}
                    onError={()=>setImgError(true)}/>
                    <Card.Body className='text-center'>
                        <Card.Title className={classes.cardTitle}>{props.product.name}</Card.Title>
                        <Card.Text className={classes.cardText}>
                            {props.mode === 'show' && props.product.priceFull !== props.product.priceCurrent && <s>U$ {props.product.priceFull}</s> }
                            {props.mode === 'show' && <>U$ {props.product.priceCurrent}</>}
                            {props.mode === 'edit' && <FaRegEdit size='1.5rem'/>}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Link>
    )
}
export default ProductCard