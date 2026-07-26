import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FiArrowLeft, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrder(data);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    if (user && id) {
      fetchOrderDetails();
    }
  }, [id, user]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-8 text-center text-red-500">Order not found.</div>;
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return 0;
      default: return 1;
    }
  };

  const currentStep = getStatusStep(order.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link to="/profile/orders" className="text-gray-500 hover:text-primary transition-colors">
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-500">Order #{order._id}</p>
        </div>
      </div>

      {order.status !== 'Cancelled' ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
              <div style={{ width: `${(currentStep / 4) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"></div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-600">
              <div className={`text-center flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : ''}`}>
                <FiPackage size={20} className="mb-1" />
                <span>Processing</span>
              </div>
              <div className={`text-center flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : ''}`}>
                <FiTruck size={20} className="mb-1" />
                <span>Shipped</span>
              </div>
              <div className={`text-center flex flex-col items-center ${currentStep >= 3 ? 'text-primary' : ''}`}>
                <FiTruck size={20} className="mb-1" />
                <span>Out for Delivery</span>
              </div>
              <div className={`text-center flex flex-col items-center ${currentStep >= 4 ? 'text-primary' : ''}`}>
                <FiCheckCircle size={20} className="mb-1" />
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center mb-6">
          <h2 className="text-xl font-bold text-red-600">Order Cancelled</h2>
          <p className="text-red-500">This order has been cancelled.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Items in this order</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                  </div>
                  <div className="font-bold text-gray-800 text-lg">
                    ₹{item.qty * item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Delivery Address</h2>
            <div className="text-gray-600 text-sm leading-relaxed">
              <p className="font-bold text-gray-800">{user.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-medium text-gray-800">₹{order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-gray-800">{order.shippingPrice === 0 ? 'Free' : `₹${order.shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between items-center">
                <span className="font-bold text-gray-800 text-base">Total Amount</span>
                <span className="font-bold text-primary text-xl">₹{order.totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between items-center text-xs">
                <span>Payment Method</span>
                <span className="font-bold uppercase bg-gray-100 px-2 py-1 rounded text-gray-800">{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
