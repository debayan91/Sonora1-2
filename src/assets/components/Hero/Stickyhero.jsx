import React, { useEffect, useState, useRef } from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '/src/context/Cartcontext.jsx';
import { Link } from 'react-router-dom';
import Prodata from './Prodata';
import { useTheme } from './ThemeContext';

const Stickyhero = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { isDarkMode } = useTheme();
  const products = Prodata;
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);
  // NEW: Ref to manage re-animation requests
  const animationFrameRef = useRef(null);


  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };


  const handleSelect = (product) => {
    setQuery(product.name);
    setFilteredProducts([]);
    navigate(`/products/${product.id}`, { state: { product } });
  };


  useEffect(() => {
    const links = document.querySelectorAll('#a1, #a2, #a3, #a4, #a5');
    links.forEach(link => {
      link.style.transition = 'color 0.4s ease-in-out';
      link.addEventListener('mouseenter', () => {
        links.forEach(l => {
          if (l === link) {
            l.style.color = isDarkMode ? 'white' : 'black';
          } else {
            l.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.579)' : 'rgba(0, 0, 0, 0.579)';
          }
        });
      });
      link.addEventListener('mouseleave', () => {
        links.forEach(l => {
          l.style.color = isDarkMode ? 'white' : 'black';
        });
      });
    });
  }, [isDarkMode]);


  const underlineStyle = {
    '--underline-color': isDarkMode ? '#ffffff' : '#000000',
  };


  const dropdownColors = {
    a1: '#FFFFFF',
    a2: '#E0E0E0',
    a3: '#C0C0C0',
    a4: '#A0A0A0',
  };

  // --- MODIFIED: Robust hover logic ---

  // Cancels any pending closing operation
  const cancelCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
    }
  };

  // Starts the timer that will close the dropdown
  const startCloseTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms delay before closing allows for travel time
  };

  const handleMouseEnter = (dropdownId) => {
    cancelCloseTimer(); // Stop any pending close operation

    // If a different dropdown is already visible, we need to re-trigger the animation
    if (activeDropdown && activeDropdown !== dropdownId) {
        setActiveDropdown(null); // Start closing the old one
        // Use requestAnimationFrame to open the new one on the next paint
        animationFrameRef.current = requestAnimationFrame(() => {
            setActiveDropdown(dropdownId);
        });
    } else {
        // Otherwise, just open it
        setActiveDropdown(dropdownId);
    }
  };

  // --- End of modified logic ---


  useEffect(() => {
    // Cleanup timers on component unmount
    return () => {
      cancelCloseTimer();
    };
  }, []);


  return (
    <div id="bottomnav" className={`relative w-screen bg-transparent flex z-[9999999] flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100`} style={underlineStyle}>
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
      <div id="bottomnav" className={`px-10 ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100 ${isDarkMode ? 'bg-gradient-to-br from-[rgba(0,0,0,0.89)] to-[rgba(0,0,0,0.78)]' : 'bg-gradient-to-br from-[rgba(255,255,255,0.89)] to-[rgba(255,255,255,0.78)]'} backdrop-blur-sm flex flex-row justify-between items-center text-[19px] gap-14 tracking-[0.25em] font-roboto ${isDarkMode ? 'border-b-[rgba(255,255,255,0.2)]' : 'border-b-[rgba(0,0,0,0.2)]'} border-b-[1px]`}>
        <div className='flex z-500 flex-row justify-between items-center text-[19px] gap-14 tracking-[0.25em] font-roboto'>
          <a
            href="/products/c/headphones"
            id="a1"
            className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}
            onMouseEnter={() => handleMouseEnter('a1')}
            onMouseLeave={startCloseTimer} // MODIFIED
          >
            Headphones
          </a>
          <a
            href="/products/c/iems"
            id="a2"
            className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}
            onMouseEnter={() => handleMouseEnter('a2')}
            onMouseLeave={startCloseTimer} // MODIFIED
          >
            In-Ears
          </a>
          <a
            href="/about"
            id="a3"
            className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}
            onMouseEnter={() => handleMouseEnter('a3')}
            onMouseLeave={startCloseTimer} // MODIFIED
          >
            About
          </a>
          <a
            href="/products/c"
            id="a4"
            className={`${isDarkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-all duration-300`}
            onMouseEnter={() => handleMouseEnter('a4')}
            onMouseLeave={startCloseTimer} // MODIFIED
          >
            Store
          </a>
        </div>
        <div className='flex justify-center items-center gap-5'>
          <div className='h-[1.5em] rounded-sm w-[10em] relative'>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleSearch}
              className={`w-full h-[30px] pl-4 pr-10 text-[15px] rounded-sm tracking-wider ${isDarkMode ? 'bg-[rgba(0,0,0,0.15)] text-white placeholder-[rgba(255,255,255,0.7)] focus:bg-[rgba(0,0,0,0.3)]' : 'bg-[rgba(255,255,255,0.15)] text-black placeholder-[rgba(0,0,0,0.7)] focus:bg-[rgba(255,255,255,0.3)]'} focus:outline-none focus:ring-0 transition-all duration-[500ms]`}
            />
            {filteredProducts.length > 0 && (
              <ul className={`absolute z-50 w-full ${isDarkMode ? 'bg-[rgba(0,0,0,0.67)] text-white' : 'bg-[rgba(255,255,255,0.67)] text-black'} backdrop-blur-sm rounded-md mt-1 shadow-lg max-h-60 text-[17px] overflow-y-auto`}>
                {filteredProducts.map((product, index) => (
                  <li
                    key={index}
                    className={`p-2 ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-black'} cursor-pointer`}
                    onClick={() => handleSelect(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
            <svg
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.7)]'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className={`h-[80%] aspect-square flex items-center justify-center cursor-pointer ${isDarkMode ? 'hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:bg-[rgba(0,0,0,0.1)] hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]'} rounded-full transition-all duration-200`}>
            <svg
              className={`h-6 w-6 ${isDarkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(0,0,0,0.8)]'}`}
              fill="none"
              onClick={() => navigate('/account')}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className={`h-[80%] aspect-square flex items-center justify-center cursor-pointer ${isDarkMode ? 'hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:bg-[rgba(0,0,0,0.1)] hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]'} rounded-full`}>
            <Link to="/cart" className="relative">
              <svg
                className={`h-6 w-6 ${isDarkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(0,0,0,0.8)]'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className={`absolute -top-1 tracking-tighter -right-1 ${isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'} border font-sans text-[9px] rounded-full h-4 w-4 flex items-center justify-center`}>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      <div
        className={`
          absolute top-full left-0 w-screen overflow-hidden
          transition-[max-height,opacity,background-color] duration-500 ease-in-out
          ${activeDropdown ? 'max-h-[25vh] opacity-100' : 'max-h-0 opacity-0'}
        `}
        style={{
          // MODIFIED: Also transition the background color smoothly
          backgroundColor: activeDropdown ? dropdownColors[activeDropdown] : 'transparent',
          zIndex: 9999998,
        }}
        onMouseEnter={cancelCloseTimer} // MODIFIED: Keep it open when mouse enters
        onMouseLeave={startCloseTimer}   // MODIFIED: Start closing when mouse leaves
      >
        <div className="h-[25vh] w-full flex items-center justify-center">
          {activeDropdown === 'a1' && <p>Headphones Dropdown Content Here</p>}
          {activeDropdown === 'a2' && <p>In-Ears Dropdown Content Here</p>}
          {activeDropdown === 'a3' && <p>About Dropdown Content Here</p>}
          {activeDropdown === 'a4' && <p>Store Dropdown Content Here</p>}
        </div>
      </div>
    </div>
  );
};


export default Stickyhero;
