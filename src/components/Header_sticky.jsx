import React, { useEffect, useState, useRef } from 'react';
import './hero.css'; // Assuming you have this CSS file for base styles
import { useNavigate } from 'react-router-dom';
import { useCart } from '/src/context/Cartcontext.jsx';
import { Link } from 'react-router-dom';
import Prodata from './Prodata.js';
import { useTheme } from '../context/ThemeContext.jsx';

const Header_sticky = () => {
    // --- HOOKS INITIALIZATION ---
    const navigate = useNavigate();
    const { itemCount } = useCart();
    const { isDarkMode, toggleTheme } = useTheme();

    // --- STATE MANAGEMENT ---
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- REFS ---
    const timeoutRef = useRef(null);

    // --- EVENT HANDLERS & LOGIC ---
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 0) {
            const filtered = Prodata.filter((product) =>
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
        setIsMobileMenuOpen(false); // Close mobile menu if open
        navigate(`/products/${product.id}`, { state: { product } });
    };

    const cancelCloseTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const startCloseTimer = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200);
    };

    const handleMouseEnter = (dropdownId) => {
        if (window.innerWidth < 768) return; // Prevent this logic on mobile devices
        cancelCloseTimer();
        setActiveDropdown(dropdownId);
    };

    // --- SIDE EFFECTS (useEffect) ---
    useEffect(() => {
        const links = document.querySelectorAll('.desktop-nav-link');
        links.forEach(link => {
            const mouseEnterHandler = () => {
                links.forEach(l => {
                    l.style.color = (l === link)
                        ? (isDarkMode ? 'white' : 'black')
                        : (isDarkMode ? 'rgba(255, 255, 255, 0.579)' : 'rgba(0, 0, 0, 0.579)');
                });
            };
            const mouseLeaveHandler = () => {
                links.forEach(l => {
                    l.style.color = isDarkMode ? 'white' : 'black';
                });
            };

            link.addEventListener('mouseenter', mouseEnterHandler);
            link.addEventListener('mouseleave', mouseLeaveHandler);

            return () => {
                link.removeEventListener('mouseenter', mouseEnterHandler);
                link.removeEventListener('mouseleave', mouseLeaveHandler);
            };
        });
    }, [isDarkMode]);

    useEffect(() => {
        return () => {
            cancelCloseTimer();
        };
    }, []);

    // --- DYNAMIC STYLES ---
    const underlineStyle = {
        '--underline-color': isDarkMode ? '#ffffff' : '#000000',
    };

    // --- REUSABLE SUB-COMPONENTS ---
    const ThemeToggleButton = () => (
        <button
            onClick={(event) => {
                event.stopPropagation();
                toggleTheme();
            }}
            className="p-2 rounded-full"
            aria-label="Toggle color theme"
        >
            {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></svg>
            )}
        </button>
    );

    const SearchBar = () => (
        <div className='h-[1.5em] rounded-sm w-full md:w-[10em] relative'>
            <input
                type="text" placeholder="Search" value={query} onChange={handleSearch}
                className={`w-full h-[30px] pl-4 pr-10 text-[15px] rounded-sm tracking-wider ${isDarkMode ? 'bg-[rgba(0,0,0,0.15)] text-white placeholder-[rgba(255,255,255,0.7)] focus:bg-[rgba(0,0,0,0.3)]' : 'bg-[rgba(255,255,255,0.15)] text-black placeholder-[rgba(0,0,0,0.7)] focus:bg-[rgba(255,255,255,0.3)]'} focus:outline-none focus:ring-0 transition-all duration-[500ms]`}
            />
            {filteredProducts.length > 0 && (
                <ul className={`absolute z-50 w-full ${isDarkMode ? 'bg-[rgba(0,0,0,0.8)] text-white' : 'bg-[rgba(255,255,255,0.8)] text-black'} backdrop-blur-sm rounded-md mt-1 shadow-lg max-h-60 text-[17px] overflow-y-auto`}>
                    {filteredProducts.map((product, index) => (
                        <li key={index} className={`p-2 ${isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-black'} cursor-pointer`} onClick={() => handleSelect(product)}>
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
            <svg className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.7)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );

    const AccountIcon = () => (
        <div className={`h-[80%] aspect-square flex items-center justify-center cursor-pointer ${isDarkMode ? 'hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:bg-[rgba(0,0,0,0.1)] hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]'} rounded-full transition-all duration-200`}>
            <svg className={`h-6 w-6 ${isDarkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(0,0,0,0.8)]'}`} fill="none" onClick={() => { navigate('/account'); setIsMobileMenuOpen(false); }} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
    );

    const CartIcon = () => (
        <div className={`h-[80%] aspect-square flex items-center justify-center cursor-pointer ${isDarkMode ? 'hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'hover:bg-[rgba(0,0,0,0.1)] hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]'} rounded-full`}>
            <Link to="/cart" className="relative" onClick={() => setIsMobileMenuOpen(false)}>
                <svg className={`h-6 w-6 ${isDarkMode ? 'text-[rgba(255,255,255,0.8)]' : 'text-[rgba(0,0,0,0.8)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                    <span className={`absolute -top-1 tracking-tighter -right-1 ${isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'} border font-sans text-[9px] rounded-full h-4 w-4 flex items-center justify-center`}>
                        {itemCount}
                    </span>
                )}
            </Link>
        </div>
    );

    // --- RENDER METHOD ---
    return (
        <div id="bottomnav" className={`w-screen bg-transparent flex z-[9999999] flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100 relative`} style={underlineStyle}>
            <style jsx>{`
                a { display: inline-block; position: relative; }
                a::after { content: ''; position: absolute; width: 100%; transform: scaleX(0); height: 1px; bottom: 0; left: 0; background-color: var(--underline-color, #ffffff); transition: transform 0.5s ease-out; }
                a:hover::after { transform: scaleX(1); transform-origin: bottom center; }
                .text-shadow-custom { text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5); }
            `}</style>

            <div id="bottomnav-inner" className={`px-10 h-full ${isDarkMode ? 'bg-gradient-to-br from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.8)]' : 'bg-gradient-to-br from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0.8)]'} backdrop-blur-sm flex flex-row justify-between items-center text-[19px] gap-14 tracking-[0.25em] font-roboto ${isDarkMode ? 'border-b-[rgba(255,255,255,0.2)]' : 'border-b-[rgba(0,0,0,0.2)]'} border-b-[1px]`}>
                {/* Your original header content remains unchanged */}
                <div className='hidden md:flex z-500 flex-row justify-between items-center text-[19px] gap-14 tracking-[0.25em] font-roboto'>
                    <Link to="/products/c/headphones" className='desktop-nav-link' onMouseEnter={() => handleMouseEnter('a1')} onMouseLeave={startCloseTimer}>Headphones</Link>
                    <Link to="/products/c/iems" className='desktop-nav-link' onMouseEnter={() => handleMouseEnter('a2')} onMouseLeave={startCloseTimer}>In-Ears</Link>
                    <Link to="/products/c" className='desktop-nav-link' onMouseEnter={() => handleMouseEnter('a4')} onMouseLeave={startCloseTimer}>Store</Link>
                    <Link to="/about" className='desktop-nav-link'>About</Link>
                </div>
                <div className='hidden md:flex justify-center items-center gap-5'>
                    <SearchBar />
                    <AccountIcon />
                    <CartIcon />
                </div>
                <div className="md:hidden flex justify-between items-center w-full h-[60px]">
                    <ThemeToggleButton />
                    <div className="flex items-center gap-5">
                        <CartIcon />
                        <AccountIcon />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none z-[999999]">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className={`md:hidden absolute top-full left-0 w-full ${isDarkMode ? 'bg-[rgba(0,0,0,0.95)]' : 'bg-[rgba(255,255,255,0.95)]'} backdrop-blur-lg z-[99999] flex flex-col items-center gap-4 py-8`}>
                    <Link to="/products/c/headphones" onClick={() => setIsMobileMenuOpen(false)} className="text-xl">Headphones</Link>
                    <Link to="/products/c/iems" onClick={() => setIsMobileMenuOpen(false)} className="text-xl">In-Ears</Link>
                    <Link to="/products/c" onClick={() => setIsMobileMenuOpen(false)} className="text-xl">Store</Link>
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl">About</Link>
                    <div className="w-4/5 pt-4">
                        <SearchBar />
                    </div>
                </div>
            )}

            {/* --- MODIFICATION START --- */}
            {/* The only change is this dropdown container and its content */}
            <div
                className={`hidden md:block absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-4'}`}
                onMouseEnter={cancelCloseTimer}
                onMouseLeave={startCloseTimer}
            >
                {activeDropdown === 'a1' && (
                    /* Added 'relative' */
                    <div className="relative h-[80px]">
                        {/* Corrected className with backticks */}
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/95'} backdrop-blur-md`}></div>
                        {/* Corrected text color to be theme-aware */}
                        <div className={`relative z-10 w-full h-full flex font-extralight items-center px-14 gap-20 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <Link to="/brands/sennheiser" className="text-xl tracking-widest uppercase">Sennheiser</Link>
                            <Link to="/brands/focal" className="text-xl tracking-widest uppercase">Focal</Link>
                            <Link to="/brands/hifiman" className="text-xl tracking-widest uppercase">Fiio</Link>
                        </div>
                    </div>
                )}
                {activeDropdown === 'a2' && (
                    /* Added 'relative' */
                    <div className="relative h-[80px]">
                        {/* Corrected className with backticks */}
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/95'} backdrop-blur-md`}></div>
                        {/* Corrected text color to be theme-aware */}
                        <div className={`relative z-10 w-full h-full flex font-extralight items-center px-14 gap-20 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            <Link to="/brands/moondrop" className="text-xl tracking-widest uppercase">Moondrop</Link>
                            <Link to="/brands/7hz" className="text-xl tracking-widest uppercase">7Hz</Link>
                            <Link to="/brands/fiio" className="text-xl tracking-widest uppercase">Fiio</Link>
                            <Link to="/brands/Simgot" className="text-xl tracking-widest uppercase">Simgot</Link>
                        </div>
                    </div>
                )}
                {activeDropdown === 'a4' && (
                    <div className={`h-[280px] w-full border-t ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/95 border-black/10'} backdrop-blur-md`}>
                        <div className="max-w-6xl mx-auto h-full grid grid-cols-3 gap-8 p-8">
                            {[
                                { title: "Headphones", links: [{ name: "Open-Back", path: "/headphones/open-back" }, { name: "Closed-Back", path: "/headphones/closed-back" }, { name: "Wireless", path: "/headphones/wireless" }], all: "/products/c/headphones" },
                                { title: "In-Ears", links: [{ name: "Single Dynamic", path: "/iems/single-dd" }, { name: "Multi-BA", path: "/iems/multi-ba" }, { name: "Planar", path: "/iems/planar" }], all: "/products/c/iems" },
                                { title: "Accessories", links: [{ name: "Cables", path: "/accessories/cables" }, { name: "DACs & Amps", path: "/accessories/dacs" }, { name: "Eartips", path: "/accessories/eartips" }], all: "/products/c/accessories" }
                            ].map(category => (
                                <div key={category.title}>
                                    <h3 className={`text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-left ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>{category.title}</h3>
                                    <ul className="text-left space-y-2">
                                        {category.links.map(link => (
                                            <li key={link.name}><Link to={`/products/c${link.path}`} className={`text-base ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}>{link.name}</Link></li>
                                        ))}
                                        <li><Link to={category.all} className={`text-base font-semibold mt-2 inline-block ${isDarkMode ? 'text-white' : 'text-black'}`}>View All</Link></li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* --- MODIFICATION END --- */}
        </div>
    );
};

export default Header_sticky;