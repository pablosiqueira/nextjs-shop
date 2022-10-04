import Head from "next/head"
import classes from './ProductsList.module.css'

const ListHead = props => {
    console.log(props.category)
    let fixedCategory = props.category.join(', ').replaceAll('all','')
    if(fixedCategory === ''){
        fixedCategory = 'All products'
    }
    return (
        <>
            {props.search && (
                <>
                    <Head>
                        <title>{props.search} - Sports Store</title>
                    </Head>
                    <h3 className={'text-center my-2 ' + classes.fontRoboto}>Search for "{props.search}"</h3>
                </>
            )}

            {!props.search && 
                <>
                    <Head>
                        <title>{fixedCategory} - Sports Store</title>
                    </Head>
                    {fixedCategory === 'All products' && <h3 className={'text-center my-4 ' + classes.fontRoboto}>All Products</h3>}
                    {fixedCategory !== 'All products' && <h3 className={'text-center my-4 ' + classes.fontRoboto}>Search in categories: <i>&quot;{fixedCategory}&quot;</i></h3>}
                </>
            }

        </>
    )
}

export default ListHead