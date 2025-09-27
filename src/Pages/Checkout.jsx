import React, { useEffect } from 'react';
import { useCart } from '/src/context/Cartcontext.jsx';
import { useAuth } from '/src/hooks/useAuth.js';
import { useNavigate, Link } from 'react-router-dom';
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Footer from '../components/Footer.jsx';

const CheckoutPage = () => {
  useEffect(() => {
    document.title = "Sonora - Checkout";
  }, []);
  const navigate = useNavigate();
  const { items, total, itemCount, isLoading } = useCart();
  const { currentUser } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const calculateItemTotal = (price, quantity) => {
    return (price * quantity).toLocaleString('en-IN');
  };

  const handlePlaceOrder = () => {
    // Placeholder for order processing logic (to be integrated with Firebase or Stripe)
    alert('Order placed successfully! (Placeholder action)');
    navigate('/order-confirmation'); // Redirect to a confirmation page (to be created)
  };

  return (
    <>
    <div className="font-roboto tracking-widest min-h-[150vh] flex flex-col items-center relative">
      {/* Background image with grayscale and brightness, scrolls with content */}
      <div 
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: "url(https://www.sennheiser-hearing.com/_next/image/?url=https%3A%2F%2Feu-central-1-akqa.graphassets.com%2FAGz66yvUcQ42Ggm7CrXdgz%2FzhbwLugYSXuAwQMaEN9m&w=1920&q=75)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) brightness(60%)',
          backgroundAttachment: 'scroll'
        }}
      />
      {/* Separate overlay for gradual linear gradient to black at bottom */}
      <div 
        className="absolute inset-0 -z-19"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 80%)",
          backgroundSize: 'auto',
          backgroundPosition: 'top',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'scroll'
        }}
      />
      
      <div className="relative z-10 w-full">
        <Header_top />
        {/* Sticky navbar */}
        <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
          <Header_sticky />
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl min-h-[100vh]">
          <h1 className="text-3xl text-white font-aboreto font-medium mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                {currentUser ? (
                  <div className="space-y-4">
                    <p className="text-gray-700">Logged in as: <strong>{currentUser.email}</strong></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Shipping Address</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="save-info"
                        className="mr-2"
                      />
                      <label htmlFor="save-info" className="text-sm text-gray-600">Save this information for next time</label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700">Proceed as a guest or sign in for a faster checkout.</p>
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
                      >
                        Sign In
                      </Link>
                      <button
                        className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-200"
                      >
                        Continue as Guest
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter email for order confirmation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Shipping Address</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="border border-gray-300 rounded p-3">
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment-method"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="credit-card" className="font-medium">Credit/Debit Card</label>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">CVC</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded p-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="digital-wallet"
                        name="payment-method"
                        className="mr-2"
                      />
                      <label htmlFor="digital-wallet" className="font-medium">Digital Wallet (UPI, PayPal, etc.)</label>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 14.17L16.59 7.58L18 9L10 17L6 13L7.41 11.59L10 14.17Z" fill="currentColor" />
                    </svg>
                    Secured payment with SSL encryption
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow p-6 sticky top-[12vh]">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                <div className="max-h-40 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.quantity}`} className="flex py-2 border-b border-gray-200">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p>INR {calculateItemTotal(item.price, item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>INR {total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>INR {total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors duration-200 mt-4"
                >
                  Place Order
                </button>
                <div className="mt-4 text-sm text-gray-500 text-center">
                  <p>30-day return policy • Free shipping on all orders</p>
                </div>
                <div className="mt-3 text-center">
                  <Link
                    to="/cart"
                    className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CheckoutPage;
