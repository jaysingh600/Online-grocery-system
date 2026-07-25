import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login first to add products to the cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative aspect-w-1 aspect-h-1">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/300'} 
            alt={product.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discountPercentage}%
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
          <FiHeart />
        </button>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category?.name || 'Category'}</p>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 my-2">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm text-gray-600">{product.rating} ({product.numReviews})</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold text-dark">₹{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">₹{product.price}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-full transition-colors"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
