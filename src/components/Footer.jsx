import React from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const Footer = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Dynamic style for CSS variable to control underline color based on theme
  const underlineStyle = {
    '--underline-color': isDarkMode ? '#ffffff' : '#000000', // White in dark mode, black in light mode
  };

  return (
    <div style={underlineStyle}>
      <style jsx>{`
        a {
          display: inline-block;
          position: relative;
        }
        
        a::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: var(--underline-color, #ffffff);
          transition: transform 0.5s ease-out;
        }
        
        a:hover::after {
          transform: scaleX(1);
          transform-origin: bottom center;
        }
      `}</style>
      <div className={`h-[85vh] w-screen pt-[40vh] text-[0.7em] lg:text-[1em] ${isDarkMode ? 'bg-black' : 'bg-white'} font-roboto text-100 relative`}>
        <div
          id="bottomnav"
          className={`px-10 h-full ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100 bg-transparent backdrop-blur-sm flex flex-col justify-center items-center text-[19px] gap-[30px] tracking-[0.25em] font-roboto`}
        >
          <hr className={`w-[90%] pb-2 lg:pb-0 border-t mb-6 ${isDarkMode ? 'border-white/80' : 'border-black/80'}`} style={{ borderWidth: '0.5px' }} />
          <div className="h-[calc(40vh-17vh)] flex flex-col md:flex-row justify-center items-center text-[19px] gap-8 md:gap-16 tracking-[0.15em] font-roboto">
            <a href="/src/Pages/Provider" id="a1" className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}>
              Provider
            </a>
            <a href="/src/Pages/Legal" id="a2" className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}>
              Legal
            </a>
            <a href="/src/Pages/Privacy" id="a3" className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}>
              Privacy
            </a>
            <a href="/src/Pages/Products" id="a4" className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}>
              Store
            </a>
            <a href="/src/Pages/Contact" id="a5" className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}>
              Contact
            </a>
          </div>
          <div className="w-full max-w-4xl text-center pt-11">
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'} transition-all duration-300`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'} transition-all duration-300`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.264-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className={`${isDarkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'} transition-all duration-300`}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>
          <div
            onClick={() => navigate('/')}
            className={`cursor-pointer w-screen text-[50px] tracking-widest ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} flex flex-col justify-center items-center text-center font-aboreto font-100 mb-8`}
          >
            SONORA
            <span className={`text-[12px] flex flex-row gap-2 font-times ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <span className="tracking-normal">by</span> HARMAN
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the navigate('/') from parent div
              scrollToTop();
            }}
            className="w-14 h-14 bg-transparent rounded-full flex items-center justify-center transition-all duration-300 mb-6"
            aria-label="Scroll to top"
          >
            <svg
              className={`w-12 h-12 ${isDarkMode ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black'} duration-200`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 5L6 11M12 5L18 11"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
