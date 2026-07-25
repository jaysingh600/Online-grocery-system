import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/api/products?pageNumber=${page}&pageSize=12&sort=${sortOrder}`;
        if (categoryFilter.length > 0) url += `&category=${categoryFilter.join(',')}`;
        if (minPrice) url += `&minPrice=${minPrice}`;
        if (maxPrice) url += `&maxPrice=${maxPrice}`;
        
        const { data } = await axios.get(url);
        setProducts(data.products || []);
        setPages(data.pages || 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryFilter, sortOrder, minPrice, maxPrice, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Filters</h2>
              <button 
                onClick={() => { setCategoryFilter([]); setMinPrice(''); setMaxPrice(''); setSortOrder('newest'); setPage(1); }}
                className="text-sm text-primary-500 hover:underline"
              >
                Clear All
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600 max-h-48 overflow-y-auto pr-2">
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={categoryFilter.length === 0} 
                      onChange={() => setCategoryFilter([])} 
                      className="text-primary-600 focus:ring-primary-500 rounded" 
                    /> 
                    All Categories
                  </label>
                </li>
                {categories.map(cat => (
                  <li key={cat._id}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={categoryFilter.includes(cat._id)} 
                        onChange={() => {
                          if (categoryFilter.includes(cat._id)) {
                            setCategoryFilter(categoryFilter.filter(id => id !== cat._id));
                          } else {
                            setCategoryFilter([...categoryFilter, cat._id]);
                          }
                        }} 
                        className="text-primary-600 focus:ring-primary-500 rounded" 
                      /> 
                      {cat.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Price Range (₹)</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-primary-500"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <select 
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="toprated">Top Rated</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-4 rounded-2xl h-[350px] flex flex-col justify-between border border-gray-100">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4 w-full"></div>
                  <div className="bg-gray-200 h-4 w-1/3 rounded mb-2"></div>
                  <div className="bg-gray-200 h-5 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-5 w-1/4 rounded mt-2"></div>
                  <div className="bg-gray-200 h-10 w-full rounded-xl mt-4"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
              <button onClick={() => { setCategoryFilter([]); setMinPrice(''); setMaxPrice(''); setSortOrder('newest'); setPage(1); }} className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-10 flex justify-center items-center space-x-2">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                  >
                    Prev
                  </button>
                  {[...Array(pages).keys()].map(x => (
                    <button
                      key={x + 1}
                      onClick={() => setPage(x + 1)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        page === x + 1 ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {x + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
