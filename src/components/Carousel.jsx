import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Prodata from "./Prodata.js";

const carouselItems = [
    { title: "Focal", topic: "BATHYS", video: "https://media.focal-naim.com/focal/file_manager_files/casques-3/bathys-deep-black/pp-video-bathys-deep-black.mp4", link: "8" },
    { title: "Focal", topic: "AZURYS", video: "https://media.focal-naim.com/focal/file_manager_files/home/casque/azurys/video-pc2.mp4", link: "5" },
    { title: "Sennheiser", topic: "IE 600", video: "https://eu-central-1-akqa.graphassets.com/AGz66yvUcQ42Ggm7CrXdgz/Se1vHnSoKm7bh5WBRvgD", link: "17" },
    { title: "Sennheiser", topic: "HD 620S", video: "https://eu-central-1-akqa.graphassets.com/AGz66yvUcQ42Ggm7CrXdgz/B6c3ParmRoGQHTGklxJA", link: "7" },
    { title: "Focal", topic: "Stellia", video: "https://media.focal-naim.com/focal/file_manager_files/home/casque/stellia/stellia-long-169-1.mp4", link: "4" },
    { title: "Sennheiser", topic: "IE 900", video: "https://eu-central-1-akqa.graphassets.com/AGz66yvUcQ42Ggm7CrXdgz/49Yw7KdURQidgBekcxDX", link: "18" },
    { title: "Sennheiser", topic: "HD 660S2", video: "https://eu-central-1-akqa.graphassets.com/AGz66yvUcQ42Ggm7CrXdgz/RW3PjkKDTpmSQGUA9fqU", link: "1" },
];

const Carousel = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const carouselInterval = 15000; // 15 seconds

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
        const interval = setInterval(handleNext, carouselInterval);
        return () => clearInterval(interval);
    }, [current]);

    return (
        <div id="video-container" className="relative h-full w-screen">
            <div id="carousel" className="h-full w-full overflow-hidden relative">
                <div id="list" className="absolute inset-0">
                    {carouselItems.map((item, index) => (
                        <div
                            key={item.topic}
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
                                key={item.video}
                            >
                                <source src={item.video} type="video/mp4" />
                            </video>

                            <div
                                id="content"
                                className="relative w-full h-full flex flex-col justify-end items-center md:justify-center md:items-start p-8 md:p-12 lg:p-20 text-white text-center md:text-left"
                            >
                                <div>
                                    <div
                                        id="title"
                                        className="text-4xl lg:text-6xl font-[100] drop-shadow-md tracking-[0.3em]"
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        id="topic"
                                        className="text-4xl lg:text-6xl font-extrabold drop-shadow-md"
                                    >
                                        {item.topic}
                                    </div>
                                    <div
                                        id="des"
                                        className="pt-8 flex flex-col sm:flex-row gap-5 items-center justify-center md:justify-start"
                                    >
                                        <button
                                            id="register"
                                            className="bg-white w-full sm:w-[14em] z-10 text-black px-8 py-3 text-[15px] tracking-[0.2em] hover:bg-[#000000a7] hover:text-white hover:tracking-[0.25em] transition-all duration-[500ms]"
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
                                            onClick={() => navigate("/demo")}
                                            className="bg-white w-full sm:w-[14em] z-10 text-black px-8 py-3 text-[15px] tracking-[0.2em] hover:bg-[#000000a7] hover:text-white hover:tracking-[0.25em] transition-all duration-[500ms]"
                                        >
                                            BOOK A DEMO
                                        </button>
                                    </div>

                                    <div
                                        id="mov"
                                        className="flex justify-center gap-4 w-full mt-5 mb-6 md:absolute md:bottom-8 md:right-8 md:w-auto md:mt-0"
                                    >
                                        <button
                                            id="pr"
                                            className="h-8 w-16 bg-black bg-opacity-50 text-white hover:bg-white hover:text-black transition-colors"
                                            aria-label="Previous Slide"
                                            onClick={handlePrevious}
                                        >
                                            &lt;
                                        </button>
                                        <button
                                            id="nx"
                                            className="h-8 w-16 bg-black bg-opacity-50 text-white hover:bg-white hover:text-black transition-colors"
                                            aria-label="Next Slide"
                                            onClick={handleNext}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div id="progress-bars" className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                    {carouselItems.map((_, index) => (
                        <div key={index} className="w-12 lg:w-20 md:w-10 sm:w-10  h-1 bg-white/40 rounded-full overflow-hidden">
                            {index === current && (
                                <div
                                    key={current}
                                    className="h-full bg-white rounded-full animate-progressBar"
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;