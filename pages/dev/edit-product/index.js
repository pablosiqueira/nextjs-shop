import Head from "next/head"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ProductList from "../../../components/ProductsList/ProductsList";
import { useState,useRef, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

const EditProductSearchPage = props => {
    const [isLoading, setIsLoading] = useState(false)
    const searchNameRef = useRef()
    const router = useRouter()

    const submitHandler = (event) => {
        event.preventDefault()
        setIsLoading(true)
        router.query.search = searchNameRef.current.value
        router.query.page = 1
        router.push(router)
    }

    useEffect(() => {
        console.log('effect')
        console.log(router.isReady)
        router.isReady && setIsLoading(false)
      }, [router])

    return(
        <>
            <Head>
                <title>Edit Product - Sports Store</title>
            </Head>
            <h1 className='text-center my-4'>Edit Product</h1>
            <Form className='d-block mx-auto' onSubmit={submitHandler} style={{maxWidth:'500px'}}>
                <FloatingLabel className="mb-3" controlId="name" label='Product Name'>
                    <Form.Control type="text" placeholder="Enter product name" ref={searchNameRef}/>
                </FloatingLabel>
                <Button className="d-block mx-auto" variant="dark" type="submit">
                {!isLoading && 'Search by name'}
                {isLoading && <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />}
                </Button>
            </Form>
            {isLoading && <h5 className="text-center my-4">Loading...</h5>}
            {!isLoading && props.products && <ProductList products={props.products} productsSize={props.productsSize} mode='edit'/>}
        </>
    )
}



export async function getServerSideProps({params, query}){
    console.log(query)
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    const productsCollection = db.collection('products')
    let searchTerms = {}
    
    if(query.search){
      const word = new RegExp(query.search,'i')
      searchTerms = {name: word }
    }
  
    console.log(searchTerms)
    const selectedSize = await productsCollection.countDocuments(searchTerms)
    console.log('size: ' + selectedSize)
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
      
    const selectedProducts = await productsCollection.find(searchTerms).sort(sortQuery).skip((currentPage - 1)*20).limit(20).toArray()
    let recievedProducts = []
    selectedProducts.map(selectedProduct => {
      recievedProducts.push({
                  id: selectedProduct._id.toString(),
                  name: selectedProduct.name,
                  image: selectedProduct.image,
                  priceCurrent: selectedProduct.price.current,
      })
    })
    console.log(selectedProducts)
    client.close() 
    return{
        props:{
            products: recievedProducts,
            productsSize: selectedSize
        }
    }
  }

export default EditProductSearchPage