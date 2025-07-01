import { useEffect, useRef, useState } from "react";
import Hero from "./Hero.jsx";
import Stickyhero from "./Stickyhero.jsx";
import sampleVideo from "./Sample-video.mp4";
import sampleVideo1 from "./hd620S.mp4";
import sampleVideo2 from "./hd660s2.mp4";
import sampleVideo3 from "./stellia.mp4";
import ie9 from "./ie9.mp4";
import ie6 from "./ie6.mp4";
import "./Home.css";
import FramerEmbed from "./Framerfile";
import Fhero from "./Footer";
import Prodata from "./Prodata";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx"; // Import useTheme

const carouselItems = [
  {
    title: "Focal",
    topic: "BATHYS",
    video: sampleVideo,
    link: "8",
  },
  {
    title: "Sennheiser",
    topic: "IE 600",
    video: ie6,
    link: "17",
  },
  {
    title: "Sennheiser",
    topic: "HD 620S",
    video: sampleVideo1,
    link: "7",
  },
  {
    title: "Focal",
    topic: "Stellia",
    video: sampleVideo3,
    link: "4",
  },
  {
    title: "Sennheiser",
    topic: "IE 900",
    video: ie9,
    link: "18",
  },
  {
    title: "Sennheiser",
    topic: "HD 660S2",
    video: sampleVideo2,
    link: "1",
  },
];

const Home = () => {
  const { isDarkMode } = useTheme(); // Use useTheme hook
const [videoDuration, setVideoDuration] = useState(15000);
  useEffect(() => {
    document.title = "Sonora";
  }, []);

  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const clicky = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  // Theme classes
  const bgClass = isDarkMode ? "bg-black" : "bg-white";
  const textClass = isDarkMode ? "text-white" : "text-black";
  const borderClass = isDarkMode ? "border-white" : "border-black";

  return (
    <div className={isDarkMode ? "" : "bg-white"}>
      <Hero /> {/* No need to pass isDarkMode and setIsDarkMode now */}
      <Stickyhero />
      <div id="video" className="absolute top-[17vh] h-[83vh] w-screen">
        <div
          id="carousel"
          className="h-[calc(100vh-16.5vh)] w-full overflow-hidden relative"
        >
          <div id="list" className="absolute inset-0">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                id="item"
                className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div
                  id="content"
                  className="absolute inset-0 flex flex-col justify-center text-white text-center "
                >
                  <div
                    id="title"
                    key={`title-${current}`}
                    className="absolute bottom-80 left-20 text-6xl font-[100] text-white drop-shadow-md tracking-[0.3em]"
                  >
                    {item.title}
                  </div>
                  <div
                    id="topic"
                    key={`topic-${current}`}
                    className="absolute bottom-60 left-20 text-6xl font-extrabold drop-shadow-md"
                  >
                    {item.topic}
                  </div>
                  <div
                    id="des"
                    key={`des-${current}`}
                    className="absolute bottom-40 left-20 pt-8 flex gap-5"
                  >
                    <button
                      id="register"
                      key={`register-${current}`}
                      className="bg-white w-[14em] z-10 text-black px-8 py-3 text-[15px] tracking-[0.2em] hover:bg-[#000000a7] hover:text-white hover:tracking-[0.25em] transition-all duration-[500ms]"
                      onClick={() => {
                        const product = Prodata.find(
                          (p) => p.id === parseInt(carouselItems[current].link)
                        );
                        if (product) clicky(product);
                      }}
                    >
                      SHOP
                    </button>
                    <button
                      id="register1"
                      key={`register1-${current}`}
                      onClick={() => navigate("/demo")}
                      className="bg-white w-[14em] overflow-hidden z-10 text-black px-8 py-3 text-[15px] tracking-[0.2em] hover:bg-[#000000a7] hover:text-white hover:tracking-[0.25em] 	transition-all duration-[500ms]"
                    >
                      BOOK A DEMO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div id="mov" className="absolute bottom-8 right-8 flex gap-4">
            <button
              id="pr"
              className="h-8 w-16 bg-black bg-opacity-50 text-white  hover:bg-white hover:text-black transition-colors"
              aria-label="Previous Slide"
              onClick={handlePrevious}
            >
              &lt;
            </button>
            <button
              id="nx"
              className="h-8 w-16 bg-black bg-opacity-50 text-white  hover:bg-white  hover:text-black transition-colors"
              aria-label="Next Slide"
              onClick={handleNext}
            >
              &gt;
            </button>



           
          </div>
        </div>
      </div>
      <div className={`h-[76.3vh] w-screen ${bgClass}`}></div>
      <div
        id="Why"
        ref={observerRef}
        className="h-[100dvh] overflow-hidden p-0 m-0"
      >
        <FramerEmbed />
      </div>






      <div className={`${bgClass} w-screen`}>








       <div className={`relative h-[50vh] w-screen flex justify-center items-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
  <div className={`relative z-10 flex flex-col justify-center items-center max-w-6xl mx-auto px-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
    <h2 className='text-4xl font-light tracking-[0.3em] mb-4 text-center'>THE SONORA PROMISE</h2>
    <div className={`w-24 h-[1px] mb-16 ${isDarkMode ? 'bg-white/40' : 'bg-black/40'}`}></div>
    
    <div className='grid grid-cols-1 md:grid-cols-4 gap-12 w-full'>
      {[
        {
          title: "Free Delivery",
          desc: "Worldwide shipping at no additional cost",
          svg: <svg className={`w-8 h-8 transition-all duration-300 ${isDarkMode ? 'fill-white/70 group-hover:fill-white' : 'fill-black/70 group-hover:fill-black'}`} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="m33.75 18-4.5-4.5H22.5v9h-2.25V9h-18v15.75h5.816a3.645 3.645 0 0 0-.191 1.125 3.375 3.375 0 1 0 6.75 0c0-.382-.061-.762-.18-1.125h10.508a3.61 3.61 0 0 0-.203 1.125 3.375 3.375 0 0 0 6.75 0c0-.385-.073-.767-.214-1.125h2.464V18Zm-3.634 1.125H24.75V15.75h3.375l2.363 2.363a.584.584 0 0 1-.394 1.012h.022Z"></path></svg>
        },
        {
          title: "Lifetime Warranty",
          desc: "Comprehensive manufacturer protection",
          svg: <svg className={`w-8 h-8 transition-all duration-300 ${isDarkMode ? 'fill-white/70 group-hover:fill-white' : 'fill-black/70 group-hover:fill-black'}`} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2a11 11 0 0 0-7 19.47v8.93l7-2.34 7 2.34v-8.93A11 11 0 0 0 16 2zm.31 20h-.61a9 9 0 1 1 .61 0z"></path><path d="M21.73 10.85h-3.97L16.54 7.2h-1.02l-1.22 3.65h-3.96l-.36.96 3.24 2.37-1.25 3.74.8.67 3.29-2.4 3.27 2.37.77-.64-1.25-3.74 3.23-2.37-.35-.96z"></path></svg>
        },
        {
          title: "Authentic Excellence",
          desc: "Certified genuine products only",
          svg: <svg className={`w-8 h-8 transition-all duration-300 ${isDarkMode ? 'fill-white/70 group-hover:fill-white' : 'fill-black/70 group-hover:fill-black'}`} viewBox="0 0 46 34" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 0v34h46V0H0Zm25.316 2.882c-2.735 1.036-5.306 3.513-7.392 8.095l-2.358 5.1C11.27 25.297 8.88 27.281 2.464 27.281V2.299h22.754c.072 0 .141.025.196.071a.298.298 0 0 1-.098.512Zm18.22 3.837v24.982H20.799a.307.307 0 0 1-.2-.067.299.299 0 0 1-.071-.384.303.303 0 0 1 .164-.132c2.735-1.036 5.306-3.513 7.393-8.095l2.357-5.1C34.73 8.703 37.12 6.719 43.536 6.719Z"></path></svg>
        },
        {
          title: "Risk-Free Returns",
          desc: "30-day satisfaction guarantee",
          svg: <svg className={`w-8 h-8 transition-all duration-300 ${isDarkMode ? 'fill-white/70 group-hover:fill-white' : 'fill-black/70 group-hover:fill-black'}`} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M19.454 5v3.6a13.2 13.2 0 1 1-9.336 3.864l1.704 1.692A10.8 10.8 0 1 0 19.454 11v3.6h-1.2l-4.8-4.8 4.8-4.8h1.2ZM18.25 20.504c0 .804-.42 1.428-1.068 1.752-.048.024-.084.06-.084.108s.036.084.084.108c.6.288 1.308.876 1.308 1.944 0 1.344-.948 2.496-2.784 2.496-1.668 0-2.784-.9-2.856-2.352h1.404c.06.672.564 1.236 1.428 1.236.792 0 1.38-.552 1.38-1.428 0-.924-.564-1.392-1.572-1.392h-.48v-1.08h.432c1.032 0 1.416-.624 1.416-1.344 0-.768-.468-1.236-1.2-1.236-.756 0-1.236.468-1.308 1.26h-1.392c.072-1.464 1.056-2.376 2.736-2.376 1.656 0 2.556 1.092 2.556 2.304Zm6.359 2.052c0-2.376-.636-3.24-1.644-3.24s-1.632.864-1.632 3.24c0 2.376.624 3.24 1.632 3.24s1.644-.864 1.644-3.24Zm1.416 0c0 3.216-1.344 4.356-3.06 4.356s-3.048-1.14-3.048-4.356 1.332-4.356 3.048-4.356 3.06 1.14 3.06 4.356Z"></path></svg>
        }
      ].map((item, index) => (
        <div key={index} className='flex flex-col items-center text-center group'>
          <div className={`w-16 h-16 mb-6 flex items-center justify-center border transition-all duration-300 ${isDarkMode ? 'border-white/20 group-hover:border-white/60' : 'border-black/20 group-hover:border-black/60'}`}>
            {item.svg}
          </div>
          <h3 className="text-sm font-medium tracking-[0.2em] uppercase mb-2">{item.title}</h3>
          <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>











        <div
          id="best"
          className="p-10 flex flex-col items-center justify-center h-[60vh] w-screen"
        >
          <p
            className={`pb-5 font-roboto text-4xl ${textClass} tracking-widest`}
          >
            Bestselling In Ear Monitors
          </p>
          <div className="h-full w-screen flex gap-5 p-10">
            {[
              {
                img: Prodata[11].image,
                name: "Performer 8",
                brand: "AFUL",
                tracking: "[0.4em]",
              },
              {
                img: Prodata[10].img4,
                name: "Hype 4",
                brand: "Thieaudio",
                tracking: "[0.45em]",
              },
              {
                img: Prodata[15].img5,
                name: "Deuce",
                brand: "FatFreq",
                tracking: "[0.45em]",
              },
              {
                img: Prodata[9].img5,
                name: "EA2000",
                brand: "Simgot",
                tracking: "[0.45em]",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="w-[25%] h-full flex flex-col rounded-lg justify-center items-center overflow-hidden group relative"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div
                  id="shadow"
                  className="relative z-10 text-white opacity-0 hover:opacity-100 text-center h-full w-full flex flex-col justify-center items-center p-4 transition-all duration-500 group-hover:backdrop-blur-lg"
                  onClick={() => {
                    const product = Prodata.find((p) => p.pname === item.name);
                    if (product) clicky(product);
                  }}
                >
                  <h3
                    className={`text-2xl font-bold transition-all duration-500 group-hover:tracking-${item.tracking}`}
                  >
                    {item.name.toUpperCase()}
                  </h3>
                  <p className="text-lg pr-[1em]">by {item.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          id="best"
          className="p-10 flex flex-col items-center justify-center h-[60vh] w-screen"
        >
          <p
            className={`pb-5 font-roboto text-4xl ${textClass} tracking-widest`}
          >
            Bestselling Headphones
          </p>
          <div className="h-full w-screen flex gap-5 p-10">
            {[
              { img: Prodata[3].img5, name: "Stellia", brand: "Focal" },
              { img: Prodata[0].img3, name: "HD 660 S2", brand: "Sennheiser" },
              { img: Prodata[4].img5, name: "Azurys", brand: "Focal" },
              { img: Prodata[1].img5, name: "HD 800 S", brand: "Sennheiser" },
            ].map((item, index) => (
              <div
                key={index}
                className="w-[25%] h-full flex flex-col rounded-lg justify-center items-center overflow-hidden group relative"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div
                  id="shadow"
                  className="relative z-10 text-white opacity-0 hover:opacity-100 text-center h-full w-full flex flex-col justify-center items-center p-4 transition-all duration-500 group-hover:backdrop-blur-lg"
                  onClick={() => {
                    const product = Prodata.find((p) => p.pname === item.name);
                    if (product) clicky(product);
                  }}
                >
                  <h3 className="text-2xl font-bold group-hover:tracking-[0.45em] transition-all duration-500">
                    {item.name.toUpperCase()}
                  </h3>
                  <p className="text-lg pr-[1em]">by {item.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Fhero />
    </div>
  );
};

export default Home;
