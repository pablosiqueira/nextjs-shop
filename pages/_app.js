import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontNavBar from '../components/TopNavBar/FrontNavBar';
import React from 'react';
import FooterInfo from '../components/Footer/FooterInfo';
import CartContextProvider from '../context/cart-context';
import UserContextProvider from '../context/user-context';
import SSRProvider from 'react-bootstrap/SSRProvider';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
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
      </React.Fragment>
    </SSRProvider>
    )
}

export default MyApp
