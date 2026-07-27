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
    <nav className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 shadow-xl border-b border-emerald-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight">
              Fresh<span className="text-emerald-300">Mart</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 ml-8">
            <Link to="/" className="text-emerald-50 hover:text-white font-semibold transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/offers" className="text-emerald-50 hover:text-white font-semibold transition-colors relative group">
              Offers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-emerald-50 hover:text-white font-semibold transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-white/10 text-white border border-white/20 rounded-2xl pl-5 pr-12 py-2.5 focus:outline-none focus:bg-white/20 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 placeholder-emerald-100/70 transition-all duration-300 backdrop-blur-sm" 
                placeholder="Search for fresh groceries..." 
              />
              <button type="submit" className="absolute right-4 top-3 text-emerald-200 group-hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-white hover:text-emerald-200 relative transition-colors group">
              <div className="p-2.5 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                <FiShoppingCart className="h-6 w-6 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm ring-2 ring-emerald-900">
                {cartItemCount}
              </span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center gap-2 transition-colors group">
                  <div className="p-2.5 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <FiUser className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden md:inline font-semibold text-emerald-50 group-hover:text-white transition-colors">{user.name}</span>
                </Link>
                <button onClick={onLogout} className="text-emerald-200 hover:text-amber-400 flex items-center gap-1 transition-colors p-2.5 rounded-full hover:bg-white/10" title="Logout">
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link to="/login" className="text-emerald-50 hover:text-white font-semibold transition-colors">Login</Link>
                <Link to="/register" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold rounded-xl px-6 py-2.5 transition-all duration-300 shadow-lg hover:shadow-[0_8px_20px_rgb(255,255,255,0.2)] hover:-translate-y-0.5">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
