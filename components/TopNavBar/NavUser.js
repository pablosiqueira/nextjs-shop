import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import {FaUserCircle} from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import classes from './TopNavBar.module.css'
import { UserContext } from '../../context/user-context'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

const NavUser = props => {
    const userCtx = useContext(UserContext)
    //<FaUserCircle color='#262626' size='2.5rem'/>
    console.log(userCtx.user)
    return(
        <>
        <Nav>
            {!userCtx.user && 
            <Link href='/user'>
                <Button className={classes.ctglink} variant='link'><b>Login/Register</b></Button>
            </Link>}
            {userCtx.user && 
            <Dropdown className='text-center'>
            <Dropdown.Toggle variant="link" id="dropdown-user" className={classes.ctglink}>
                <FaUserCircle color='#262626' size='2.5rem'/> Hello {userCtx.user.name.split(' ')[0]}
            </Dropdown.Toggle>
      
            <Dropdown.Menu className={classes.fontRoboto}>
              <Dropdown.Item href="/user">My Account</Dropdown.Item>
              <Dropdown.Item href={"/user/orders/" + userCtx.user._id}>My Orders</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={userCtx.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            }
            
        </Nav>
        </>
    )
}

export default NavUser