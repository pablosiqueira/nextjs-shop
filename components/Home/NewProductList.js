import NewProductCard from "./NewProductCard" 
import classes from './Home.module.css'

const NewProductList = props => {
    const placeholder = [0,1,2,3,4,5]
    return (
        <>
            <h1 className={"mb-0 text-center " + classes.newProdTitle}>New Arrivals</h1>
            <div className={"d-block mx-auto py-2 " + classes.newProdBody}>
                <div className="d-flex flex-wrap justify-content-center">
                    {!props.loading && props.products && props.products.map(product => {
                        return <NewProductCard product={product} loading={props.loading} key={product._id.toString()}/>
                    })}
                    {props.loading && placeholder.map(item => {
                        return <NewProductCard loading={props.loading} key={item}/>
                    })}
                </div>
            </div>
            <h1 className={"mb-0 text-center " + classes.newProdTitle} style={{color:'#A30018'}}>New Arrivals</h1>
        </>
    )
}

export default NewProductList