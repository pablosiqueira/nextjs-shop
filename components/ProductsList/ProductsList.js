import Row from 'react-bootstrap/Row';
import ProductCard from './ProductCard';
import ListHead from './ListHead';
import ListSort from './ListSort';
import ProductsPagination from './ProductsPagination';

const ProductList = (props) => {
    console.log(props.products)
    return (
        <>
            {props.mode === 'show' && <ListHead search={props.search} category={props.category}/>}
            
            <div className='d-block mx-auto px-4 my-4'>
                {!props.loading && props.products.length > 0 &&
                <>
                <ListSort size={props.productsSize}/>

                <Row xs={1} md={2} lg={4} className="g-4 mx-auto justify-content-center" style={{maxWidth:'1000px'}}>
                    {props.products.map( product => (
                        <ProductCard product={product} key={product.id} mode={props.mode}/>
                    ))}  
                </Row>

                <ProductsPagination size={props.productsSize} total={props.productsSize}/>        
                </>
                
                }
                {!props.loading && props.products.length === 0 && <h3 className='text-center'>No results found</h3>}  
            </div>      
        </>
      );
}

export default ProductList