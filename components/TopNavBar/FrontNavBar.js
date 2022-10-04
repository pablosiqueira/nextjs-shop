import Navbar from 'react-bootstrap/Navbar';
import Container  from 'react-bootstrap/Container';
import {GiShop} from 'react-icons/gi'
import NavCartIcon from './NavCartIcon';
import SearchBar from './SearchBar';
import classes from './TopNavBar.module.css'
import CategoriesBar from './CategoriesBar';
import {AiFillTool} from 'react-icons/ai'
import NavUSer from './NavUser';
import NavDev from './NavDev';
//https://coolors.co/a30018-262626-255c99-7ea3cc-ccad8f

const FrontNavBar = () => {
    return (
      <>
    <Navbar  variant='light' expand="lg" className={classes.bkgred}>

      <Container>
          <Navbar.Brand href="/" className={classes.fontNeues}><GiShop color='#CCAD8F' size='3rem'/> Sports Store</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className='justify-content-end'/>

          <Navbar.Collapse id="basic-navbar-nav">

            <SearchBar />  

            <NavUSer />

            <NavDev />

            <NavCartIcon />

          </Navbar.Collapse>
      </Container>

    </Navbar>

    <CategoriesBar />

    </>
    )
}

export default FrontNavBar