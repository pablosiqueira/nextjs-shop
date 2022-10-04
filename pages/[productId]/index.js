import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import ProductDetails from "../../components/ProductDetails/ProductDetails"
import { useRouter } from "next/router"

const ProductDetail = (props) => {
    const router = useRouter()
    if (router.isFallback) {
        return <h1 className="text-center my-4">Loading...</h1>
    }
    return <>
    <Head>
        <title>{props.productData.name}</title>
    </Head>
    <ProductDetails product={props.productData}/>
    </>
}

export async function getStaticPaths(context){
    //fetch data for a single meetup
    const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
    const db = client.db()
    const productsCollection = db.collection('products')
    const products = await productsCollection.find({},{_id: 1}).toArray()
    client.close()

    return {
        paths: products.map(product => ({
            params: {
                productId: product._id.toString()
            }})),
        fallback: true    
    }
}

export async function getStaticProps(context){
    const productId = context.params.productId
    if(!ObjectId.isValid(productId) || !productId){
        return{
            notFound:true
        }
    }
    const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
    const db = client.db()
    const productsCollection = db.collection('products')
    const selectedProduct = await productsCollection.findOne({_id: ObjectId(productId)})
    client.close()
    console.log('selected products')
    console.log(selectedProduct)
    if(!selectedProduct || selectedProduct === {}){
        return{
            notFound:true
        }
    }
    return{
        props:{
            productData: {
                id: selectedProduct._id.toString(),
                name: selectedProduct.name,
                image: selectedProduct.image,
                priceFull: selectedProduct.price.full,
                priceCurrent: selectedProduct.price.current,
                category: selectedProduct.category,
                sport: selectedProduct.sport,
                sizes: selectedProduct.sizes,
                color: selectedProduct.color,
                brand: selectedProduct.brand,
                gender: selectedProduct.gender
            }
        }
    }
}

export default ProductDetail