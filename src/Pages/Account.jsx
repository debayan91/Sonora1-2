import React, { useEffect, useState } from 'react';
import { useAuth } from '/src/hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx'; // 1. Import useTheme
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Fhero from '../components/Footer.jsx';

const AccountPage = () => {
    const { isDarkMode } = useTheme(); // 2. Use the theme hook
    const { currentUser, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        document.title = "Sonora - Account";
    }, []);

    // 3. Create theme-aware style variables
    const bgColor = isDarkMode ? 'bg-black' : 'bg-gray-50';
    const cardBgColor = isDarkMode ? 'bg-black/40' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const mutedTextColor = isDarkMode ? 'text-white/60' : 'text-gray-500';
    const borderColor = isDarkMode ? 'border-white/10' : 'border-gray-200';
    const activeTabClasses = isDarkMode ? 'border-white text-white' : 'border-gray-800 text-gray-800';
    const inactiveTabClasses = isDarkMode ? 'border-transparent text-white/60 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-800';
    const buttonClasses = isDarkMode ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-gray-100 border-gray-300 hover:bg-gray-200';

    if (loading) {
        return <div className={`flex justify-center items-center h-screen ${bgColor} ${textColor}`}>Loading...</div>;
    }

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

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="p-6 md:p-8">
                        <h2 className={`text-2xl mb-6 font-medium ${textColor}`}>Profile Information</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center border ${borderColor} flex-shrink-0 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <span className={`text-3xl font-bold ${mutedTextColor}`}>
                  {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                </span>
                            </div>
                            <div className="space-y-2">
                                <p className={`${mutedTextColor} text-sm`}>Profile Picture</p>
                                <button className={`text-sm border px-4 py-2 rounded-md transition-all duration-300 ${buttonClasses} ${textColor}`}>
                                    Upload Photo
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4 text-base">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className={`${mutedTextColor}`}>Name:</span>
                                <span className={`${textColor}`}>{currentUser.displayName || 'Not set'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className={`${mutedTextColor}`}>Email:</span>
                                <span className={`${textColor}`}>{currentUser.email}</span>
                            </div>
                        </div>
                        <div className="mt-10 pt-6 border-t">
                            <button onClick={handleLogout} className="w-full sm:w-auto py-3 px-6 bg-red-800/80 tracking-widest font-sans border border-red-700 text-red-300 hover:bg-red-700 hover:text-white transition-all duration-300 text-sm rounded-md">
                                SIGN OUT
                            </button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="p-6 md:p-8">
                        <h2 className={`text-2xl mb-6 font-medium capitalize ${textColor}`}>{activeTab}</h2>
                        <p className={`${mutedTextColor}`}>There is nothing here yet.</p>
                    </div>
                );
        }
    };

    const NavItem = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 sm:px-5 border-b-2 text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab ? activeTabClasses : inactiveTabClasses}`}
        >
            {label}
        </button>
    );

    return (
        <>
            <div className={`min-h-screen font-roboto ${bgColor}`}>
                <Header_top />
                <div className="sticky top-0 z-40">
                    <Header_sticky />
                </div>

                <main className="w-full px-4 py-12 md:py-20">
                    <div className="max-w-5xl mx-auto">
                        <h1 className={`text-3xl md:text-4xl mb-8 text-center font-thin tracking-wider ${textColor}`}>My Account</h1>

                        {/* Horizontal Tab Navigation */}
                        <div className={`w-full border-b ${borderColor} mb-8`}>
                            <div className="flex flex-row overflow-x-auto justify-start md:justify-center">
                                <NavItem tab="profile" label="Profile" />
                                <NavItem tab="orders" label="Past Orders" />
                                <NavItem tab="wishlist" label="Wishlist" />
                                <NavItem tab="addresses" label="Addresses" />
                                <NavItem tab="reviews" label="Reviews" />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className={`${cardBgColor} shadow-lg rounded-lg overflow-hidden`}>
                            {renderContent()}
                        </div>
                    </div>
                </main>
            </div>

            <div className="w-full z-10 relative">
                <Fhero />
            </div>
        </>
    );
};

export default AccountPage;