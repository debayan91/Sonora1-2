import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import './Home.css';
import Fhero from '../components/Footer.jsx';

const ContactPage = () => {
  return (
    <>
      <div className="min-h-[150vh] flex flex-col items-center relative">
        {/* Background image with grayscale and brightness, scrolls with content */}
        <div 
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(https://mezeaudio.com/cdn/shop/files/Meze-Audio-Empyrean-headphone-04.webp?v=1713431934&width=1200)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(100%) brightness(60%)',
            backgroundAttachment: 'scroll'
          }}
        />
        {/* Separate overlay for more gradual linear gradient to black at bottom */}
        <div 
          className="absolute inset-0 -z-19"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 1) 95%)",
            backgroundSize: 'auto',
            backgroundPosition: 'top',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'scroll'
          }}
        />
        <div className="relative z-10 w-full">
          <Header_top/>
          {/* Bottom navbar (sticky, with explicit style to enforce stickiness) */}
          <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
            <Header_sticky/>
          </div>
          <div className='flex justify-center items-center min-h-[70vh] pt-[15vh] m-[7vh]'>
            <div className='w-full h-auto rounded-lg bg-[rgba(0,0,0,0.89)] py-12 px-8 text-gray-300'>
              <div className="max-w-4xl mx-auto font-roboto tracking-wider text-md">
                <div className="mb-12 text-left">
                  <h1 className="text-5xl text-white mb-6 tracking-widest font-roboto">Contact Sonora</h1>
                  <p className="text-gray-400 text-xl">
                    We're here to help with all your audio needs
                  </p>
                </div>
                <hr className='border border-b-white/20 mb-[6%]'></hr>
                
                <div className="flex flex-col justify-center gap-10 mb-12 tracking-widest">
                  <div>
                    <h2 className="text-2xl w-full text-white mb-4">Get in Touch</h2>
                    <div className="space-y-4 w-full text-gray-400">
                      <p>
                        <strong>Customer Service:</strong><br/>
                        <a href="tel:+18005551234">1-800-555-1234</a><br/>
                        Mon-Fri: 8am-8pm EST<br/>
                        Sat-Sun: 10am-6pm EST
                      </p>
                      <p>
                        <strong>Sales Inquiries:</strong><br/>
                        <a href="mailto:sales@sonora.com">sales@sonora.com</a>
                      </p>
                      <p>
                        <strong>Technical Support:</strong><br/>
                        <a href="mailto:support@sonora.com">support@sonora.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl w-full text-white mb-4">Visit Our Stores</h2>
                    <div className="space-y-4 text-gray-400">
                      <p>
                        <strong>New York Flagship</strong><br/>
                        123 Audio Avenue<br/>
                        New York, NY 10001<br/>
                        (212) 555-6789
                      </p>
                      <p>
                        <strong>Los Angeles Showroom</strong><br/>
                        456 Sound Street<br/>
                        Los Angeles, CA 90015<br/>
                        (310) 555-4321
                      </p>
                    </div>
                  </div>
                </div>
                <hr className='border border-b-white/20 mb-[6%]'></hr>
                <div className="mb-12 pt-8">
                  <h2 className="text-2xl text-white mb-6">Send Us a Message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full bg-transparent border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full bg-transparent border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full bg-transparent border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                      <textarea 
                        id="message" 
                        rows="5" 
                        className="w-full bg-transparent border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        className="bg-transparent border border-white hover:border-blue-700 hover:text-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer with explicit z-index to ensure it’s above background */}
      <div className="w-full z-10 relative">
        <Fhero/>
      </div>
    </>
  );
};

export default ContactPage;
