import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import classes from './TopNavBar.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import {BsGearFill} from 'react-icons/bs'

const NavDev = props => {
    //<FaUserCircle color='#262626' size='2.5rem'/>
    return(
        <>
        <Nav className='text-center'>
            <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-dev" className={classes.ctglink}>
                <BsGearFill color='#262626' size='2.5rem'/>
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item href={"/dev/add-product"}>Add Product</Dropdown.Item>
              <Dropdown.Item href={"/dev/edit-product/"}>Edit Product</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        </>
    )
}

export default NavDev