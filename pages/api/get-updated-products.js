import {MongoClient, ObjectId} from 'mongodb'

export async function getUpdatedProducts(req,res){
        const query = req.query;
        let ids = Object.values(query)
        ids = [...new Set(ids)]
        ids = ids.map(item => {return new ObjectId(item) })
        console.log(ids)
        const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
        const db = client.db()
        let productsCollection
        productsCollection = db.collection('products').find({_id: {$in: ids}}).toArray()
        const result = await productsCollection
        //console.log(result)
        client.close()
        res.status(201).json(result)
        return result
}

export default getUpdatedProducts