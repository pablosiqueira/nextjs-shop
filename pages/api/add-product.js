import {MongoClient} from 'mongodb'

export async function addProduct(req,res){
        console.log('adding')
        let prodData = req.body;
        prodData.price.full = parseFloat(prodData.price.full)
        prodData.price.current = parseFloat(prodData.price.current)
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        const productsCollection = db.collection('products')
        const result = await productsCollection.insertOne(prodData)
            console.log(result)
            client.close()
            res.status(201).json({message: 'inserted!'})
}

export default addProduct