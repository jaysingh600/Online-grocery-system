import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Package, Heart, MapPin, Award, Wallet, Ticket, Eye } from 'lucide-react';
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">
        {value}
      </h3>
    </div>
  </div>
);

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [ordersRes, couponsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/orders/myorders', config),
          axios.get('http://localhost:5000/api/coupons')
        ]);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setCoupons(Array.isArray(couponsRes.data) ? couponsRes.data.filter(c => c.isActive) : []);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-emerald-400 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          {user?.profileImage?.url ? (
            <img src={user.profileImage.url} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white/30 object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold border-4 border-white/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-1">Hello, {user?.name || 'User'}! 👋</h1>
            <p className="text-emerald-50">Welcome to your personalized dashboard.</p>
          </div>
        </div>
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 right-32 -mb-16 w-32 h-32 rounded-full bg-white opacity-10"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={<Package />} label="Total Orders" value={orders.length} 
          color="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          icon={<Heart />} label="Wishlist Items" value={user.wishlist?.length || 0} 
          color="bg-red-100 text-red-600" 
        />
        <StatCard 
          icon={<Wallet />} label="Total Spent" value={`₹${orders.reduce((acc, order) => acc + order.totalPrice, 0)}`} 
          color="bg-green-100 text-green-600" 
        />
        <StatCard 
          icon={<Award />} label="Reward Points" value={Math.floor(orders.reduce((acc, order) => acc + order.totalPrice, 0) / 100)} 
          color="bg-yellow-100 text-yellow-600" 
        />
        <StatCard 
          icon={<MapPin />} label="Saved Addresses" value={user.addresses?.length || 0} 
          color="bg-purple-100 text-purple-600" 
        />
        <StatCard 
          icon={<Ticket />} label="Available Coupons" value={coupons.length} 
          color="bg-orange-100 text-orange-600" 
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <Link to="/profile/orders" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p>No recent orders found.</p>
            <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600">Start Shopping</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Items</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {orders.slice(0, 5).map(order => (
                  <tr key={order._id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900">#{order._id.substring(order._id.length - 6)}</td>
                    <td className="p-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-600">{order.orderItems.length} items</td>
                    <td className="p-4 font-medium">₹{order.totalPrice}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link to={`/profile/orders/${order._id}`} className="text-primary hover:text-primary-600 flex items-center gap-1">
                        <Eye className="w-4 h-4" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
