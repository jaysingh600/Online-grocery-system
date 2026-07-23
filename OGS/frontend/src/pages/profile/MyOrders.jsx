import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Package, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[600px]">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No orders yet</h3>
          <p className="mb-6">When you place orders, they will appear here.</p>
          <Link to="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">ORDER PLACED</p>
                    <p className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">TOTAL</p>
                    <p className="font-medium text-gray-800">₹{order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">ORDER #</p>
                    <p className="font-medium text-gray-800">{order._id}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <Link to={`/profile/orders/${order._id}`} className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    View Details <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 py-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg hover:text-primary transition-colors cursor-pointer">{item.name}</h4>
                      <p className="text-gray-500 text-sm mt-1">Qty: {item.qty} • ₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
