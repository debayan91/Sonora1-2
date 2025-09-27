import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center h-screen w-screen relative overflow-hidden bac">
                <div className="relative z-8 w-full">
                    <Header_top />
                    <Header_sticky />
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