// File: src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your new component.
// Note: Adjust the path if you place ScrollToTop.jsx elsewhere.
import ScrollToTop from './assets/components/Hero/ScrollToTop.jsx';

// Your other component imports
import Home from './assets/components/Hero/homebackup.jsx';
import Signin from './assets/components/Hero/Signin.jsx';
import Products from './assets/components/Hero/Products.jsx';
import Login from './assets/components/Hero/Login.jsx';
import Producto from './assets/components/Hero/Producto.jsx';
import ProductsIEM from './assets/components/Hero/ProductsIEM.jsx';
import ProductsHEADPH from './assets/components/Hero/ProductsHEADP.jsx';
import About from './assets/components/Hero/About.jsx';
import Privacy from './assets/components/Hero/Privacy.jsx';
import Legal from './assets/components/Hero/Legal.jsx';
import Provider from './assets/components/Hero/Provider.jsx';
import Demo from './assets/components/Hero/Demo.jsx';
import { useAuth } from '/src/hooks/useAuth.js';
import Account from './assets/components/Hero/Account.jsx';
import Cart from './assets/components/Hero/Cart.jsx';
import { CartProvider } from '/src/context/Cartcontext.jsx';
import Contact from './assets/components/Hero/Contact.jsx';
import Checkout from './assets/components/Hero/Checkout.jsx';
import Tnc from './assets/components/Hero/Terms.jsx';
import { ThemeProvider } from './assets/components/Hero/ThemeContext.jsx';


const App = () => {
  const { currentUser } = useAuth();
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          {/* This component will now manage scroll behavior for the entire app */}
          <ScrollToTop />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/products/c/:category?" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:productId" element={<Producto />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy/>}/>
            <Route path="/legal" element={<Legal/>}/>
            <Route path="/provider" element={<Provider/>}/>
            <Route path="/demo" element={<Demo/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/tnc" element={<Tnc/>}/>
            <Route path="/account" element={currentUser ? <Account /> : <Login />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
