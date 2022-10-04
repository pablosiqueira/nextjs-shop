import { useContext } from "react"
import { UserContext } from "../../../context/user-context"
import UserOrders from "../../../components/UserArea/UserOrders"
import { MongoClient,ObjectId } from "mongodb"
import Head from "next/head"
import { useRouter } from "next/router"
import LoadingScreen from "../../../components/UI/LoadingScreen"


const UserOrdersPage = (props) => {
    const userCtx = useContext(UserContext)
    const router = useRouter()
    if (router.isFallback) {
        return (
        <>
        <Head>
            <title>Orders</title>
        </Head>
        <LoadingScreen />
        </>
        )
    }
        return (
            <>
                <Head>
                    <title>Orders</title>
                </Head>
                {userCtx.user && <UserOrders orders={props.orders}/>}
                {!userCtx.user && <h1 className="text-center my-4">Acess Denied</h1>}
            </>
        )
}

export async function getStaticPaths(context){
    const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
    const db = client.db()
    const usersCollection = db.collection('users')
    const users = await usersCollection.find({},{'_id': 1}).toArray()
    client.close()
    return {
        paths: users.map(user => ({
            params: {
                userId: user._id.toString()
            }})),
        fallback: true       
    }
}

export async function getStaticProps({params, query}){
    if(!params.userId || !ObjectId.isValid(params.userId)){
        return{
            notFound:true
        }
    }

    console.log(params.userId)
    const userId = new ObjectId(params.userId) 
    const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
    const db = client.db()
    const ordersCollection = db.collection('orders')
    
    const selectedOrders = await ordersCollection.find({userId}).sort({date:-1}).toArray()
    let recievedOrders = []
    selectedOrders.map(selectedOrder => {

      let orderItems = []
      selectedOrder.items.map(orderItem => {
        orderItems.push({
            name: orderItem.name,
            id: orderItem.id,
            size: orderItem.size,
            image: orderItem.image,
            price: orderItem.price,
            quantity: orderItem.quantity,
        })
      })
      console.log(orderItems)
      recievedOrders.push({
                  id: selectedOrder._id.toString(),
                  totalAmount: selectedOrder.totalAmount,
                  address: selectedOrder.address,
                  date: selectedOrder.date,
                  items: orderItems
      })
    })
    client.close() 
    console.log(recievedOrders)
    return{
        props:{
            orders: recievedOrders,
        },
        revalidate: 300,
    }
  }

export default UserOrdersPage