import Link from 'next/link'
import Head from 'next/head'
import {MdOutlineEditNote, MdPlaylistAdd} from 'react-icons/md'
import About from '../../components/Home/About'

const DevPage = () => {
    const actions = [
        {name:'Add Product', link:'/dev/add-product'},
        {name:'Edit Product', link:'/dev/edit-product'}
    ]
    return (
        <>
        <Head>
            <title>Developer Area</title>
        </Head>
        <h1 className='text-center'>Developer Area</h1>

        <section>
            <h3 className='text-center'>Actions</h3>
            <div className='d-flex flex-wrap justify-content-center text-center'>
                {actions.map(action => {
                    return (
                        <Link href={action.link} key={action.name}>
                        <div className='mx-4 my-2' style={{cursor:'pointer'}}>
                            {action.name==='Add Product' && <MdPlaylistAdd size='5rem'/>}
                            {action.name==='Edit Product' && <MdOutlineEditNote size='5rem'/>}
                            <h5>{action.name}</h5>
                        </div> 
                    </Link> 
                    )
                })}
            </div>
        </section>

        <About />
            
            
        </>
    )
}

export default DevPage