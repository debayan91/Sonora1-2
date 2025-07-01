import React from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <main>
      <div className={`relative top-0 left-0 z-50 h-[17vh] w-screen ${isDarkMode ? 'bg-black' : 'bg-white'} flex flex-col justify-center ${isDarkMode ? 'text-white' : 'text-black'} text-center font-100`}>
        <div id="lo" className={`cursor-pointer top-0 left-0 h-[17vh] w-screen text-[50px] tracking-widest ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'} flex flex-col justify-center items-center text-center font-aboreto font-100`}>
          <div onClick={() => navigate('/')} className="ani">SONORA</div>
          <span id="noa" onClick={() => navigate('/')} className={`text-[12px] flex flex-row gap-2 font-times ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <span className='tracking-normal'>by</span> HARMAN
          </span>
          
          {/* Theme Toggle Switch */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!isDarkMode}
                onChange={(event) => {
                  event.stopPropagation(); // Prevent navigation to home page
                  toggleTheme();
                }}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${isDarkMode ? 'peer-checked:bg-white' : 'peer-checked:bg-black'}`}></div>
              <span className={`ml-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {isDarkMode ? (
                  // Moon SVG for Dark Mode
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                  </svg>
                ) : (
                  // Sun SVG for Light Mode
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                )}
              </span>
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
