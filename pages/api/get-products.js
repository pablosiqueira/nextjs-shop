import {MongoClient} from 'mongodb'

export async function getProducts(req,res){
        const query = req.query;
        let sortQuery = {_id:-1}
        if(query.order === 'priceasc'){
                sortQuery = {"price.current":1}
        }
        if(query.order === 'pricedesc'){
                sortQuery = {"price.current":-1}
        }
        let currentPage = 1
        if(query.page){
                currentPage = query.page
        }  
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db()
        let productsCollection
        //const category = {category: query.category}
        console.log(query)
        if(query.limit){
                productsCollection = db.collection('products').find().limit(+query.limit).sort({'_id':-1, 'name':1}).toArray() //find all with limit
        }else{
                const word = new RegExp(query.name,'i')
                productsCollection = db.collection('products').find({name: word}).sort(sortQuery).skip((currentPage - 1)*20).limit(20).toArray() //find all
        }
        
       /* if(category){
                console.log(category)
                if(category){
                        productsCollection = db.collection('products').find(category).limit(+query.limit).toArray()   
                }else{
                        productsCollection = db.collection('products').find().limit(+query.limit).toArray()
                }     
        }else{
                productsCollection = db.collection('products').find(query).limit(+query.limit).toArray()
        }*/
        const result = await productsCollection
        console.log(result)
        client.close()
        res.status(201).json(result)
        return result
}

export default getProducts
