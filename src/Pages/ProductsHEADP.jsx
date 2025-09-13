import { useState, useEffect } from 'react';
import Header_top from '../components/Header_top.jsx';
import Header_sticky from '../components/Header_sticky.jsx';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import './pro.css';
import Prodata from '../components/Prodata.js';

const Prods = () => {
  useEffect(() => {
    document.title = "Sonora - Headphones";
  }, []);
  const navigate = useNavigate();
  const heads = Prodata.filter(product => product.category == 'headphones');
  const clicky = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const [products, setProducts] = useState(heads);
  const [sortOption, setSortOption] = useState('featured');

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    
    let sortedProducts = [...products];
    
    switch(option) {
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
        sortedProducts = [...heads];
    }
    
    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative">
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
      {/* Separate overlay for gradual linear gradient to black at bottom, adjusted stops */}
      <div 
        className="absolute inset-0 -z-19"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 80%)",
          backgroundSize: 'auto',
          backgroundPosition: 'top',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'scroll'
        }}
      />
      
      {/* Top navbar (normal flow) */}
      <div className="w-full z-10">
        <Header_top />
      </div>
      
      {/* Bottom navbar (sticky, with explicit style to enforce stickiness) */}
      <div className="sticky top-0 w-full z-50" style={{ position: 'sticky', top: '0px', width: '100%', zIndex: 50 }}>
        <Header_sticky />
      </div>
      
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-black/30 backdrop-blur-sm p-4 px-7 rounded-lg mb-8 flex justify-between items-center">
            <h2 className="text-white text-xl font-roboto">{heads.length} Products</h2>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-white mr-2 text-sm">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption}
                onChange={handleSortChange}
                className="bg-black/30 border border-[rgba(255,255,255,0.65)] rounded-sm text-white px-2 py-1 text-sm focus:outline-none"
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
              <div key={product.id} id="pro" onClick={() => clicky(product)} className="rounded-lg bg-black/30 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-white/30 transition-shadow duration-300 group">
                <div className="h-[300px] flex items-center justify-center bg-white/10 relative overflow-hidden">
                  <img 
                    src={product.image1} 
                    alt={product.name} 
                    className="h-full object-cover absolute transition-opacity duration-[0.6s] ease-in-out group-hover:opacity-0"
                  />
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full object-cover absolute transition-opacity duration-[0.6s] ease-in-out opacity-0 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">INR {product.price.toLocaleString()}</span>
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

export default Prods;
