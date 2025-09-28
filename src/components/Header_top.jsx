import React from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const Header_top = () => {
    const navigate = useNavigate();
    const { isDarkMode} = useTheme();

    return (
        <main>
            {/* The main header container. Height is responsive: smaller on mobile, larger on desktop. */}
            <div className={`relative top-0 left-0 z-50 h-[12vh] md:h-[17vh] w-screen ${isDarkMode ? 'bg-black' : 'bg-white'} flex flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100 transition-colors duration-300`}>

                {/* Logo container. Font size and height are responsive. */}
                <div id="lo" className={`cursor-pointer overflow-hidden top-0 left-0 h-full w-screen text-[36px] md:text-[50px] tracking-widest ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} flex flex-col justify-center items-center text-center font-aboreto font-100 transition-colors duration-300`}>

                    {/* Main logo text */}
                    <div onClick={() => navigate('/')} className="ani"><img className={`object-cover h-20 lg:h-24 overflow-hidden ${isDarkMode ? 'invert' : ''}`} src={"/logo_didot.png"}></img></div>
                </div>
            </div>
        </main>
    );
};

export default Header_top;