import Hero from './Hero.jsx';
import Stickyhero from './Stickyhero.jsx';
import vid1 from './signvideo.mp4';
import './Home.css';
import Fhero from './Footer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center h-screen w-screen relative overflow-hidden bac">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-screen object-cover"
                >
                    <source src={vid1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="relative z-8 w-full">
                    <Hero />
                    <Stickyhero />
                    <div className='flex flex-col justify-center items-center h-screen w-full gap-8'>
                        <div className='font-roboto text-white text-5xl text-center'>
                            Demo units are currently unavailable.
                        </div>
                        <button
                            onClick={()=>navigate('/')}
                            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
            <Fhero />
        </>
    );
};

export default LoginPage;