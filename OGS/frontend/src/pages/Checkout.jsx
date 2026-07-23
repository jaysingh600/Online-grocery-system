import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '', city: '', state: '', zipCode: '', country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * (item.discountPrice || item.price), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.images[0]?.url || '',
          price: item.discountPrice || item.price,
          product: item._id
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: 0,
        shippingPrice: deliveryCharge,
        totalPrice: total
      };

      await axios.post('http://localhost:5000/api/orders', orderData, config);
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <input 
                type="text" placeholder="Street Address" required className="input-field"
                value={shippingAddress.street} onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="City" required className="input-field"
                  value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                />
                <input 
                  type="text" placeholder="State" required className="input-field"
                  value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" placeholder="Zip Code" required className="input-field"
                  value={shippingAddress.zipCode} onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                />
                <input 
                  type="text" placeholder="Country" required className="input-field"
                  value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-primary"
                />
                <span className="font-medium">Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                <input type="radio" name="payment" value="Razorpay" disabled className="w-4 h-4" />
                <span className="font-medium">Razorpay / Card (Coming Soon)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} x {item.qty}</span>
                  <span className="font-medium">₹{(item.discountPrice || item.price) * item.qty}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-sm text-gray-600 mb-6 border-t pt-4 border-b pb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium text-gray-800">{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
