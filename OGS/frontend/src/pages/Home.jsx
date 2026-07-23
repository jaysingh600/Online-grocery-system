import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-dark leading-tight">
                Fresh Groceries <br/> <span className="text-primary">Delivered to You</span>
              </h1>
              <p className="text-lg text-gray-600">
                Get fresh fruits, vegetables, and daily essentials delivered to your doorstep in minutes. Quality guaranteed.
              </p>
              <div className="flex gap-4">
                <Link to="/shop" className="btn-primary">Shop Now</Link>
                <Link to="/categories" className="btn-secondary">Explore Categories</Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="w-full h-80 bg-gradient-to-tr from-primary to-emerald-300 rounded-3xl shadow-xl flex items-center justify-center text-white text-2xl font-bold">
                [Hero Image Placeholder]
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
