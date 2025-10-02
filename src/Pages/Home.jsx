import { useEffect, useRef } from "react";
import Header_top from "../components/Header_top.jsx";
import Header_sticky from "../components/Header_sticky.jsx";
import Carousel from "../components/Carousel.jsx";
import Fhero from "../components/Footer.jsx";
import Prodata from "../components/Prodata.js";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const Home = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const mainContainerRef = useRef(null);

    useEffect(() => {
        const container = mainContainerRef.current;
        if (!container) return;

        container.style.backgroundColor = isDarkMode ? '#0a0a0a' : '#ffffff';
        container.style.color = isDarkMode ? '#e5e5e5' : '#1a1a1a';

        const scrollElements = container.querySelectorAll("[data-scroll]");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('data-scroll', 'in');
                }
            });
        }, { threshold: 0.2 });

        scrollElements.forEach(el => {
            el.setAttribute('data-scroll', 'out');
            observer.observe(el);
        });

        return () => {
            scrollElements.forEach(el => observer.unobserve(el));
        };
    }, [isDarkMode]);

    useEffect(() => {
        document.title = "Sonora";
    }, []);

    const clicky = (product) => {
        navigate(`/products/${product.id}`, { state: { product } });
    };

    const bgClass = isDarkMode ? "bg-black text-white" : "bg-white text-black";
    const baseTextColor = isDarkMode ? 'text-white' : 'text-black';
    const mutedTextColor = isDarkMode ? 'text-white/60' : 'text-black/60';
    const borderColor = isDarkMode ? 'border-white/20' : 'border-black/20';
    const hoverBorderColor = isDarkMode ? 'group-hover:border-white/60' : 'group-hover:border-black/60';
    const svgFillColor = isDarkMode ? 'fill-white/70' : 'fill-black/70';
    const svgHoverFillColor = isDarkMode ? 'group-hover:fill-white' : 'group-hover:fill-black';

    const bestsellingIEMs = [
        { img: Prodata[11].image, name: "Performer 8", brand: "AFUL", desc: "A masterpiece of balance and detail, the Performer 8 sets a new standard for its class with its intricate hybrid driver system." },
        { img: Prodata[10].img4, name: "Hype 4", brand: "Thieaudio", desc: "Delivering thunderous yet controlled bass and crystal-clear highs, the Hype 4 is an audiophile's dream for energetic and engaging listening sessions." },
        { img: Prodata[15].img5, name: "Deuce", brand: "FatFreq", desc: "Engineered for the bass connoisseur, the Deuce provides a visceral, deep-reaching low-end without sacrificing clarity in the mids and treble." },
        { img: Prodata[9].img5, name: "EA2000", brand: "Simgot", desc: "The EA2000 redefines flagship performance, offering a rich, expansive soundstage and lifelike instrumental timbre that captivates and delights." },
    ];

    const bestsellingHeadphones = [
        { img: Prodata[3].img5, name: "Stellia", brand: "Focal", desc: "The ultimate closed-back luxury. Stellia combines stunning design with breathtaking dynamics and detail for an intimate listening experience." },
        { img: Prodata[0].img3, name: "HD 660 S2", brand: "Sennheiser", desc: "An evolution of a legend, the HD 660 S2 offers a warmer, more profound bass response, making it exceptionally compelling and enjoyable." },
        { img: Prodata[4].img5, name: "Azurys", brand: "Focal", desc: "Crafted for music lovers on the move, Azurys provides the signature Focal sound in a versatile, passive closed-back design." },
        { img: Prodata[1].img5, name: "HD 800 S", brand: "Sennheiser", desc: "A benchmark in analytical audio, the HD 800 S delivers an incredibly wide and precise soundstage, revealing every nuance of a recording." },
    ];


    return (
        <div className={isDarkMode ? "" : "bg-white"}>
            <style>{`
                body { cursor: auto; }
                [data-scroll] {
                    transition: opacity 1.2s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
                    will-change: opacity, transform;
                }
                [data-scroll="in"] { opacity: 1; transform: translateY(0) scale(1); }
                [data-scroll="out"] { opacity: 0; transform: translateY(80px) scale(0.95); }

                .product-image-card {
                    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
                }
                .product-image-card:hover {
                    transform: scale(1.03);
                }
                .glow-effect {
                    box-shadow: 0 0 25px 8px rgba(200, 200, 220, ${isDarkMode ? '0.05' : '0.1'}), 0 0 40px 15px rgba(200, 200, 220, ${isDarkMode ? '0.03' : '0.06'});
                }
            `}</style>

            <Header_top />
            <Header_sticky />

            <div id="video" className="absolute top-[16.5vh] h-[84vh] w-full">
               <Carousel />
            </div>
            <div className={`h-[83vh] w-full ${isDarkMode ? 'bg-black' : 'bg-white'}`}></div>

            <main ref={mainContainerRef} className={`w-full overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <section data-scroll className="py-24 md:py-32">
                    <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
                        <h2 className={`text-3xl md:text-4xl font-light tracking-[0.3em] mb-4 text-center ${baseTextColor}`}>
                            THE SONORA PROMISE
                        </h2>
                        <div className={`w-24 h-[1px] mb-12 md:mb-16 ${isDarkMode ? "bg-white/40" : "bg-black/40"}`}></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
                            {[
                                { title: "Free Delivery", desc: "Worldwide shipping at no additional cost", svg: <path d="m33.75 18-4.5-4.5H22.5v9h-2.25V9h-18v15.75h5.816a3.645 3.645 0 0 0-.191 1.125 3.375 3.375 0 1 0 6.75 0c0-.382-.061-.762-.18-1.125h10.508a3.61 3.61 0 0 0-.203 1.125 3.375 3.375 0 0 0 6.75 0c0-.385-.073-.767-.214-1.125h2.464V18Zm-3.634 1.125H24.75V15.75h3.375l2.363 2.363a.584.584 0 0 1-.394 1.012h.022Z"></path> },
                                { title: "Lifetime Warranty", desc: "Comprehensive manufacturer protection", svg: <><path d="M16 2a11 11 0 0 0-7 19.47v8.93l7-2.34 7 2.34v-8.93A11 11 0 0 0 16 2zm.31 20h-.61a9 9 0 1 1 .61 0z"></path><path d="M21.73 10.85h-3.97L16.54 7.2h-1.02l-1.22 3.65h-3.96l-.36.96 3.24 2.37-1.25 3.74.8.67 3.29-2.4 3.27 2.37.77-.64-1.25-3.74 3.23-2.37-.35-.96z"></path></> },
                                { title: "Authentic Excellence", desc: "Certified genuine products only", svg: <path fillRule="evenodd" clipRule="evenodd" d="M0 0v34h46V0H0Zm25.316 2.882c-2.735 1.036-5.306 3.513-7.392 8.095l-2.358 5.1C11.27 25.297 8.88 27.281 2.464 27.281V2.299h22.754c.072 0 .141.025.196.071a.298.298 0 0 1-.098.512Zm18.22 3.837v24.982H20.799a.307.307 0 0 1-.2-.067.299.299 0 0 1-.071-.384.303.303 0 0 1 .164-.132c2.735-1.036 5.306-3.513 7.393-8.095l2.357-5.1C34.73 8.703 37.12 6.719 43.536 6.719Z"></path> },
                                { title: "Risk-Free Returns", desc: "30-day satisfaction guarantee", svg: <path clipRule="evenodd" d="M19.454 5v3.6a13.2 13.2 0 1 1-9.336 3.864l1.704 1.692A10.8 10.8 0 1 0 19.454 11v3.6h-1.2l-4.8-4.8 4.8-4.8h1.2ZM18.25 20.504c0 .804-.42 1.428-1.068 1.752-.048.024-.084.06-.084.108s.036.084.084.108c.6.288 1.308.876 1.308 1.944 0 1.344-.948 2.496-2.784 2.496-1.668 0-2.784-.9-2.856-2.352h1.404c.06.672.564 1.236 1.428 1.236.792 0 1.38-.552 1.38-1.428 0-.924-.564-1.392-1.572-1.392h-.48v-1.08h.432c1.032 0 1.416-.624 1.416-1.344 0-.768-.468-1.236-1.2-1.236-.756 0-1.236.468-1.308 1.26h-1.392c.072-1.464 1.056-2.376 2.736-2.376 1.656 0 2.556 1.092 2.556 2.304Zm6.359 2.052c0-2.376-.636-3.24-1.644-3.24s-1.632.864-1.632 3.24c0 2.376.624 3.24 1.632 3.24s1.644-.864 1.644-3.24Zm1.416 0c0 3.216-1.344 4.356-3.06 4.356s-3.048-1.14-3.048-4.356 1.332-4.356 3.048-4.356 3.06 1.14 3.06 4.356Z"></path> },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center text-center group" data-scroll>
                                    <div className={`w-16 h-16 mb-6 flex items-center justify-center border transition-all duration-300 ${borderColor} ${hoverBorderColor}`}>
                                        <svg className={`w-8 h-8 transition-all duration-300 ${svgFillColor} ${svgHoverFillColor}`} viewBox={index === 2 ? "0 0 46 34" : (index === 3 ? "0 0 40 40" : (index === 0 ? "0 0 36 36" : "0 0 32 32"))} xmlns="http://www.w3.org/2000/svg" >
                                            {item.svg}
                                        </svg>
                                    </div>
                                    <h3 className={`text-sm font-medium tracking-[0.2em] uppercase mb-2 ${baseTextColor}`}>{item.title}</h3>
                                    <p className={`text-xs leading-relaxed ${mutedTextColor}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="best-iems" className="py-16 md:py-24 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div data-scroll className="text-center mb-16 md:mb-24">
                            <h2 className={`pb-5 font-light text-3xl md:text-4xl ${baseTextColor} tracking-[0.3em] text-center`}>
                                BESTSELLING IN-EAR MONITORS
                            </h2>
                            <div className={`w-24 h-[1px] mx-auto ${isDarkMode ? "bg-white/40" : "bg-black/40"}`}></div>
                        </div>

                        {bestsellingIEMs.map((item, index) => (
                            <div key={item.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index > 0 ? 'mt-32 md:mt-48' : ''}`}>
                                <div data-scroll className={`product-image-card ${index % 2 === 1 ? 'lg:order-2' : ''}`} onClick={() => { const product = Prodata.find((p) => p.pname === item.name); if (product) clicky(product); }}>
                                    <img src={item.img} className="rounded-2xl glow-effect aspect-square object-cover w-full cursor-pointer" alt={item.name}/>
                                </div>
                                <div data-scroll className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                    <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">{item.brand}</h3>
                                    <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mt-4 ${baseTextColor}`}>{item.name}</h2>
                                    <p className={`mt-8 text-lg ${mutedTextColor} leading-relaxed`}>{item.desc}</p>
                                    <button onClick={() => { const product = Prodata.find((p) => p.pname === item.name); if (product) clicky(product); }} className={`mt-12 text-lg font-bold inline-block relative group ${baseTextColor}`}>
                                        Discover The {item.name}
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="best-headphones" className="py-16 md:py-24 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div data-scroll className="text-center mb-16 md:mb-24">
                            <h2 className={`pb-5 font-light text-3xl md:text-4xl ${baseTextColor} tracking-[0.3em] text-center`}>
                                BESTSELLING HEADPHONES
                            </h2>
                            <div className={`w-24 h-[1px] mx-auto ${isDarkMode ? "bg-white" : "bg-black"}`}></div>
                        </div>

                        {bestsellingHeadphones.map((item, index) => (
                            <div key={item.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index > 0 ? 'mt-32 md:mt-48' : ''}`}>
                                <div data-scroll className={`product-image-card rounded-2xl shadow-2xl shadow-black ${index % 2 === 1 ? 'lg:order-2' : ''}`} onClick={() => { const product = Prodata.find((p) => p.pname === item.name); if (product) clicky(product); }}>
                                    <img src={item.img} className="rounded-2xl glow-effect aspect-square object-cover  w-full cursor-pointer" alt={item.name}/>
                                </div>
                                <div data-scroll className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                    <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">{item.brand}</h3>
                                    <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mt-4 ${baseTextColor}`}>{item.name}</h2>
                                    <p className={`mt-8 text-lg ${mutedTextColor} leading-relaxed`}>{item.desc}</p>
                                    <button onClick={() => { const product = Prodata.find((p) => p.pname === item.name); if (product) clicky(product); }} className={`mt-12 text-lg font-bold inline-block relative group ${baseTextColor}`}>
                                        Explore The {item.name}
                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Fhero />
        </div>
    );
};

export default Home;