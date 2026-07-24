import React, { useState, useEffect } from 'react';
import { FiEye, FiTruck, FiFileText, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const { user } = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, config);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`, config);
        toast.success('Order deleted');
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete order');
      }
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No orders found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Order ID</th>
                <th className="p-4 font-semibold text-gray-600">Customer</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Total</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 text-gray-800 font-medium text-sm">{order._id.substring(0, 10)}...</td>
                  <td className="p-4 text-gray-600">{order.user?.name || 'Unknown'}</td>
                  <td className="p-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-gray-600 font-medium">₹{order.totalPrice}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    <button 
                      title="View Details" 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiEye />
                    </button>
                    <button onClick={() => handleDelete(order._id)} title="Delete Order" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <p className="text-sm text-gray-500">{selectedOrder._id} • {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 bg-white p-2 rounded-full shadow-sm">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-2">Customer Info</h3>
                  <p className="text-gray-700">{selectedOrder.user?.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}<br/>
                    {selectedOrder.shippingAddress?.state}, {selectedOrder.shippingAddress?.zipCode}
                  </p>
                </div>
                <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100">
                  <h3 className="font-semibold text-yellow-900 mb-2">Update Status</h3>
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 bg-white"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.orderItems?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex gap-4 items-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-gray-200" />
                      ) : (
                        <div className="w-12 h-12 bg-white rounded flex items-center justify-center border border-gray-200">📦</div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty} x ₹{item.price}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-800">
                      ₹{item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping:</span>
                  <span>₹{selectedOrder.shippingPrice}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax:</span>
                  <span>₹{selectedOrder.taxPrice}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 mt-2">
                  <span className="font-bold text-gray-600 text-lg">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-600">₹{selectedOrder.totalPrice}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
