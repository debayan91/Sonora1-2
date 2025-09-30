import React from 'react';
import { useEffect } from 'react';
import { useCart } from '/src/context/Cartcontext.jsx';
import { useAuth } from '/src/hooks/useAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Footer from '../components/Footer.jsx';
import Prodata from '../components/Prodata.js';
import { useTheme } from '../context/ThemeContext.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Implement theme change logic
  const clicky = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };
  useEffect(() => {
    document.title = "Sonora - Cart";
  }, []);
  const {
    items,
    total,
    itemCount,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading
  } = useCart();

  const { currentUser } = useAuth();

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  const calculateItemTotal = (price, quantity) => {
    return (price * quantity).toLocaleString('en-IN');
  };
  return (
    <>
    <div className={`font-roboto tracking-widest min-h-screen flex flex-col items-center relative`}>
      <div
        className="absolute inset-0 -z-20"
      />
      <div
        className="absolute inset-0 -z-19"
        style={{
          background: isDarkMode 
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 80%)"
            : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.5) 70%, rgba(255, 255, 255, 1) 100%)"
        }}
      />
      <div className="relative z-10 w-full">
        <Header_top />
        <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
          <Header_sticky />
        </div>

        <div className={`container mx-auto px-4 py-8 max-w-6xl min-h-[100vh] ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <h1 className="text-3xl text-center tracking-widest font-medium mb-8">{`Cart - ${itemCount}`}</h1>

          {items.length === 0 ? (
            <div className={`rounded-lg shadow p-8 text-center border ${isDarkMode ? 'bg-black bg-opacity-50 backdrop-blur-lg' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`} style={{ borderColor: 'rgba(255, 255, 255, 0.9)' }}>
              <h2 className="text-2xl mb-4">Your cart is empty</h2>
              <Link
                to="/products/c"
                className={`inline-block px-6 py-3 rounded transition-colors duration-200 ${isDarkMode ? 'bg-black text-white hover:bg-white/10' : 'bg-white text-black hover:bg-gray-200'}`}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className={`rounded-lg shadow overflow-hidden border ${isDarkMode ? 'bg-black bg-opacity-50 border-none shadow-[rgb(255,255,255,0.19)] shadow-2xl backdrop-blur-lg' : 'bg-white bg-opacity-50 backdrop-blur-lg'} `}>
                  <div className={``} style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {items.map((item) => (
                      <div key={`${item.id}-${item.quantity}`} className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/4 aspect-square  rounded-lg overflow-hidden p-3 bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <h3 onClick={() => {
                              const product = Prodata.find(p => p.id === item.id);
                              if (product) clicky(product);
                            }}
                              className="text-xl cursor-pointer font-medium">{item.name}</h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className={`pr-2 hover:text-red-500 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <span className='text-2xl'>×</span>
                            </button>
                          </div>
                          <p className={`text-[0.9em] mb-2 font-sans ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.brand}</p>
                          <p className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>INR {item.price.toLocaleString('en-IN')}</p>
                          <div className="mt-auto flex items-center">
                            <div className={`flex items-center border rounded`} style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className={`px-3 py-1 text-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-black'}`}
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <span className={`px-4 py-1 border-x ${isDarkMode ? 'text-white ' : 'text-black'}`} >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className={`px-3 py-1 text-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-black'}`}
                              >
                                +
                              </button>
                            </div>
                            <div className={`ml-auto text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                              INR {calculateItemTotal(item.price, item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 border-t flex justify-end  `} style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <button
                      onClick={clearCart}
                      className={`hover:text-red-300 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className={`rounded-lg shadow p-6 sticky top-[12vh] border ${isDarkMode ? 'bg-black bg-opacity-50 backdrop-blur-lg border-none shadow-[rgb(255,255,255,0.19)] shadow-2xl' : 'bg-white bg-opacity-50 backdrop-blur-lg'}`} style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  <div className={`space-y-4 mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>INR {total.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>FREE</span>
                    </div>

                    <div className={`border-t pt-4 flex justify-between font-medium text-lg`} style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                      <span>Total</span>
                      <span>INR {total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {currentUser ? (
                    <button
                      className={`w-full py-3 rounded transition-colors duration-200 ${isDarkMode ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Please sign in to checkout</p>
                      <Link
                        to="/login"
                        className={`w-full py-3 rounded transition-colors duration-200 block ${isDarkMode ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                  <div className={`mt-4 text-sm text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <p>30-day return policy • Free shipping on all orders</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CartPage;
