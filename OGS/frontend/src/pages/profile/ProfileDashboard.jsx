import React from 'react';
import { useSelector } from 'react-redux';
import { Package, Heart, MapPin, Award, Wallet, Ticket } from 'lucide-react';
import CountUp from 'react-countup';

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">
        {typeof value === 'number' ? <CountUp end={value} duration={2} /> : value}
      </h3>
    </div>
  </div>
);

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-emerald-400 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Hello, {user.name}! 👋</h1>
          <p className="text-emerald-50">Welcome to your personalized dashboard.</p>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 right-32 -mb-16 w-32 h-32 rounded-full bg-white opacity-10"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={<Package />} label="Total Orders" value={12} 
          color="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          icon={<Heart />} label="Wishlist Items" value={user.wishlist?.length || 0} 
          color="bg-red-100 text-red-600" 
        />
        <StatCard 
          icon={<Wallet />} label="Wallet Balance" value={`₹${user.walletBalance || 0}`} 
          color="bg-green-100 text-green-600" 
        />
        <StatCard 
          icon={<Award />} label="Reward Points" value={user.rewardPoints || 0} 
          color="bg-yellow-100 text-yellow-600" 
        />
        <StatCard 
          icon={<MapPin />} label="Saved Addresses" value={user.addresses?.length || 0} 
          color="bg-purple-100 text-purple-600" 
        />
        <StatCard 
          icon={<Ticket />} label="Available Coupons" value={3} 
          color="bg-orange-100 text-orange-600" 
        />
      </div>

      {/* Recent Activity placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h2>
        <div className="text-center py-12 text-gray-500">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p>No recent orders found.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
