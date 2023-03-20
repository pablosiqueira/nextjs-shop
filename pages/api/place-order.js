import {MongoClient, ObjectId} from 'mongodb'

export async function placeOrder(req,res){
        console.log('adding')
        const orderData = req.body;
        const userId = new ObjectId(orderData.userId)
        let dataToadd = orderData
        dataToadd.userId = userId
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        const usersCollection = db.collection('users')
        const ordersCollection = db.collection('orders')
        const addOrderToCollection = await ordersCollection.insertOne(dataToadd)
        console.log(addOrderToCollection.insertedId)
        const addOrderToUser = await usersCollection.updateOne({_id:userId},{$push: {orders : ObjectId(addOrderToCollection.insertedId)}})
        console.log(addOrderToUser)
        client.close()
        res.status(201).json({message: 'Success'})
}

export default placeOrder