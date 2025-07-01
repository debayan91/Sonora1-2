import { useState, useEffect } from 'react';
import Hero from './Hero.jsx';
import Stickyhero from './Stickyhero.jsx';
import vid1 from './signvideo.mp4';
import './Home.css';
import Fhero from './Footer';
import g from "./glogo.webp";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/src/hooks/useAuth.js';

const LoginPage = () => {
  useEffect(() => {
    document.title = "Sonora - Login";
  }, []);

  const { emailLogin, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const gsign = async () => {
    try {
      await googleLogin();
      navigate('/');
    } catch {
      alert("Google sign-in failed");
    }
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      alert("Email field must be filled.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!formData.password.trim()) {
      alert("Password cannot be empty.");
      return;
    }

    try {
      await emailLogin(email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        alert('Account temporarily locked. Try again later');
      } else {
        alert('Login failed: ' + error.message);
      }
    }
  };

  const EmailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" fill="white" />
      <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const PasswordIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7C9.23858 7 7 9.23858 7 12V15H17V12C17 9.23858 14.7614 7 12 7Z" />
      <rect x="9" y="15" width="6" height="7" rx="1" />
      <circle cx="12" cy="17" r="1" />
      <path d="M12 18V20" />
    </svg>
  );

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5C5.63636 5 1 12 1 12C1 12 5.63636 19 12 19C18.3636 19 23 12 23 12C23 12 18.3636 5 12 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <div className="min-h-[130vh] flex flex-col items-center relative">
        {/* Background video with grayscale and brightness, scrolls with content */}
        <video
          autoPlay
          loop
          muted
          className="absolute -z-20 w-auto min-w-full min-h-full max-w-none object-cover"
          style={{
            filter: 'grayscale(100%) brightness(60%)'
          }}
        >
          <source src={vid1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Separate overlay for more gradual linear gradient to black at bottom */}
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
        <div className="relative z-10 w-full ">
          <Hero />
          {/* Bottom navbar (sticky, with explicit style to enforce stickiness) */}
          <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
            <Stickyhero />
          </div>
          <div className='flex justify-center items-center h-full m-[7vh] '>
            <div className="bg-[rgba(0,0,0,0.62)] h-full w-[26vw] text-white text-sm shadow-2xl animate-[show_1s_ease] py-7 px-10 " id="shado">
              <h1 className="text-4xl mb-2.5 flex justify-center items-center font-thin tracking-wider pb-6">Sign In</h1>
              <div className="flex flex-col items-center w-full">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center w-[21vw] p-4 rounded-sm mb-4 border border-current">
                    <span className="mr-3"><EmailIcon /></span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      className="border-none bg-transparent placeholder-white/70 focus:text-white focus:tracking-wider outline-none"
                      value={formData.email}
                      onChange={(e) => { handleInputChange(e); setEmail(e.target.value); }}
                    />
                  </div>

                  <div className="flex items-center p-4 rounded-sm mb-4 border border-current">
                    <span className="mr-3"><PasswordIcon /></span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="border-none bg-transparent placeholder-white/70 focus:text-white focus:tracking-wider outline-none"
                      value={formData.password}
                      onChange={(e) => { handleInputChange(e); setPassword(e.target.value); }}
                    />
                  </div>
                  <div className="flex items-center mb-7">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={showPassword}
                          onChange={toggleShowPassword}
                        />
                        <div className={`w-4 h-4 rounded-full border border-white flex items-center justify-center ${showPassword ? 'bg-white' : ''}`}>
                          {showPassword && (
                            <svg className="w-2 h-2 text-black" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="ml-2 text-xs">Show Password</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full overflow-hidden border-none tracking-widest bg-white py-[1.7vh] text-black rounded-sm cursor-pointer font-roboto text-base transition-all duration-300 hover:tracking-[0.7em] hover:text-[1.2em] hover:bg-black/40 hover:text-white"
                    id="submit"
                  >
                    Sign in
                  </button>
                  <div className='text-center font-roboto flex justify-center items-center h-[3em]'>
                    or
                  </div>
                  <div onClick={gsign} id="u" className='flex justify-center cursor-pointer items-center text-blue-500 border border-blue-500 gap-[0.5em] px-[1em] py-[1.7vh] bg-[rgba(0,0,0,0.07)] tracking-widest mb-[1em] text-[17px] hover:border-green-400 hover:text-green-400 transition-all duration-300'>
                    <img src={g} className='h-[1.4em]'></img> Continue with Google
                  </div>
                  <div className='text-center font-roboto flex justify-center items-center h-[3em] text-gray-200 gap-[0.4em]'>
                    Dont have an account yet? <a className="text-white" href="/signin">Create one.</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer with explicit z-index to ensure it’s above background */}
      <div className="w-full z-10 relative">
        <Fhero />
      </div>
    </>
  );
};

export default LoginPage;
