import { useRouter } from 'next/router';
import ProductList from '../../components/ProductsList/ProductsList';
import { MongoClient} from "mongodb"

const ProductsPage = (props) => {
    const router = useRouter();
    const terms = router.query.filters;
    const searchTerm = router.query.search

    return (
      <>
        <ProductList products={props.products} category={terms} search={searchTerm} productsSize={props.productsSize} mode='show'/>
      </>  
    )
}

export async function getServerSideProps({params, query}){
  console.log(query)
  const client = await MongoClient.connect('mongodb+srv://pablo:R5zA29LqqGhAM2Hm@cluster0.1gr6w.mongodb.net/products?retryWrites=true&w=majority')
  const db = client.db()
  const productsCollection = db.collection('products')
  let searchTerms = {}
  if(params.filters){
    const category = params.filters[0]
    const sport = params.filters[1]
    const brand = params.filters[2]
    if(category && category !== 'all'){
      searchTerms = {...searchTerms, category}
    }
    if(sport && sport !== 'all'){
      searchTerms = {...searchTerms, sport}
    }
    if(brand && brand != 'all'){
      searchTerms = {...searchTerms, brand}
    }
  }

  if(query.search){
    const word = new RegExp(query.search,'i')
    searchTerms = {...searchTerms, name: word }
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
                priceFull: selectedProduct.price.full,
                priceCurrent: selectedProduct.price.current,
                category: selectedProduct.category,
                sport: selectedProduct.sport,
                sizes: selectedProduct.sizes,
                color: selectedProduct.color,
                brand: selectedProduct.brand,
                gender: selectedProduct.gender
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





export default ProductsPage