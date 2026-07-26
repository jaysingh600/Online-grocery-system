import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/authSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { name, email, password, confirmPassword } = formData;
  const [isFocused, setIsFocused] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'delivery') {
        navigate('/delivery');
      } else {
        navigate('/');
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image/Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{ backgroundImage: "url('/auth-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="relative z-20 text-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-white drop-shadow-md">
              Join <span className="text-primary drop-shadow-lg">FreshMart</span>
            </h1>
            <p className="text-xl font-medium text-gray-200 drop-shadow">
              Create an account and start shopping for the freshest produce today.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-green-600 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-5">
              {/* Name Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <div className={`relative flex items-center border-2 rounded-xl transition-colors duration-300 ${isFocused === 'name' ? 'border-primary bg-white' : 'border-gray-200 bg-gray-50'} overflow-hidden`}>
                  <div className="pl-4 text-gray-400">
                    <FiUser className={`text-xl transition-colors duration-300 ${isFocused === 'name' ? 'text-primary' : ''}`} />
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={onChange}
                    onFocus={() => setIsFocused('name')}
                    onBlur={() => setIsFocused('')}
                    required 
                    className="w-full py-3 px-4 outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <div className={`relative flex items-center border-2 rounded-xl transition-colors duration-300 ${isFocused === 'email' ? 'border-primary bg-white' : 'border-gray-200 bg-gray-50'} overflow-hidden`}>
                  <div className="pl-4 text-gray-400">
                    <FiMail className={`text-xl transition-colors duration-300 ${isFocused === 'email' ? 'text-primary' : ''}`} />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={onChange}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused('')}
                    required 
                    className="w-full py-3 px-4 outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <div className={`relative flex items-center border-2 rounded-xl transition-colors duration-300 ${isFocused === 'password' ? 'border-primary bg-white' : 'border-gray-200 bg-gray-50'} overflow-hidden`}>
                  <div className="pl-4 text-gray-400">
                    <FiLock className={`text-xl transition-colors duration-300 ${isFocused === 'password' ? 'text-primary' : ''}`} />
                  </div>
                  <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused('')}
                    required 
                    className="w-full py-3 px-4 outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <div className={`relative flex items-center border-2 rounded-xl transition-colors duration-300 ${isFocused === 'confirmPassword' ? 'border-primary bg-white' : 'border-gray-200 bg-gray-50'} overflow-hidden`}>
                  <div className="pl-4 text-gray-400">
                    <FiLock className={`text-xl transition-colors duration-300 ${isFocused === 'confirmPassword' ? 'text-primary' : ''}`} />
                  </div>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={onChange}
                    onFocus={() => setIsFocused('confirmPassword')}
                    onBlur={() => setIsFocused('')}
                    required 
                    className="w-full py-3 px-4 outline-none bg-transparent text-gray-800 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            >
              Sign Up <FiArrowRight className="text-lg" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
