import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../features/cartSlice';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * (item.discountPrice || item.price), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50; // Free delivery over 500
  const total = subtotal + (cartItems.length > 0 ? deliveryCharge : 0);

  const updateQty = (item, qty) => {
    if (qty > 0 && qty <= item.stock) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-64 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn-primary">Return to Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <img src={item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150'} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="font-semibold text-gray-800 hover:text-primary transition-colors text-lg">
                    {item.name}
                  </Link>
                  <p className="text-gray-500 text-sm mb-2">{item.category?.name || 'Category'}</p>
                  <div className="font-bold text-dark">₹{item.discountPrice || item.price}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => updateQty(item, item.qty - 1)} className="p-2 hover:bg-gray-100 text-gray-600 rounded-l-lg"><FiMinus /></button>
                    <span className="w-10 text-center font-medium">{item.qty}</span>
                    <button onClick={() => updateQty(item, item.qty + 1)} className="p-2 hover:bg-gray-100 text-gray-600 rounded-r-lg"><FiPlus /></button>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full transition-colors">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-medium text-gray-800">{deliveryCharge === 0 ? <span className="text-green-500">Free</span> : `₹${deliveryCharge}`}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-3 text-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
