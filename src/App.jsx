// File: src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import Producto from './Pages/Producto.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import Demo from './Pages/Demo.jsx';
import Cart from './Pages/Cart.jsx';
import Checkout from './Pages/Checkout.jsx';
import Account from './Pages/Account.jsx';

// Corrected Auth Page Imports
import LoginPage from "./Pages/Login.jsx"; // Assuming Login.jsx exports LoginPage
import SignUpPage from "./Pages/SignUp.jsx"; // Create SignUp.jsx and move the component there

// Legal Page Imports
import Privacy from './Pages/Privacy.jsx';
import Legal from './Pages/Legal.jsx';
import Tnc from './Pages/Terms.jsx';
import Provider from './Pages/Provider.jsx';

// Context and Hooks
import { useAuth } from '/src/hooks/useAuth.js';
import { CartProvider } from '/src/context/Cartcontext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';


const App = () => {
    const { currentUser } = useAuth();

    return (
        <ThemeProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/products/c/:category?" element={<Products />} />
                        <Route path="/products/:productId" element={<Producto />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/demo" element={<Demo />} />

                        {/* Auth Routes - Redirect if logged in */}
                        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/account" />} />
                        <Route path="/signup" element={!currentUser ? <SignUpPage /> : <Navigate to="/account" />} />

                        {/* Protected Routes - Redirect if not logged in */}
                        <Route path="/account" element={currentUser ? <Account /> : <Navigate to="/login" />} />
                        <Route path="/checkout" element={currentUser ? <Checkout /> : <Navigate to="/login" />} />

                        {/* Other Routes */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/privacy" element={<Privacy/>}/>
                        <Route path="/legal" element={<Legal/>}/>
                        <Route path="/provider" element={<Provider/>}/>
                        <Route path="/tnc" element={<Tnc/>}/>
                    </Routes>
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
};

export default App;