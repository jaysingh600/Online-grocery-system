import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/authSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
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
    dispatch(login(formData));
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
              Welcome back to <br/> <span className="text-primary drop-shadow-lg">FreshMart</span>
            </h1>
            <p className="text-xl font-medium text-gray-200 drop-shadow">
              Your daily dose of freshness, just one click away.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-16 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary hover:text-green-600 transition-colors">
                Register now
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-5">
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-sm font-medium text-primary hover:text-green-600">Forgot password?</a>
                </div>
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
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            >
              Sign In <FiArrowRight className="text-lg" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
