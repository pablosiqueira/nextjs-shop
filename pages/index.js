import React, {useEffect, useState} from "react"
import Head from "next/head"
import ActionsMenu from "../components/Home/ActionsMenu"
import NewProductList from "../components/Home/NewProductList"

const Home = (props) => {
  const [products,setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/get-products?limit=6')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setIsLoading(false)
      })
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Sports Store</title>
      </Head>
      <NewProductList products={products} loading={isLoading}/>
      <ActionsMenu />
    </React.Fragment>
  )
}




export default Home
