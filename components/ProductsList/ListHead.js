import Head from "next/head"

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
                    <h3 className='text-center my-2'>Search for "{props.search}"</h3>
                </>
            )}

            {!props.search && 
                <>
                    <Head>
                        <title>{fixedCategory} - Sports Store</title>
                    </Head>
                    {fixedCategory === 'All products' && <h3 className='text-center my-2'>All Products</h3>}
                    {fixedCategory !== 'All products' && <h3 className='text-center my-2'>Search in categories: "{fixedCategory}"</h3>}
                </>
            }

        </>
    )
}

export default ListHead