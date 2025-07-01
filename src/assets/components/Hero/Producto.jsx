import Hero from './Hero.jsx';
import Stickyhero from './Stickyhero.jsx';
import Footer from './Footer';
import './pro.css';
import { useLocation } from 'react-router-dom';
import { useCart } from '/src/context/Cartcontext.jsx';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext.jsx'; // Import useTheme

const StickyBottomBar = ({
  product,
  addItem,
  show,
  isDarkMode
}) => {
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const borderClass = isDarkMode ? 'border-white' : 'border-gray-200';
  const buttonClass = isDarkMode ? 'bg-white text-black hover:bg-white/10 hover:text-white' : 'bg-black text-white';
  const shadowClass = isDarkMode ? 'shadow-[0_-2px_12px_rgba(255,255,255,0.04)]' : 'shadow-[0_-2px_12px_rgba(0,0,0,0.04)]'; // Added for completeness, if not already used

  return (
    <div
      className={`fixed left-0 w-full flex items-center backdrop-blur-lg justify-between px-8 py-3 ${shadowClass} border-t ${borderClass} transition-transform duration-500 z-[100]`}
      style={{
        bottom: 0,
        transform: show ? 'translateY(0%)' : 'translateY(100%)',
        pointerEvents: show ? 'auto' : 'none'
      }}
    >
      <div className="flex items-center gap-6">
        <span className={`text-base font-sans -mr-5 ${textClass}`}>{product.bname}</span>
        <span className={`text-base font-normal ${textClass}`}>{product.pname}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className={`text-red-500 text-base font-medium ${textClass}`}>INR {product.price.toLocaleString()}</span>
        <button
          onClick={() => addItem(product)}
          className={`px-6 py-2 rounded transition font-semibold ${buttonClass}`}
          style={{ minWidth: 140 }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const Prod = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { addItem } = useCart();
  const { isDarkMode } = useTheme(); // Use useTheme hook

  const [mainImage, setMainImage] = useState(product.image);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showZoomLens, setShowZoomLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });

  // Sticky bar logic
  const detRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Theme classes
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const blurClass = 'backdrop-blur-sm'; // Simplified to only handle blur

  useEffect(() => {
    document.title = `Buy ${product.name}`;
  }, [product.pname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!detRef.current) return;
      const rect = detRef.current.getBoundingClientRect();
      // Show sticky bar only when the main action area is completely out of view (above the viewport)
      setShowStickyBar(rect.bottom <= 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    const lensSize = 100;
    let lensX = x - lensSize / 2;
    let lensY = y - lensSize / 2;
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > rect.width - lensSize) lensX = rect.width - lensSize;
    if (lensY > rect.height - lensSize) lensY = rect.height - lensSize;
    setZoomPosition({ x: xPercent, y: yPercent });
    setLensPosition({ x: lensX, y: lensY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowZoomLens(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowZoomLens(false);
  };

  return (
    <>
      <div className={`font-roboto tracking-widest min-h-[200vh] flex flex-col items-center relative`}>
        {/* Background image and overlay */}
        <div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage:
              product.category === 'headphones'
                ? "url(https://w.wallhaven.cc/full/0j/wallhaven-0jkxqp.jpg)"
                : "url(https://mezeaudio.com/cdn/shop/files/Meze-Empyrean-headphone-01-grain_11e6522a-cff7-4d26-aea6-7f4d3da918eb.webp?v=1726579193&width=3000)",
            backgroundSize: 'cover',
            backgroundPosition: product.category === 'headphones' ? 'center' : 'bottom right',
            backgroundRepeat: 'no-repeat',
            filter: isDarkMode ? 'grayscale(100%) brightness(30%)' : 'grayscale(100%) brightness(100%)',
            backgroundAttachment: 'scroll'
          }}
        />
        <div
          className="absolute inset-0 -z-19"
          style={{
            backgroundImage:
              isDarkMode
                ? "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 80%, rgba(0, 0, 0, 1) 95%)"
                : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.5) 70%, rgba(255, 255, 255, 0.7) 80%, rgba(255, 255, 255, 1) 95%)",
            backgroundSize: 'auto',
            backgroundPosition: 'top',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'scroll'
          }}
        />
        {/* Top navbar */}
        <div className="w-full z-10">
          <Hero />
        </div>
        {/* Sticky tab bar */}
        <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
          <Stickyhero />
        </div>
        <div className={`relative z-10 w-full`}>
          <div id="parent" className="flex flex-col justify-center items-center p-[6%]">
            <div id="to9" className={`${blurClass} z-100 h-[100vh] w-[90vw] rounded-lg flex p-[3%] relative
             ${isDarkMode ? 'bg-black' : 'bg-white'}`
             }>
              <div id="slider" className={`h-[70vh] overflow-y-auto w-[10%] rounded-lg flex flex-col gap-4 p-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                {[product.image1, product.image, product.img3, product.img4, product.img5].map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`w-full aspect-square rounded-lg cursor-pointer opacity-90 hover:opacity-100 transition-opacity ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
                  >
                    <img
                      src={img}
                      className="h-full w-full object-cover rounded-lg"
                      alt={`Product view ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div id="image" className="h-[70vh] w-[45%] rounded-lg flex items-center justify-center p-8 relative">
                <div className={`w-full h-auto rounded-lg flex items-center justify-center relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className="relative w-full h-full">
                    <img
                      src={mainImage}
                      className="h-full w-full object-cover rounded-lg"
                      style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Cpath d=\'M10 2v16M2 10h16\' stroke=\'%23000\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E") 10 10, crosshair' }}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleImageClick(mainImage)}
                      alt="Main product view"
                    />
                    {showZoomLens && (
                      <div
                        className={`absolute border-2 border-none pointer-events-none ${isDarkMode ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-30'}`}
                        style={{
                          width: '100px',
                          height: '100px',
                          left: `${lensPosition.x}px`,
                          top: `${lensPosition.y}px`,
                          borderRadius: '2px'
                        }}
                      />
                    )}
                  </div>
                </div>
                {isHovering && (
                  <div className={`absolute left-full top-1/2 transform -translate-y-1/2 ml-4 w-full h-full border rounded-lg overflow-hidden shadow-lg z-50 ${isDarkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-300'}`}>
                    <div
                      className="w-full h-full bg-cover bg-no-repeat rounded-lg"
                      style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundSize: '250%',
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
                      }}
                    />
                  </div>
                )}
              </div>
              <div id="det" ref={detRef} className={`h-full w-[45%] rounded-lg flex flex-col gap-[1%] p-8 ${textClass}`}>
                <div id="bname" className={`text-2xl tracking-[0.2em] font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.bname}
                </div>
                <div id="pname" className="text-5xl font-medium mt-2">
                  {product.pname}
                </div>
                <hr className={`my-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></hr>
                <div id="price" className="text-4xl font-light">
                  INR {product.price.toLocaleString()}
                </div>
                <div className="my-8">
                  <p className={`text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.des}</p>
                </div>
                <div id="a/b" className="h-[6%] flex flex-row gap-5 my-6">
                  <div
                    id="x"
                    className={`w-[50%] cursor-pointer overflow-hidden flex justify-center items-center hover:tracking-[0.3em] transition-all duration-500 ease ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-white/90 hover:text-black'}`}
                  >
                    BUY NOW
                  </div>
                  <div
                    onClick={() => addItem(product)}
                    id="x"
                    className={`w-[50%] cursor-pointer overflow-hidden flex justify-center items-center hover:tracking-[0.3em] transition-all duration-500 ease ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white  hover:bg-white/90 hover:text-black'}`}
                  >
                    ADD TO CART
                  </div>
                </div>
                <div className={`w-full text-center pt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>2y International Warranty</p>
                </div>
                <div className={`w-full text-center pt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>Free shipping on all orders • 30-day return policy</p>
                </div>
              </div>
            </div>
            <div id="bob" className={`${blurClass} z-10 min-h-[170vh] w-[90vw] rounded-lg flex flex-col p-[3%] mt-8 gap-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
              <div
                id="fr"
                className={`${product.needblack === 'yes' ? 'bg-black' : isDarkMode ? 'bg-black' : 'bg-white'} h-[70vh] w-full rounded-lg flex flex-row-reverse justify-center items-center`}
              >
                <div className="h-full w-[50%] relative overflow-hidden cursor-pointer group">
                  <img
                    src={product.img5}
                    className="h-full w-full object-cover rounded-tr-lg rounded-br-lg transition-transform duration-200 group-hover:scale-105"
                    alt="Product Image"
                    onClick={() => handleImageClick(product.img5)}
                  />
                </div>
                <div className="w-[50%] h-full flex justify-center items-center relative overflow-hidden cursor-pointer group">
                  <img
                    src={product.fr}
                    className="h-[70%] object-contain transition-transform duration-200 group-hover:scale-105"
                    alt="Frequency Response Graph"
                    onClick={() => handleImageClick(product.fr)}
                  />
                </div>
              </div>
              <div id="sp" className="flex flex-col items-center gap-8 mt-[6%] p-8">
                <h3 className={`text-2xl w-[70%] font-medium text-center border-b pb-10 tracking-widest ${textClass}`}>Specifications</h3>
                <div className={`w-[70%] flex flex-col gap-6 text-center ${textClass}`}>
                  <div className="flex justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Driver Type</p>
                    <p>{product.drivers}</p>
                  </div>
                  {product.impedence && (
                    <div className="flex justify-between">
                      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Impedance</p>
                      <p>{product.impedence}</p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Frequency Response</p>
                    <p>{product.fres}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Connectors</p>
                    <p className="whitespace-pre-line">{product.connectors}</p>
                  </div>
                  {product.sensi && (
                    <div className="flex justify-between">
                      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Sensitivity</p>
                      <p>{product.sensi}</p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>THD</p>
                    <p className="whitespace-pre-line">{product.thd}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Weight</p>
                    <p className="whitespace-pre-line">{product.weight}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Included in the Box</p>
                    <p className="whitespace-pre-line">{product.inTheBox}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Image Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
              style={{ zIndex: 999999 }}
              onClick={closeModal}
            >
              <div className="relative aspect-square h-[70%] bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="relative w-full h-full">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white bg-black bg-opacity-70 hover:bg-opacity-90 text-xl font-bold w-12 h-12 flex items-center justify-center rounded-full transition-all z-10"
                  >
                    ✕
                  </button>
                  <img
                    src={modalImage}
                    className="w-full h-full object-contain"
                    alt="Enlarged product view"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Sticky Bottom Bar */}
          <StickyBottomBar
            product={product}
            addItem={addItem}
            show={showStickyBar}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Prod;