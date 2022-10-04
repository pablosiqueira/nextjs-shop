import {MongoClient} from 'mongodb'

export async function addProduct(req,res){
        console.log('adding')
        let prodData = req.body;
        prodData.price.full = parseFloat(prodData.price.full)
        prodData.price.current = parseFloat(prodData.price.current)
        const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
        const db = client.db()
        const productsCollection = db.collection('products')
        const result = await productsCollection.insertOne(prodData)
            console.log(result)
            client.close()
            res.status(201).json({message: 'inserted!'})
}

export default addProduct