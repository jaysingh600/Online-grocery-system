import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, ShieldCheck, Clock, ArrowRight, Star, Leaf } from 'lucide-react';
import axios from 'axios';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow"
  >
    <div className="p-3 bg-primary/10 text-primary rounded-2xl">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const CategoryCard = ({ title, color, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className={`${color} rounded-3xl p-6 h-48 flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all`}
  >
    {/* Floating background circle */}
    <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/30 rounded-full transition-transform group-hover:scale-150 duration-700"></div>
    
    {/* Category Image */}
    <div className="absolute top-0 right-0 w-32 h-32 p-4 flex items-center justify-center">
      <img src={image} alt={title} className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
    </div>

    <h3 className="text-xl font-bold text-gray-800 relative z-10 group-hover:-translate-y-2 transition-transform">{title}</h3>
    <Link to="/shop" className="absolute inset-0 z-20"></Link>
  </motion.div>
);

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        // Get top 4 products to showcase
        setFeaturedProducts(res.data.products?.slice(0, 4) || res.data.slice(0, 4) || []);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-gray-50 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
            
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm">
                <Leaf className="w-4 h-4" /> 100% Organic & Fresh
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                Bring Fresh <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
                  Goodness
                </span>
                <br/> To Your Door
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the joy of cooking with farm-fresh organic vegetables, juicy fruits, and daily essentials delivered within minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-600 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Start Shopping
                </Link>
                <Link to="/shop" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 rounded-full font-bold text-lg hover:bg-gray-50 border border-gray-200 hover:shadow-md transition-all flex items-center justify-center gap-2">
                  Browse Categories
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="/images/hero.png" alt="Fresh Groceries" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100"
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
      <section className="py-16 bg-white">
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
              <p className="text-gray-500">Explore our wide range of fresh products.</p>
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

      {/* Promotional Banner */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] flex items-center"
          >
            <img src="/images/banner.png" alt="Summer Offer" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            
            <div className="relative z-10 p-10 md:p-16 max-w-2xl">
              <span className="inline-block px-4 py-1 rounded-full bg-red-500 text-white font-bold text-sm mb-4 animate-pulse">
                LIMITED TIME OFFER
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Get 20% Off On Your <br/> First Fresh Order
              </h2>
              <p className="text-gray-200 text-lg mb-8">
                Use code <span className="font-mono bg-white/20 px-2 py-1 rounded text-white font-bold tracking-widest">FRESH20</span> at checkout.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 hover:shadow-lg transition-all">
                Claim Offer <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products (Preview) */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-gray-500">Handpicked fresh arrivals just for you. Grab them before they're gone!</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-50 p-6 flex items-center justify-center">
                    <img 
                      src={product.images && product.images[0] ? product.images[0].url : 'https://via.placeholder.com/300'} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.discountPrice > 0 && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                        SALE
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-primary font-medium mb-1">{product.brand}</p>
                    <h3 className="font-bold text-gray-800 text-lg mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                        </span>
                        {product.discountPrice > 0 && (
                          <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                        )}
                      </div>
                      <Link to={`/product/${product._id}`} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </Link>
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
