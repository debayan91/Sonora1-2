import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Footer from '../components/Footer.jsx';
import './pro.css';
import { useLocation } from 'react-router-dom';
import { useCart } from '/src/context/Cartcontext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useState, useEffect, useRef, useCallback } from 'react';

// NOTE: The implementation of this hook from your code is causing the issue.
// By adding a `key` to the main content, we force a complete reset, which
// sidesteps the bug in the hook. The hook itself is left as-is.
const useScrollAnimation = () => {
    const observerRef = useRef(null);

    useEffect(() => {
        return () => observerRef.current?.disconnect();
    }, []);

    return useCallback((node) => {
        if (!node) return;
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observerRef.current.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );
        }
        observerRef.current.observe(node);
    }, []);
};


const StickyBottomBar = ({ product, addItem, show, isDarkMode, buttonText = 'ADD TO CART' }) => {
    const textClass = isDarkMode ? 'text-white' : 'text-black';
    const borderClass = isDarkMode ? 'border-t-black' : 'border-t-white';
    const buttonClass = isDarkMode ? 'bg-white text-black hover:bg-opacity-80' : 'bg-black text-white hover:bg-opacity-80';
    const shadowClass = isDarkMode ? 'shadow-[0_-20px_12px_rgba(255,255,255,0.04)]' : 'shadow-[0_-20px_12px_rgba(0,0,0,0.04)]';

    if (!product) return null;

    return (
        <div
            className={`fixed left-0 w-full flex items-center backdrop-blur-lg justify-between px-4 sm:px-8 py-3 ${shadowClass} border-t ${borderClass} transition-transform duration-500 z-[100]`}
            style={{
                bottom: 0,
                transform: show ? 'translateY(0%)' : 'translateY(100%)',
                pointerEvents: show ? 'auto' : 'none'
            }}
        >
            <div className="flex items-center gap-3 sm:gap-6 overflow-hidden">
                <span className={`text-sm sm:text-base font-sans font-semibold truncate ${textClass}`}>{product.bname}</span>
                <span className={`text-sm sm:text-base font-normal hidden sm:block truncate ${textClass}`}>{product.pname}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
                <span className={`text-sm sm:text-base font-medium ${textClass}`}>INR {product.price.toLocaleString()}</span>
                <button
                    onClick={addItem}
                    className={`px-4 sm:px-6 py-2 rounded transition font-semibold text-xs sm:text-sm whitespace-nowrap ${buttonClass}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

const Prod = () => {
    const location = useLocation();
    const [product] = useState(location.state?.product);

    const { addItem } = useCart();
    const { isDarkMode } = useTheme();

    const animateRef = useScrollAnimation();

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl">Product not found.</h1>
            </div>
        );
    }

    const productImages = [product.image1, product.image, product.img3, product.img4, product.img5].filter(Boolean);

    const [mainImage, setMainImage] = useState(productImages[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [cartButtonText, setCartButtonText] = useState('ADD TO CART');
    const detRef = useRef(null);
    const [showStickyBar, setShowStickyBar] = useState(false);

    useEffect(() => {
        document.title = `Buy ${product.pname}`;
        setMainImage(productImages[0] || product.image);
    }, [product]);

    useEffect(() => {
        const handleScroll = () => {
            if (detRef.current) {
                setShowStickyBar(detRef.current.getBoundingClientRect().bottom <= 0);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeModal();
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    const handleAddToCart = () => {
        addItem(product);
        setCartButtonText("ADDED ✓");
        setTimeout(() => setCartButtonText("ADD TO CART"), 2000);
    };

    const handleImageClick = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setZoomPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const textClass = isDarkMode ? 'text-white' : 'text-black';
    const blurClass = 'backdrop-blur-sm';
    const bgClass = isDarkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-80';

    return (
        <>
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .animate-on-scroll {
                  opacity: 0;
                  transform: translateY(30px);
                  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .animate-on-scroll.is-visible {
                  opacity: 1;
                  transform: translateY(0);
                }
            `}</style>
            <div className="font-roboto tracking-widest flex flex-col items-center relative">
                {/* FIX 1: Restored the dynamic background image and filter styles */}
                <div className="absolute inset-0 -z-20 bg-cover bg-scroll" style={{
                    backgroundImage: `url(${product.category === 'headphones' ? 'https://w.wallhaven.cc/full/0j/wallhaven-0jkxqp.jpg' : 'https://mezeaudio.com/cdn/shop/files/Meze-Empyrean-headphone-01-grain_11e6522a-cff7-4d26-aea6-7f4d3da918eb.webp?v=1726579193&width=3000'})`,
                    backgroundPosition: product.category === 'headphones' ? 'center' : 'bottom right',
                    filter: isDarkMode ? 'grayscale(100%) brightness(30%)' : 'grayscale(100%) brightness(100%)',
                }}/>
                <div className="absolute inset-0 -z-10" style={{
                    backgroundImage: isDarkMode
                        ? "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 95%)"
                        : "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 95%)",
                }}/>

                <div className="w-full z-10"><Header_top /></div>
                <div className="sticky top-0 w-full z-50"><Header_sticky /></div>

                {/* FIX 2: Added a `key` prop here. When the theme changes, this key changes,
                    forcing React to remount this entire main section. This resets the
                    animation state and fixes the disappearing content bug. */}
                <main key={isDarkMode} className="relative z-10 w-full">
                    <div className="flex flex-col justify-center items-center p-4 md:p-8 lg:p-12">
                        <section ref={animateRef} className={`${blurClass} ${bgClass} animate-on-scroll w-full max-w-screen-xl rounded-lg flex flex-col lg:flex-row p-4 md:p-8`}>
                            {/* Image Gallery: Mobile (Horizontal Scroll) */}
                            <div className="lg:hidden w-full flex-shrink-0 order-2 lg:order-1 mt-8">
                                <div className="flex space-x-2 overflow-x-auto p-2">
                                    {productImages.map((img, index) => (
                                        <button key={index} onClick={() => setMainImage(img)} className={`flex-shrink-0 w-20 h-20 rounded-md cursor-pointer transition-opacity ${mainImage === img ? 'ring-2 ring-gray-500' : ''}`}>
                                            <img src={img} loading="lazy" className="h-full w-full object-cover rounded-md pointer-events-none" alt={`${product.pname} view ${index + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Image Gallery: Desktop (Vertical) */}
                            <div className="hidden lg:flex h-[70vh] overflow-y-auto w-[10%] rounded-lg flex-col gap-4 p-2 order-1 no-scrollbar">
                                {productImages.map((img, index) => (
                                    <button key={index} onClick={() => setMainImage(img)} className={`w-full aspect-square cursor-pointer opacity-90 hover:opacity-100 transition-opacity ${mainImage === img ? 'ring-2 ring-gray-300' : ''}`}>
                                        <img src={img} loading="lazy" className="h-full w-full object-cover pointer-events-none" alt={`${product.pname} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image & Zoom */}
                            <div className="lg:h-[70vh] w-full lg:w-[45%] flex items-center justify-center p-2 lg:p-8 relative order-1 lg:order-2">
                                <div onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative w-full aspect-square">
                                    <img src={mainImage} onClick={() => handleImageClick(mainImage)} className="h-full w-full object-contain cursor-pointer" alt="Main product view" />
                                    {isHovering && (
                                        <div className={`hidden lg:block absolute left-full top-0 ml-4 w-full h-full border overflow-hidden shadow-lg z-50 ${isDarkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-300'}`}>
                                            <div className="w-full h-full bg-cover bg-no-repeat " style={{ backgroundImage: `url(${mainImage})`, backgroundSize: '250%', backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%` }}/>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Details */}
                            <div ref={detRef} className={`w-full lg:w-[45%] flex flex-col gap-2 p-2 lg:p-8 order-3 ${textClass}`}>
                                <h2 className={`text-xl md:text-2xl tracking-[0.2em] font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.bname}</h2>
                                <h1 className="text-3xl md:text-5xl font-medium mt-1">{product.pname}</h1>
                                <hr className={`my-4 md:my-6 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                                <div className="text-2xl md:text-4xl font-light">INR {product.price.toLocaleString()}</div>
                                <p className={`my-4 md:my-8 text-sm md:text-base text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{product.des}</p>
                                <div className="flex flex-col sm:flex-row gap-3 my-4 md:my-6">
                                    <button className={`w-full sm:w-[50%] py-3 text-sm font-bold cursor-pointer overflow-hidden flex justify-center items-center hover:tracking-[0.2em] transition-all duration-300 ease ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-opacity-80'}`}>BUY NOW</button>
                                    <button onClick={handleAddToCart} className={`w-full sm:w-[50%] py-3 text-sm font-bold cursor-pointer overflow-hidden flex justify-center items-center hover:tracking-[0.2em] transition-all duration-300 ease ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-opacity-80'}`}>{cartButtonText}</button>
                                </div>
                                <div className={`w-full text-center pt-3 text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <p>2y International Warranty</p>
                                    <p>Free shipping on all orders • 30-day return policy</p>
                                </div>
                            </div>
                        </section>

                        <section className={`${blurClass} ${bgClass} w-full max-w-screen-xl rounded-lg flex flex-col p-4 md:p-8 mt-16 lg:mt-8 gap-8`}>
                            <div ref={animateRef} className={`animate-on-scroll min-h-[50vh] w-full rounded-lg flex flex-col lg:flex-row-reverse justify-center items-center ${product.needblack === 'yes' || isDarkMode ? 'bg-black' : 'bg-white'}`}>
                                <div className="w-full lg:w-[50%] aspect-video lg:aspect-auto lg:h-full relative overflow-hidden cursor-pointer group">
                                    <img src={product.img5} loading="lazy" className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" alt="Product lifestyle" onClick={() => handleImageClick(product.img5)}/>
                                </div>
                                <div className="w-full lg:w-[50%] h-full flex justify-center items-center p-4 relative overflow-hidden cursor-pointer group">
                                    <img src={product.fr} loading="lazy" className="max-h-[40vh] object-contain transition-transform duration-200 group-hover:scale-105" alt="Frequency Response Graph" onClick={() => handleImageClick(product.fr)}/>
                                </div>
                            </div>
                            <div ref={animateRef} className="animate-on-scroll flex flex-col items-center gap-8 p-4 md:p-8">
                                <h3 className={`text-xl md:text-2xl w-full md:w-[70%] font-medium text-center border-b pb-6 md:pb-10 tracking-widest ${textClass}`}>Specifications</h3>
                                <div className={`w-full md:w-[70%] flex flex-col gap-4 text-sm md:text-base ${textClass}`}>
                                    {[
                                        { label: "Driver Type", value: product.drivers }, { label: "Impedance", value: product.impedence }, { label: "Frequency Response", value: product.fres }, { label: "Connectors", value: product.connectors }, { label: "Sensitivity", value: product.sensi }, { label: "THD", value: product.thd }, { label: "Weight", value: product.weight }, { label: "Included in the Box", value: product.inTheBox }
                                    ].map((spec, index) => spec.value && (
                                        <div key={index} className="flex justify-between">
                                            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{spec.label}</p>
                                            <p className="text-right whitespace-pre-line">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[999]" onClick={closeModal}>
                            <div className="relative w-full h-full max-w-4xl max-h-[80vh] bg-black rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-80 text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full transition-all z-10">✕</button>
                                <img src={modalImage} className="w-full h-full object-contain" alt="Enlarged product view" />
                            </div>
                        </div>
                    )}

                    <StickyBottomBar
                        product={product}
                        addItem={handleAddToCart}
                        show={showStickyBar}
                        isDarkMode={isDarkMode}
                        buttonText={cartButtonText}
                    />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Prod;