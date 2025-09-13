import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
        <div className="relative z-10 w-full">
          <Header_top/>
          <Header_sticky/>
          <div className='flex justify-center items-center h-full m-[15vh]'>
            <div className='w-full h-auto bg-black py-12 px-4 sm:px-6 lg:px-8 text-gray-300'>
              <div className="max-w-4xl mx-auto font-roboto tracking-wider text-md">
                <div className="mb-12 text-center">
                  <h1 className="text-4xl text-white mb-6 font-bold">About Sonora</h1>
                  <p className="text-gray-400 text-xl">
                    Your trusted destination for premium audio & entertainment
                  </p>
                </div>
                
                <div className="mb-12">
                  <h2 className="text-2xl text-white mb-4">Who We Are</h2>
                  <p className="text-gray-400">
                    Sonora is a leading retail brand under Harman International, specializing in high-end consumer electronics, audio systems, and smart home technology. Since our founding, we've brought the world's finest audio experiences to enthusiasts and everyday listeners alike.
                  </p>
                </div>
                
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-2xl text-white mb-4">Our Mission</h2>
                  <p className="text-gray-400">
                    We curate the best in sound—from Harman's legendary brands (JBL, Harman Kardon, AKG) to top-tier partners—delivering expert advice, competitive pricing, and seamless service. Whether you're upgrading your home theater or discovering wireless audio, we make exceptional sound accessible.
                  </p>
                </div>
                
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-2xl text-white mb-4">Why Choose Sonora?</h2>
                  <ul className="text-gray-400 list-disc pl-5 space-y-2">
                    <li><strong>Expert Curation:</strong> Handpicked selection of Harman products and premium third-party audio.</li>
                    <li><strong>Unmatched Support:</strong> Certified specialists help you find the perfect setup.</li>
                    <li><strong>Exclusive Offers:</strong> Member benefits, financing options, and trade-in programs.</li>
                    <li><strong>Seamless Experience:</strong> Shop in-store, online, or via concierge service.</li>
                  </ul>
                </div>
                
                <div className="mb-12 border-t border-gray-700 pt-8">
                  <h2 className="text-2xl text-white mb-4">Our Heritage</h2>
                  <p className="text-gray-400">
                    As part of Harman International, a Samsung Electronics company, we uphold 70+ years of audio excellence. Sonora extends this legacy by bridging cutting-edge technology with real-world usability—helping you hear the difference.
                  </p>
                </div>
                
                <div className="border-t border-gray-700 pt-8">
                  <h2 className="text-2xl text-white mb-4">Visit Us</h2>
                  <p className="text-gray-400">
                    Explore our stores for immersive demo rooms, or connect with our virtual advisors. Sonora—where sound comes to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Fhero/>
    </>
  );
};

export default AboutPage;