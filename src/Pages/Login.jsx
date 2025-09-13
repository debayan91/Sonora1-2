import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Fhero from '../components/Footer.jsx';
import g from "../../public/glogo.webp";
import { useAuth } from '/src/hooks/useAuth.js';
import { useTheme } from '../context/ThemeContext.jsx';

const LoginPage = () => {
    const { isDarkMode } = useTheme();
    const { emailLogin, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = "Sonora - Login";
    }, []);

    const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
    const cardBgColor = isDarkMode ? 'bg-black/40' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const mutedTextColor = isDarkMode ? 'text-white/60' : 'text-gray-500';
    const borderColor = isDarkMode ? 'border-white/20' : 'border-gray-300';
    const inputBgColor = isDarkMode ? 'bg-transparent' : 'bg-gray-50';
    const placeholderColor = isDarkMode ? 'placeholder-white/70' : 'placeholder-gray-400';
    const linkColor = isDarkMode ? 'text-white hover:underline' : 'text-blue-600 hover:underline';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await emailLogin(formData.email, formData.password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert('Invalid email or password. Please try again.');
            } else if (error.code === 'auth/too-many-requests') {
                alert('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.');
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleLogin();
            navigate('/');
        } catch {
            alert("Google Sign-In failed.");
        }
    };

    const IconWrapper = ({ children }) => <span className={`mr-3 ${mutedTextColor}`}>{children}</span>;

    const InputField = ({ name, type, placeholder, value, onChange, children }) => (
        <div className={`flex items-center w-full p-3 rounded-md mb-4 border ${borderColor}`}>
            <IconWrapper>{children}</IconWrapper>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`w-full border-none outline-none ${inputBgColor} ${textColor} ${placeholderColor}`}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );

    return (
        <>
            <div className={`min-h-screen flex flex-col ${bgColor}`}>
                <Header_top />
                <div className="sticky top-0 z-40">
                    <Header_sticky />
                </div>
                <main className="flex-grow flex justify-center items-center px-4 py-12">
                    <div className={`w-full max-w-md ${cardBgColor} ${textColor} text-sm shadow-2xl rounded-lg p-8`}>
                        <h1 className="text-3xl md:text-4xl mb-6 text-center font-thin tracking-wider">Sign In</h1>
                        <form onSubmit={handleSubmit} noValidate>
                            <InputField name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" /></svg>
                            </InputField>
                            <InputField name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={handleInputChange}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H17V6C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6V8H6C4.89543 8 4 8.89543 4 10V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V10C20 8.89543 19.1046 8 18 8ZM12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15C14 16.1046 13.1046 17 12 17ZM15 8H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8Z" /></svg>
                            </InputField>

                            <div className="flex items-center mb-6">
                                <label className="flex items-center cursor-pointer text-xs">
                                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="mr-2 h-4 w-4 accent-gray-500"/>
                                    Show Password
                                </label>
                            </div>

                            <button type="submit" className={`w-full tracking-widest py-3 rounded-md cursor-pointer font-roboto text-base transition-all duration-300 ${isDarkMode ? 'bg-white text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-700'}`}>
                                Sign In
                            </button>

                            <div className={`text-center flex items-center my-6`}>
                                <hr className={`flex-grow ${borderColor}`} />
                                <span className={`px-2 text-xs ${mutedTextColor}`}>OR</span>
                                <hr className={`flex-grow ${borderColor}`} />
                            </div>

                            <button type="button" onClick={handleGoogleSignIn} className={`w-full flex justify-center items-center gap-2 py-3 border rounded-md transition-all duration-300 ${borderColor} ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                                <img src={g} alt="Google logo" className='h-5'/> Continue with Google
                            </button>

                            <div className={`text-center mt-6 text-sm ${mutedTextColor}`}>
                                Don't have an account? <a href="/signup" className={`${linkColor}`}>Create one.</a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            <div className="w-full z-10 relative">
                <Fhero />
            </div>
        </>
    );
};

export default LoginPage;