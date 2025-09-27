import React from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const Header_top = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    // Reusable SVG icon for the Sun (Light Mode)
    const SunIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 hover:rotate-90">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );

    // Reusable SVG icon for the Moon (Dark Mode)
    const MoonIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 hover:rotate-[20deg]">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
    );

    return (
        <main>
            {/* The main header container. Height is responsive: smaller on mobile, larger on desktop. */}
            <div className={`relative top-0 left-0 z-50 h-[12vh] md:h-[17vh] w-screen ${isDarkMode ? 'bg-black' : 'bg-white'} flex flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100 transition-colors duration-300`}>

                {/* Logo container. Font size and height are responsive. */}
                <div id="lo" className={`cursor-pointer top-0 left-0 h-full w-screen text-[36px] md:text-[50px] tracking-widest ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} flex flex-col justify-center items-center text-center font-aboreto font-100 transition-colors duration-300`}>

                    {/* Main logo text */}
                    <div onClick={() => navigate('/')} className="ani">SONORA</div>

                    {/* Subtitle text. Font size is responsive. */}
                    <span id="noa" onClick={() => navigate('/')} className={`text-[10px] md:text-[12px] flex flex-row gap-2 font-times ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <span className='tracking-normal'>by</span> HARMAN
                    </span>

                    {/* Theme Toggle Button - Hidden on mobile, visible on desktop */}
                    <div className="absolute right-8 px-14 top-1/2 transform -translate-y-1/2 hidden md:block">
                        <button
                            onClick={(event) => {
                                event.stopPropagation(); // Prevent navigation when clicking the button
                                toggleTheme();
                            }}
                            className="p-2 rounded-full focus:ring-offset-2 transition-all duration-300"
                            aria-label="Toggle color theme"
                        >
                            {/* Conditionally render the Sun or Moon icon based on the current theme */}
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Header_top;