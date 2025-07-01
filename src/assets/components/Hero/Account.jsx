import React, { useEffect, useState } from 'react';
import { useAuth } from '/src/hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero.jsx';
import Stickyhero from './Stickyhero.jsx';
import vid1 from './signvideo.mp4';
import './Home.css';
import Fhero from './Footer';

const AccountPage = () => {
  useEffect(() => {
    document.title = "Sonora - Account";
  }, []);
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-medium text-white">Profile Information</h2>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center border border-white/20">
                <span className="text-3xl font-bold text-white/70">
                  {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-white/70 text-sm">Profile Picture</p>
                <button className="text-sm bg-transparent border border-white/50 text-white px-4 py-2 rounded-sm hover:bg-white/10 transition-all duration-300">
                  Upload Photo
                </button>
              </div>
            </div>
            <div className="space-y-4 text-lg">
              <p className="flex justify-between"><span className="text-white/70">Name:</span> {currentUser.displayName || 'Not set'}</p>
              <p className="flex justify-between"><span className="text-white/70">Email:</span> {currentUser.email}</p>
            </div>
            <button className="mt-6 text-sm bg-white/20 border border-white/30 text-white px-6 py-3 rounded-sm hover:bg-white/30 transition-all duration-300">
              Edit Profile
            </button>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-medium text-white">Past Orders</h2>
            <p className="text-white/70 mb-4">You haven't placed any orders yet.</p>
            <button className="text-sm bg-white/20 border border-white/30 text-white px-6 py-3 rounded-sm hover:bg-white/30 transition-all duration-300">
              View Orders
            </button>
          </div>
        );
      case 'wishlist':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-medium text-white">Wishlist</h2>
            <p className="text-white/70 mb-4">Your wishlist is empty.</p>
            <button className="text-sm bg-white/20 border border-white/30 text-white px-6 py-3 rounded-sm hover:bg-white/30 transition-all duration-300">
              View Wishlist
            </button>
          </div>
        );
      case 'addresses':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-medium text-white">Addresses</h2>
            <p className="text-white/70 mb-4">No addresses saved yet.</p>
            <button className="text-sm bg-white/20 border border-white/30 text-white px-6 py-3 rounded-sm hover:bg-white/30 transition-all duration-300">
              Add Address
            </button>
          </div>
        );
      case 'reviews':
        return (
          <div className="p-6">
            <h2 className="text-2xl mb-6 font-medium text-white">Reviews</h2>
            <p className="text-white/70 mb-4">You haven't written any reviews yet.</p>
            <button className="text-sm bg-white/20 border border-white/30 text-white px-6 py-3 rounded-sm hover:bg-white/30 transition-all duration-300">
              Write a Review
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-[130vh] flex flex-col items-center relative font-roboto">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="absolute -z-20 w-auto min-w-full min-h-full max-w-none object-cover"
          style={{
            filter: 'grayscale(100%) brightness(60%)'
          }}
        >
          <source src={vid1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div 
          className="absolute inset-0 -z-19"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 1) 95%)",
            backgroundSize: 'auto',
            backgroundPosition: 'top',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'scroll'
          }}
        />
        <div className="relative z-10 w-full">
          <Hero />
          <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
            <Stickyhero />
          </div>
          <div className="flex justify-center items-start h-full mt-[7vh] mb-[5vh] px-4">
            <div className="bg-[rgba(0,0,0,0.62)] text-white shadow-2xl animate-[show_1s_ease] py-7 px-0 w-[60vw] rounded-md overflow-hidden" id="shado">
              <h1 className="text-4xl mb-6 flex justify-center items-center font-thin tracking-wider px-10">My Account</h1>
              <div className="flex flex-row min-h-[60vh]">
                <div className="w-[18vw] bg-[rgba(0,0,0,0.4)] border-r border-white/10">
                  <ul className="space-y-1 pt-4">
                    <li 
                      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${activeTab === 'profile' ? 'bg-white/10 border-l-4 border-white/80 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => handleTabChange('profile')}
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" />
                          <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" />
                        </svg>
                        Profile
                      </span>
                    </li>
                    <li 
                      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${activeTab === 'orders' ? 'bg-white/10 border-l-4 border-white/80 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => handleTabChange('orders')}
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" />
                          <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                          <path d="M9 21V9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Past Orders
                      </span>
                    </li>
                    <li 
                      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${activeTab === 'wishlist' ? 'bg-white/10 border-l-4 border-white/80 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => handleTabChange('wishlist')}
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" />
                        </svg>
                        Wishlist
                      </span>
                    </li>
                    <li 
                      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${activeTab === 'addresses' ? 'bg-white/10 border-l-4 border-white/80 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => handleTabChange('addresses')}
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Addresses
                      </span>
                    </li>
                    <li 
                      className={`px-6 py-4 cursor-pointer transition-all duration-200 ${activeTab === 'reviews' ? 'bg-white/10 border-l-4 border-white/80 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => handleTabChange('reviews')}
                    >
                      <span className="flex items-center">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 17L17 20L15 14L20 9H13L12 2L11 9H4L9 14L7 20L12 17Z" fill="currentColor" />
                        </svg>
                        Reviews
                      </span>
                    </li>
                  </ul>
                  <div className="px-6 pt-6 mt-8 border-t border-white/10">
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 bg-red-600/10 tracking-[0.2em] font-sans border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-sm rounded-sm"
                    >
                      SIGN OUT
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-[rgba(0,0,0,0.2)]">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full z-10 relative">
        <Fhero />
      </div>
    </>
  );
};

export default AccountPage;
