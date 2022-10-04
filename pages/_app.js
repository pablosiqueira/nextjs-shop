import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontNavBar from '../components/TopNavBar/FrontNavBar';
import React from 'react';
import FooterInfo from '../components/Footer/FooterInfo';
import CartContextProvider from '../context/cart-context';
import UserContextProvider from '../context/user-context';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <UserContextProvider>
        <CartContextProvider>
          <FrontNavBar />
          <div id='frontDiv'>
          <Component {...pageProps} />
          </div>    
          <FooterInfo />
        </CartContextProvider>
      </UserContextProvider> 
    </React.Fragment>)
}

export default MyApp
