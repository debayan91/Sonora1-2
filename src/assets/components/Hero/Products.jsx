import { useState, useEffect } from 'react';
import Hero from './Hero.jsx';
import Stickyhero from './Stickyhero.jsx';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import './pro.css';
import Prodata from './Prodata';

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams(); // Get category from URL
  const { isDarkMode } = useTheme(); // Access theme state

  // Set page title based on category
  useEffect(() => {
    if (category === 'headphones') {
      document.title = "Sonora - Headphones";
    } else if (category === 'iems') {
      document.title = "Sonora - IEMs";
    } else {
      document.title = "Sonora - All Products";
    }
  }, [category]);

  // Filter products based on category from URL
  const filteredProducts = category 
    ? Prodata.filter(product => product.category === category) 
    : Prodata;

  const totalProducts = filteredProducts.length;

  const clicky = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const [products, setProducts] = useState(filteredProducts);
  const [sortOption, setSortOption] = useState('featured');

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedProducts = [...products];

    switch (option) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedProducts = category ? Prodata.filter(product => product.category === category) : Prodata;
    }

    setProducts(sortedProducts);
  };

  // Update products when category changes
  useEffect(() => {
    setProducts(filteredProducts);
  }, [category]);

  return (

    
    <div className="min-h-screen flex flex-col items-center relative">
      {/* Background image with grayscale and brightness, scrolls with content */}
     <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: isDarkMode
            ? "url(https://mezeaudio.com/cdn/shop/files/Meze-Audio-Empyrean-headphone-04.webp?v=1713431934&width=1200)"
            : "url(https://w.wallhaven.cc/full/0j/wallhaven-0jkxqp.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: isDarkMode ? 'brightness(60%)' : 'brightness(100%)',
          backgroundAttachment: 'scroll'
        }}
      />
      {/* Separate overlay for gradual linear gradient to black or white at bottom, adjusted stops */}
      <div 
        className="absolute inset-0 -z-19"
        style={{
          background: isDarkMode 
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 80%)"
            : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 1) 70%)"
        }}
      />
      
      {/* Top navbar (normal flow) */}
      <div className="w-full z-10">
        <Hero />
      </div>
      
      {/* Bottom navbar (sticky, with explicit style to enforce stickiness) */}
      <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
        <Stickyhero />
      </div>
      
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-black/30 backdrop-blur-sm p-4 px-7 rounded-lg mb-8 flex justify-between items-center" style={{ backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.9)' }}>
            <h2 style={{ color: isDarkMode ? '#ffffff' : '#000000' }} className="text-xl font-roboto">{totalProducts} Products</h2>
            <div className="flex items-center">
              <label htmlFor="sort" style={{ color: isDarkMode ? '#ffffff' : '#000000' }} className="mr-2 text-sm">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="bg-black/30 border rounded-sm px-2 py-1 text-sm focus:outline-none"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
                  color: isDarkMode ? '#ffffff' : '#000000'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Ascending</option>
                <option value="price-high">Price: Descending</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-lg">
            {products.map(product => (
              <div key={product.id} id="pro" onClick={() => clicky(product)} className="rounded-lg cursor-pointer bg-black backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-white/30 transition-shadow duration-300 group" style={{ backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)', hover: { boxShadow: isDarkMode ? '0 4px 6px rgba(255, 255, 255, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.3)' } }}>
                <div className="group h-[300px] flex items-center justify-center bg-white relative overflow-hidden" style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="object-cover absolute transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0"
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover absolute transition-opacity duration-[0.6s] ease-in-out opacity-0 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 line-clamp-2" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>INR {product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer with explicit z-index to ensure it’s above background */}
      <div className="w-full z-10 relative">
        <Footer />
      </div>
    </div>
  );
};

export default Products;
