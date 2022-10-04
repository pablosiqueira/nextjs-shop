import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductsPagination = props => {
    const router = useRouter()
    console.log(router.query.page)
    const [active, setActive] = useState(()=>{
        if(!router.query.page){
            return 1
        }else{
            return router.query.page
        }
    })

    let items = [];

    let numOfPages = parseInt((props.size/20))
        if(props.size%20 > 0){
            numOfPages++
        }

    let lastLimit
    if(active === numOfPages){
        lastLimit = props.total
    }else{
        lastLimit = (20*(active-1) + 1) + 19
    }
    if(numOfPages < 20){
        lastLimit = props.total
    }


    for (let number = 1; number <= numOfPages; number++) {
        console.log('number: ' + typeof number)
        console.log('active: ' + typeof active)
        console.log('numPages: ' + typeof numOfPages)
        console.log((number !== 1 && number !== numOfPages) && (number > active + 2 || number < active - 2))
 
    items.push(  
    <Pagination.Item className={
        (+number === +active || (+number < +active + 5 && +number > +active) || (number+5 > numOfPages)) ? '' : 'd-none'}
        key={number} active={number === active} onClick={() => changePage(number)}>
      {number}
    </Pagination.Item>,
    );

    }

    const changePage = (number) => {
        setActive(number)
        router.query.page = number
        router.push(router)
    }


    return (
        <>
        <div className="d-flex fex-wrap justify-content-between align-items-center my-4 mx-auto" style={{maxWidth:'980px'}}>
            <span>{20*(active-1) + 1} - {lastLimit} of {props.total} products</span>
              
            <Pagination>
                <Pagination.First onClick={() => changePage(1)}/>    
                <Pagination.Prev onClick={() => changePage(parseFloat(active) - parseFloat(1))}/>
                {items}
                <Pagination.Next onClick={() => changePage(parseFloat(active) + parseFloat(1))}/>
                <Pagination.Last onClick={() => changePage(numOfPages)}/>
            </Pagination>
        </div>
        </>
    )
}

export default ProductsPagination