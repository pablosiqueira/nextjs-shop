import Image from "react-bootstrap/Image"
import Link from "next/link"
import classes from './UserArea.module.css'

const OrderItem = props => {

    return (
        <>
        <div className="d-block mx-auto" style={{maxWidth:'500px'}}>
            {props.order.items.map((item,index) => {
                return (
                    <div className="d-flex flex-wrap mb-4 justify-content-center align-items-center" key={index}>
                        <Link href={'/'+ item.id}>
                            <Image src={item.image} className={classes.itemImage} fluid/>
                        </Link>
                        <div className='mx-2' style={{width:'250px',}}>
                            <div className={classes.orderItemTitle}>{item.name}</div>
                            <b>Size: </b>{item.size}<br />
                            <b>Quantity: </b>{item.quantity}<br />
                            <b>Price: </b>U$ {item.price}
                        </div>
                    </div>
                )
            })}
        </div>
        <p className="text-center"><b>Shipping Address</b><br />
        {props.order.address.street} - Number {props.order.address.number} - Zip: {props.order.address.zip}<br />
        {props.order.address.city}/{props.order.address.state} - {props.order.address.country}
        </p>

        <p className="text-center"><b>Total: </b>U$ {props.order.totalAmount}</p>
        </>
        
    )
}

export default OrderItem