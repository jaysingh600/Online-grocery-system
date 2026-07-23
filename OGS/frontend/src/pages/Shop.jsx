import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><label className="flex items-center gap-2"><input type="checkbox" /> Vegetables</label></li>
                <li><label className="flex items-center gap-2"><input type="checkbox" /> Fruits</label></li>
                <li><label className="flex items-center gap-2"><input type="checkbox" /> Dairy</label></li>
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Price</h3>
              <input type="range" className="w-full accent-primary" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary">
              <option>Default Sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-4 rounded-2xl h-80 flex flex-col justify-between">
                  <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
                  <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  <div className="bg-gray-200 h-8 w-full rounded mt-4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
