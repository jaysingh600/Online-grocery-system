import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState('');

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              Fresh<span className="text-primary">Mart</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">Home</Link>
            <Link to="/offers" className="text-gray-300 hover:text-white font-medium transition-colors">Offers</Link>
            <Link to="/about" className="text-gray-300 hover:text-white font-medium transition-colors">About</Link>
          </div>
          
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 transition-colors" 
                placeholder="Search for products, categories..." 
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-300 hover:text-white relative transition-colors">
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                {cartItemCount}
              </span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                  <FiUser className="h-5 w-5" />
                  <span className="hidden md:inline font-medium">{user.name}</span>
                </Link>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-400 flex items-center gap-1 transition-colors" title="Logout">
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-primary hover:bg-green-600 text-white font-medium rounded-lg px-4 py-1.5 transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
