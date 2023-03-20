import {MongoClient} from 'mongodb'
import { ObjectId } from 'mongodb';

export async function EditProduct(req,res){
        //console.log('edit')
        const productId = new ObjectId(req.query.id)
        //console.log(req.query.id)
        let prodData = req.body;
        prodData.price.full = parseFloat(prodData.price.full)
        prodData.price.current = parseFloat(prodData.price.current)
        //console.log(req.body)
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        const productsCollection = db.collection('products')
        const result = await productsCollection.updateOne({_id:productId},{$set: prodData})
            console.log(result)
            client.close()
            res.status(201).json({message: 'inserted!'})
}

export default EditProduct