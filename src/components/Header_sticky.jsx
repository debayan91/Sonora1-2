import React, {useState, useEffect, useRef, useMemo } from 'react'; // Added useEffect, useRef, useMemo
import './hero.css';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '/src/context/Cartcontext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Prodata from './Prodata.js'; // Re-added for search functionality
import {useCallback } from 'react';
// --- IMPROVEMENT: Custom Hooks for reusability ---

// Debounces a value to prevent rapid re-renders/API calls
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

// Hook to detect clicks outside a specified element
const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};


// --- SUB-COMPONENTS (Memoized for Performance) ---

const SunIcon = React.memo(({ isDarkMode }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.77)" : "rgba(0,0,0,0.77)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 hover:rotate-90">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
));

const MoonIcon = React.memo(({ isDarkMode }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 hover:rotate-[20deg]">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
));

const ThemeToggleButton = React.memo(({ isDarkMode, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-1 rounded-full" aria-label="Toggle color theme">
        {isDarkMode ? <SunIcon isDarkMode={isDarkMode} /> : <MoonIcon isDarkMode={isDarkMode} />}
    </button>
));

const SearchBar = React.memo(({ query, handleSearch, isDarkMode, filteredProducts, handleSelect, searchRef }) => (
    // IMPROVEMENT: Added ref for click-outside detection
    <div ref={searchRef} className='h-[1.5em] rounded-sm w-full md:w-[10em] relative'>
        <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            className={`w-full h-[30px] pl-0 pr-10 text-[15px] bg-transparent uppercase rounded-none tracking-wider ${isDarkMode ? 'border-b border-b-[rgba(255,255,255,0.5)] text-white placeholder-[rgba(255,255,255,0.7)] focus:bg-[rgba(0,0,0,0.3)]' : 'border-b border-b-[rgba(0,0,0,0.5)] text-black placeholder-[rgba(0,0,0,0.7)] focus:bg-[rgba(255,255,255,0.3)]'} focus:outline-none focus:ring-0 transition-all duration-[100ms]`}
        />
        <svg className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.7)]'}`} fill="none" viewBox="0 0 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {filteredProducts.length > 0 && (
            <ul className={`absolute z-50 w-full ${isDarkMode ? 'bg-[rgba(0,0,0,0.8)] text-white' : 'bg-[rgba(255,255,255,0.8)] text-black'} backdrop-blur-sm rounded-md mt-1 shadow-lg max-h-60 text-[15px] overflow-y-auto`}>
                {filteredProducts.map((product) => (
                    <li key={product.id} className={`p-2 text-left ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-black/20'} cursor-pointer`} onClick={() => handleSelect(product)}>
                        {product.name}
                    </li>
                ))}
            </ul>
        )}
    </div>
));

// ACCESSIBILITY: Changed from div to button for better semantics
const AccountIcon = React.memo(({ isDarkMode, navigate, closeMenu }) => (
    <button onClick={() => { navigate('/account'); closeMenu(); }} className={`h-[80%] aspect-square flex items-center justify-center cursor-pointer ${isDarkMode ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'hover:bg-[rgba(0,0,0,0.1)]'} rounded-full transition-all duration-200`} aria-label="View account">
        <svg className={`h-6 w-6 ${isDarkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(0,0,0,0.8)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </button>
));

const CartIcon = React.memo(({ itemCount, isDarkMode, closeMenu }) => (
    <div className={`h-[80%] aspect-square flex items-center justify-center cursor-pointer ${isDarkMode ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'hover:bg-[rgba(0,0,0,0.1)]'} rounded-full`}>
        <Link to="/cart" className="relative" onClick={closeMenu} aria-label={`Cart with ${itemCount} items`}>
            <svg className={`h-6 w-6 ${isDarkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(0,0,0,0.8)]'}`} fill="none" viewBox="0 0 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
                <span className={`absolute -top-1 tracking-tighter -right-1 ${isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'} border font-sans text-[9px] rounded-full h-4 w-4 flex items-center justify-center`}>
                    {itemCount}
                </span>
            )}
        </Link>
    </div>
));


// --- MAIN COMPONENT ---

const Header_sticky = () => {
    const navigate = useNavigate();
    const { itemCount } = useCart();
    const { isDarkMode, toggleTheme } = useTheme();

    const [query, setQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // IMPROVEMENT: Debounce search term to prevent excessive filtering
    const debouncedQuery = useDebounce(query, 300);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // IMPROVEMENT: Memoize search results to prevent re-filtering on every render
    const filteredProducts = useMemo(() => {
        if (debouncedQuery.length > 0) {
            return Prodata.filter((product) =>
                product.pname.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
        }
        return [];
    }, [debouncedQuery]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
        setShowSearchResults(true);
    };

    const handleSelect = (product) => {
        setQuery(""); // Clear input
        setShowSearchResults(false); // Hide dropdown
        closeMobileMenu();
        navigate(`/products/${product.id}`, { state: { product } });
    };

    // IMPROVEMENT: Logic to close search results when clicking outside
    const searchRef = useRef();
    useOnClickOutside(searchRef, () => setShowSearchResults(false));

    const underlineStyle = { '--underline-color': isDarkMode ? '#ffffff' : '#000000' };

    return (
        <header id="bottomnav" className={`w-full bg-transparent flex z-[999] flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100 relative`} style={underlineStyle}>
            <div id="bottomnav-inner" className={`px-10 h-full ${isDarkMode ? 'bg-gradient-to-br from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.8)] border-b-black' : 'bg-gradient-to-br from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0.8)] border-b-white'} backdrop-blur-sm flex flex-row justify-between items-center text-[19px] gap-14 tracking-[0.25em] font-roboto border-b-[1px]`}>
                <div className='uppercase hidden md:flex pl-5 flex-row justify-between items-center text-[15px] gap-14 tracking-[0.25em] font-roboto'>
                    <Link to="/products/c/headphones" className='desktop-nav-link '>Headphones</Link>
                    <Link to="/products/c/iems" className='desktop-nav-link'>In-Ears</Link>
                    <Link to="/products/c" className='desktop-nav-link'>Store</Link>
                    <Link to="/about" className='desktop-nav-link'>About</Link>
                </div>

                <div className='hidden md:flex justify-center items-center gap-5'>
                    <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    <SearchBar query={query} handleSearch={handleSearch} isDarkMode={isDarkMode} filteredProducts={showSearchResults ? filteredProducts : []} handleSelect={handleSelect} searchRef={searchRef} />
                    <AccountIcon isDarkMode={isDarkMode} navigate={navigate} closeMenu={closeMobileMenu} />
                    <CartIcon itemCount={itemCount} isDarkMode={isDarkMode} closeMenu={closeMobileMenu} />
                </div>

                <div className="md:hidden flex justify-between items-center w-full h-[60px]">
                    <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    <div className="flex items-center gap-5">
                        <CartIcon itemCount={itemCount} isDarkMode={isDarkMode} closeMenu={closeMobileMenu} />
                        <AccountIcon isDarkMode={isDarkMode} navigate={navigate} closeMenu={closeMobileMenu} />
                        {/* ACCESSIBILITY: Added aria-controls and aria-expanded */}
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none z-[999999]" aria-label="Toggle menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div id="mobile-menu" className={`md:hidden absolute top-full left-0 w-full ${isDarkMode ? 'bg-[rgba(0,0,0,0.95)]' : 'bg-[rgba(255,255,255,0.95)]'} backdrop-blur-lg z-[998] flex flex-col items-center gap-4 py-8`}>
                    <Link to="/products/c/headphones" onClick={closeMobileMenu} className="text-xl">Headphones</Link>
                    <Link to="/products/c/iems" onClick={closeMobileMenu} className="text-xl">In-Ears</Link>
                    <Link to="/products/c" onClick={closeMobileMenu} className="text-xl">Store</Link>
                    <Link to="/about" onClick={closeMobileMenu} className="text-xl">About</Link>
                    <div className="w-4/5 pt-4">
                        <SearchBar query={query} handleSearch={handleSearch} isDarkMode={isDarkMode} filteredProducts={showSearchResults ? filteredProducts : []} handleSelect={handleSelect} searchRef={searchRef}/>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header_sticky;