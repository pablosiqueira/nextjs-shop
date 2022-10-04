import Accordion from 'react-bootstrap/Accordion';
import OrderItem from './OrderItem';
import classes from './UserArea.module.css'

const UserOrders = props => {
    return (
        <>
        <h1 className={'text-center my-4 ' + classes.fontRoboto}>My Orders</h1>
        {props.orders.length < 1 && <h5 className='text-center my-2'>You have no orders!</h5>}
        {props.orders.length > 0 && 
        <Accordion className='my-4 d-block mx-auto' style={{maxWidth:'1000px'}} alwaysOpen>
            {props.orders.map((order,index) => {
                let dateFormat = new Date(order.date)
                return (
                <Accordion.Item eventKey={index} key={order.id} className={classes.fontRoboto}>
                    <Accordion.Header># {order.id} - {dateFormat.toDateString()}</Accordion.Header>
                    <Accordion.Body><OrderItem order={order}/></Accordion.Body>
                </Accordion.Item>
                )
            })}
        </Accordion>
        }
        </>
    )
}

export default UserOrders