import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';

const ListSort = props => {
    const router = useRouter()
    const sortProds = (event) => {
        event.preventDefault()
        const url = router
        console.log(router)
        console.log(event.target.value)
        router.query.order = event.target.value
        router.push(router)
    }
    return(
        <>
        <div className="d-flex fex-wrap justify-content-between align-items-center mb-4 mx-auto" style={{maxWidth:'980px'}}>
                <span ><i>Found {props.size} products</i></span>
                <Form.Select aria-label="Sort by" style={{width:'auto'}} onChange={sortProds}>
                    <option value="new">Newest Arrivals</option>
                    <option value="priceasc">Price: Low to High</option>
                    <option value="pricedesc">Price: High to Low</option>
                </Form.Select>
        </div>
        </>
    )
}

export default ListSort