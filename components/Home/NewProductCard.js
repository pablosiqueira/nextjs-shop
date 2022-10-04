import Image from "react-bootstrap/Image"
import Link from "next/link"
import classes from './Home.module.css'
import Spinner from "react-bootstrap/Spinner"
import { useState } from "react"

const NewProductCard = props => {
    const [imgError,setImgError] = useState(false)
    return (
        <>
            {!props.loading && <Link href={'/' + props.product._id.toString()}>
                <div className={"border rounded d-inline-flex flex-wrap mx-2 my-2 p-1 " + classes.newProdCardBody} >
                    <div>
                        <Image src={imgError ? '/img_not_found.png' : props.product.image} className={classes.newProdImg} fluid
                        onError={()=>setImgError(true)}/>
                    </div>
                    <div className={classes.newProductCardText}>{props.product.name}</div>
                </div>
            </Link> }

            {props.loading && <div className={"border rounded d-inline-flex flex-wrap mx-2 my-2 p-1 " + classes.newProdCardBody} >
                    <Spinner animation="border" className={classes.newProdImg}/>
                </div>}
        </>
    )
}

export default NewProductCard