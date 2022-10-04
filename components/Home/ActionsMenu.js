import Link from "next/link"
import {HiOutlineShoppingBag} from 'react-icons/hi'
import {FaUserCircle} from 'react-icons/fa'
import {MdOutlineEditNote, MdPlaylistAdd} from 'react-icons/md'
import classes from './Home.module.css'
import Image from "react-bootstrap/Image"

const ActionsMenu = props => {
    return(
    <>
        <section className={"d-flex text-center flex-wrap " + classes.actionsSection}>
            <Link href='/products/all'>
                <a className={classes.actionLink} variant="outline-secondary">
                    <HiOutlineShoppingBag size='5rem'/>
                    <p>Browse Products</p> 
                </a>
            </Link>

            <Link href='/dev/add-product'>
              <a className={classes.actionLink} variant="outline-secondary">
                <MdPlaylistAdd size='5rem'/>
                <p>Add Product</p>
              </a>
            </Link>

            <Link href='/dev/edit-product'>
              <a className={classes.actionLink} variant="outline-secondary">
                <MdOutlineEditNote size='5rem'/>
                <p>Edit Product</p>
              </a>
            </Link>

            <Link href='/user'>
              <a className={classes.actionLink} variant="outline-dark">
                <FaUserCircle size='5rem'/>
                <p>Login/Register</p>
              </a>
            </Link>

      </section>
      <section className={classes.bottomDiv}>
        <Image src='/ballgroup3.png' className="d-block mx-auto py-4"/>
      </section>
    </>
    )
}

export default ActionsMenu