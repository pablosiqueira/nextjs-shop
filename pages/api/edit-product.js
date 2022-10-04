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
        const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
        const db = client.db()
        const productsCollection = db.collection('products')
        const result = await productsCollection.updateOne({_id:productId},{$set: prodData})
            console.log(result)
            client.close()
            res.status(201).json({message: 'inserted!'})
}

export default EditProduct