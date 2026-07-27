import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Truck, ShieldCheck, Clock, ArrowRight, Star, Leaf, Heart, Plus } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import toast from 'react-hot-toast';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.5, delay, hover: { duration: 0.2 } }}
    className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-start gap-5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all group"
  >
    <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const CategoryCard = ({ title, color, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    transition={{ duration: 0.4, delay }}
    className={`${color} rounded-3xl p-6 h-52 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all border border-white/40`}
  >
    {/* Floating background circle */}
    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/40 rounded-full blur-xl transition-transform group-hover:scale-150 duration-700"></div>
    <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/30 rounded-full blur-lg transition-transform group-hover:scale-125 duration-700 delay-100"></div>
    
    {/* Category Image */}
    <div className="absolute top-0 right-0 w-36 h-36 p-4 flex items-center justify-center z-10">
      <img src={image} alt={title} className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500" />
    </div>

    <div className="relative z-20 bg-white/60 backdrop-blur-md p-3 rounded-2xl group-hover:bg-white/90 transition-colors">
      <h3 className="text-lg font-bold text-gray-800 text-center">{title}</h3>
    </div>
    <Link to="/shop" className="absolute inset-0 z-30"></Link>
  </motion.div>
);

const heroImages = [
  '/images/hero.png',
  '/images/hero_fruits.png',
  '/images/hero_veg.png',
  '/images/hero_bakery.png'
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeOffers, setActiveOffers] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, offersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/offers/active')
        ]);
        
        // Get top 4 products to showcase
        setFeaturedProducts(productsRes.data.products?.slice(0, 4) || productsRes.data.slice(0, 4) || []);
        setActiveOffers(offersRes.data || []);
      } catch (error) {
        console.error('Failed to fetch home data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-50 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
            
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-emerald-700 font-semibold text-sm shadow-sm"
              >
                <Leaf className="w-4 h-4 text-primary animate-pulse" /> 100% Organic & Fresh
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Bring Fresh <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-primary to-teal-400 drop-shadow-sm">
                  Goodness
                </span>
                <br/> To Your Door
              </h1>
              <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience the joy of cooking with farm-fresh organic vegetables, juicy fruits, and daily essentials delivered within minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
                <Link to="/shop" className="group relative w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <ShoppingBag className="w-5 h-5 relative z-10" /> 
                  <span className="relative z-10">Start Shopping</span>
                </Link>
                <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-gray-800 rounded-full font-bold text-lg hover:bg-white border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                  Browse Categories
                </Link>
              </div>
            </motion.div>

            {/* Hero Image Slideshow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] border-[10px] border-white/50 backdrop-blur-sm h-[550px]">
                <AnimatePresence mode='wait'>
                  <motion.img 
                    key={currentHeroIndex}
                    src={heroImages[currentHeroIndex]}
                    alt="Fresh Groceries" 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/40"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Over 50k+</p>
                  <p className="text-sm font-bold text-gray-800">Happy Customers</p>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Truck className="w-6 h-6" />}
              title="Free Delivery"
              description="On all orders above ₹500 in your local area."
              delay={0}
            />
            <FeatureCard 
              icon={<Leaf className="w-6 h-6" />}
              title="Farm Fresh"
              description="Sourced directly from local organic farms."
              delay={0.1}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Quality Guarantee"
              description="Not happy? We offer a 100% refund policy."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6" />}
              title="24/7 Support"
              description="Our friendly support team is always here to help."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Shop By Category</h2>
              <p className="text-lg text-gray-500">Explore our wide range of fresh products.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary-600 transition-colors">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <CategoryCard title="Fresh Fruits" color="bg-orange-100" image="/images/cat_fruits.png" delay={0} />
            <CategoryCard title="Vegetables" color="bg-green-100" image="/images/cat_veg.png" delay={0.1} />
            <CategoryCard title="Dairy & Eggs" color="bg-blue-100" image="/images/cat_dairy.png" delay={0.2} />
            <CategoryCard title="Bakery" color="bg-yellow-100" image="/images/cat_bakery.png" delay={0.3} />
            <CategoryCard title="Meat & Fish" color="bg-red-100" image="/images/cat_meat.png" delay={0.4} />
            <CategoryCard title="Beverages" color="bg-purple-100" image="/images/cat_beverages.png" delay={0.5} />
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      {activeOffers.length > 0 && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {activeOffers.map((offer) => (
              <motion.div 
                key={offer._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] h-[450px] flex items-center group cursor-pointer"
              >
                <img src={offer.banner?.url || '/images/banner.png'} alt={offer.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                
                <div className="relative z-10 p-10 md:p-20 max-w-2xl">
                  {offer.flashSale && (
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 backdrop-blur-md text-red-100 font-bold text-sm mb-6 shadow-lg animate-pulse">
                      ⚡ FLASH SALE
                    </span>
                  )}
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                    {offer.title}
                  </h2>
                  <p className="text-emerald-300 text-2xl md:text-3xl mb-10 font-bold drop-shadow-md">
                    Get {offer.discountPercentage}% Off
                  </p>
                  <Link to="/offers" className="inline-flex items-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-md text-gray-900 rounded-full font-bold text-lg hover:bg-white hover:shadow-[0_10px_25px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all">
                    Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products (Preview) */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Trending Now</h2>
              <p className="text-lg text-gray-500">Handpicked fresh arrivals just for you. Grab them before they're gone!</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-3xl border border-gray-100/50 shadow-sm overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group flex flex-col relative"
                >
                  <Link to={`/product/${product._id}`} className="absolute inset-0 z-0"></Link>
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={(e) => { e.preventDefault(); toast.success('Added to wishlist!'); }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-md transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative h-64 overflow-hidden bg-gray-50/50 p-6 flex items-center justify-center z-0">
                    <img 
                      src={product.images && product.images[0] ? product.images[0].url : 'https://via.placeholder.com/300'} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-sm group-hover:drop-shadow-md"
                    />
                    {product.discountPrice > 0 && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm z-10">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow z-10 relative bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-xs text-primary font-bold uppercase tracking-wider">{product.category?.name || product.brand}</p>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded text-yellow-600">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{product.rating || '4.5'}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    
                    <div className="text-sm text-gray-500 mb-4">{product.unit || '1 each'}</div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-extrabold text-gray-900 leading-none">
                          ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                        </span>
                        {product.discountPrice > 0 && (
                          <span className="text-sm text-gray-400 line-through mt-1">₹{product.price}</span>
                        )}
                      </div>
                      
                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center hover:bg-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95 group/btn overflow-hidden relative"
                      >
                        <ShoppingBag className="w-5 h-5 group-hover/btn:hidden" />
                        <Plus className="w-6 h-6 hidden group-hover/btn:block" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;
