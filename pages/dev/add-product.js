import AddProductForm from "../../components/AddProduct/AddProductForm"
import Head from "next/head"

const AddProductPage = props => {

    async function addProductHandler(enteredData){
        console.log(enteredData)
        console.log(JSON.stringify(enteredData))
        const response = await fetch('/api/add-product',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
    }

    return (
    <>
        <Head>
            <title>Add Product - Sports Store</title>
        </Head>
        <h1 className='text-center my-4' style={{fontFamily: 'Roboto Condensed, sans-serif'}}>Add Product</h1>
        <AddProductForm onAddProduct={addProductHandler} mode='add' modalMessage='Created Product'/>
    </>
    )
}

export default AddProductPage