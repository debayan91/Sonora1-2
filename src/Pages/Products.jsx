import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Footer from '../components/Footer.jsx';
import Prodata from '../components/Prodata.js';

const Products = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { isDarkMode } = useTheme();
    const [sortOption, setSortOption] = useState('featured');

    const categoryProducts = useMemo(() => {
        return category
            ? Prodata.filter(p => p.category === category)
            : Prodata;
    }, [category]);

    const sortedProducts = useMemo(() => {
        let sorted = [...categoryProducts];
        switch (sortOption) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'featured':
            default:
                return categoryProducts;
        }
        return sorted;
    }, [sortOption, categoryProducts]);

    useEffect(() => {
        const title = category ? `Sonora - ${category.charAt(0).toUpperCase() + category.slice(1)}` : "Sonora - All Products";
        document.title = title;
    }, [category]);

    const clicky = (product) => {
        navigate(`/products/${product.id}`, { state: { product } });
    };

    const bgColor = isDarkMode ? 'bg-black' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const mutedTextColor = isDarkMode ? 'text-white/70' : 'text-black/70';
    const cardBg = isDarkMode ? 'bg-black/40 backdrop-blur-sm' : 'bg-white backdrop-blur-sm';
    const selectClasses = isDarkMode
        ? 'bg-black/30 border border-white/60 text-white'
        : 'bg-white/30 border border-black/60 text-black';
    const cardImageBg = isDarkMode ? 'bg-white' : 'bg-white';

    // const Background = () => (
    //     <div className="absolute inset-0 ">
    //         <div
    //             className="absolute inset-0 bg-cover bg-center"
    //             style={{
    //                 backgroundImage: isDarkMode
    //                     ? "url(https://mezeaudio.com/cdn/shop/files/Meze-Audio-Empyrean-headphone-04.webp?v=1713431934&width=1200)"
    //                     : "url(https://w.wallhaven.cc/full/0j/wallhaven-0jkxqp.jpg)",
    //                 filter: isDarkMode ? 'brightness(0.6)' : 'brightness(1)',
    //             }}
    //         />
    //         <div
    //             className="absolute inset-0"
    //             style={{
    //                 background: isDarkMode
    //                     ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 60%, #000 80%)"
    //                     : "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, #fff 70%)"
    //             }}
    //         />
    //     </div>
    // );

    return (
        <div className={`min-h-screen flex flex-col items-center relative ${bgColor}`}>
            {/*<Background />*/}
            <Header_top />
            <Header_sticky />

            <main className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 ">
                <div className={`p-4 sm:p-5 lg:p-2 mb-10 flex flex-col sm:flex-row justify-between z-[-9] items-center ${cardBg}`}>
                    <h2 className={`text-xl font-roboto mb-4 sm:mb-0 ${textColor}`}>{sortedProducts.length} Products</h2>
                    <div className="flex items-center  px-3">
                        <label htmlFor="sort" className={`mr-2 text-sm ${textColor}`}>Sort by:</label>
                        <div className={'border border-gray-900 pr-2'}>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className={`border-none px-2 py-1 text-sm focus:outline-none ${selectClasses}`}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Ascending</option>
                            <option value="price-high">Price: Descending</option>
                            <option value="rating">Customer Rating</option>
                        </select>
                        </div>
                    </div>
                </div>

                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                        {sortedProducts.map(product => (
                            <div
                                key={product.id}
                                onClick={() => clicky(product)}
                                className={` cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 group ${cardBg} hover:scale-105`} // Refined shadows
                            >
                                <div className={`relative h-72 sm:h-72 lg:h-96 flex items-center justify-center border-b-[1px] border-black overflow-hidden  ${cardImageBg}`}> {/* Adjusted height for images */}
                                    <img
                                        src={product.image1}
                                        alt={product.name}
                                        className="absolute h-full w-full object-contain object-center transition-opacity duration-500 ease-in-out group-hover:opacity-0" // object-contain, object-center
                                    />
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="absolute h-full w-full object-contain object-center transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" // object-contain, object-center
                                    />
                                </div>
                                <div className="py-4 px-0">
                                    <div className="flex text-[0.7em] lg:text-[1em] w-full justify-between">

                                        <div className={` font-extralight tracking-widest uppercase mb-1 line-clamp-2 ${textColor}`}>{product.bname}</div>

                                        <div className={` font-bold tracking-widest uppercase mb-1 line-clamp-2 ${textColor}`}>{product.pname}</div>

                                    </div>
                                    <div className="flex text-[0.7em] lg:text-[1em] justify-between items-center mt-2">
                                        <span className={`font-bold tracking-widest ${textColor}`}>₹{product.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`text-center py-20 rounded-lg ${cardBg}`}>
                        <h3 className={`text-2xl font-medium ${textColor}`}>No Products Found</h3>
                        <p className={`mt-2 ${mutedTextColor}`}>Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Products;