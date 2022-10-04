import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import AddProductForm from "../../../components/AddProduct/AddProductForm"
import { useRouter } from "next/router"
import LoadingScreen from '../../../components/UI/LoadingScreen'

const EditProductPage = (props) => {
    const router = useRouter()
    async function editProductHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/edit-product?id=' + props.productData.id,{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
    }

    if (router.isFallback) {
        return (
        <>
        <Head>
            <title>Edit</title>
        </Head>
        <LoadingScreen />
        </>
        )
    }

    return <>
    <Head>
        <title>Edit - {props.productData.name}</title>
    </Head>
    <h1 className='text-center my-4' style={{fontFamily: 'Roboto Condensed, sans-serif'}}>Edit Product</h1>
    <AddProductForm onEditProduct={editProductHandler} product={props.productData} mode='edit' modalMessage='Edited Product'/>
    </>
}

export async function getStaticPaths(context){
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
    const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
    const db = client.db()
    const productsCollection = db.collection('products')
    const selectedProduct = await productsCollection.findOne({_id: ObjectId(productId)})
    client.close()

    if(!selectedProduct){
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

export default EditProductPage