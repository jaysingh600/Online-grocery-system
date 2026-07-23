import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Fresh<span className="text-secondary">Mart</span>
            </Link>
          </div>
          
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input 
                type="text" 
                className="input-field pl-4 pr-10" 
                placeholder="Search for products, categories..." 
              />
              <button className="absolute right-2 top-2 text-gray-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-600 hover:text-primary relative">
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 hover:text-primary flex items-center gap-1">
                  <FiUser className="h-5 w-5" />
                  <span className="hidden md:inline">{user.name}</span>
                </Link>
                <button onClick={onLogout} className="text-gray-600 hover:text-red-500 flex items-center gap-1">
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary font-medium">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
