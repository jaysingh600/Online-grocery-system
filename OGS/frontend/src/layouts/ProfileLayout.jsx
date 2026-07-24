import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { 
  User, Package, MapPin, Heart, CreditCard, 
  Bell, Shield, Settings, HelpCircle, LogOut, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/profile', icon: <User className="w-5 h-5" />, end: true },
    { name: 'Personal Info', path: '/profile/info', icon: <User className="w-5 h-5" /> },
    { name: 'My Orders', path: '/profile/orders', icon: <Package className="w-5 h-5" /> },
    { name: 'Addresses', path: '/profile/addresses', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Wishlist', path: '/profile/wishlist', icon: <Heart className="w-5 h-5" /> },
    { name: 'Payment Methods', path: '/profile/payments', icon: <CreditCard className="w-5 h-5" /> },
    { name: 'Notifications', path: '/profile/notifications', icon: <Bell className="w-5 h-5" /> },
    { name: 'Security', path: '/profile/security', icon: <Shield className="w-5 h-5" /> },
    { name: 'Settings', path: '/profile/settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Help & Support', path: '/profile/support', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Profile Header in Sidebar */}
      <div className="p-6 border-b border-gray-100 flex flex-col items-center">
        <div className="relative mb-4">
          <img 
            src={user.profileImage?.url || 'https://via.placeholder.com/150'} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{user.email}</p>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
          {user.membershipLevel || 'Standard'} Member
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16"> {/* Assuming MainLayout Navbar is fixed/sticky */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600 hover:text-primary bg-gray-50 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-72 flex-shrink-0 h-[calc(100vh-8rem)] sticky top-24 rounded-2xl overflow-hidden shadow-sm">
            <SidebarContent />
          </aside>

          {/* Mobile Sidebar (Drawer) */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                />
                <motion.aside 
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  className="fixed inset-y-0 left-0 w-80 bg-white z-50 md:hidden flex flex-col shadow-2xl"
                >
                  <div className="flex justify-end p-4 border-b border-gray-100">
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <SidebarContent />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
          
        </div>
      </div>
    </div>
  );
};

import ErrorBoundary from '../components/ErrorBoundary';

const ProfileLayoutWrapped = () => (
  <ErrorBoundary>
    <ProfileLayout />
  </ErrorBoundary>
);

export default ProfileLayoutWrapped;
