import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import toast from 'react-hot-toast';
import { FiMinus, FiPlus, FiShoppingCart, FiCreditCard, FiStar, FiArrowLeft, FiCheck } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        
        // Fetch related products (same category)
        if (data.category) {
          const catId = data.category._id || data.category;
          const res = await axios.get(`http://localhost:5000/api/products?category=${catId}&pageSize=4`);
          setRelatedProducts(res.data.products.filter(p => p._id !== data._id).slice(0, 4));
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login first to add products to the cart');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login first to purchase');
      navigate('/login');
      return;
    }
    dispatch(addToCart({ ...product, qty }));
    navigate('/checkout');
  };

  const updateQty = (newQty) => {
    if (newQty > 0 && newQty <= product.stock) {
      setQty(newQty);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-gray-200 rounded-3xl w-full max-w-2xl mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Product not found'}</h2>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/shop" className="text-gray-500 hover:text-primary flex items-center gap-2 inline-flex">
            <FiArrowLeft /> Back to Shop
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Gallery */}
            <div className="lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-center">
              <div className="aspect-w-1 aspect-h-1 mb-8 relative">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[activeImage].url : 'https://via.placeholder.com/600'} 
                  alt={product.name} 
                  className="w-full h-96 object-contain rounded-2xl transition-all duration-300"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 justify-center">
                  {product.images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-primary ring-2 ring-primary/20 ring-offset-1' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="mb-2 text-sm text-primary font-medium uppercase tracking-wider">{product.brand}</div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">
                  <FiStar className="fill-current" /> {product.rating}
                </div>
                <span className="text-gray-500 text-sm hover:underline cursor-pointer">{product.numReviews} Reviews</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-gray-500 text-sm">Category: <span className="font-medium text-gray-800">{product.category?.name}</span></span>
              </div>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-extrabold text-gray-900">
                  ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
                </span>
                {product.discountPrice > 0 && (
                  <span className="text-xl text-gray-400 line-through mb-1">₹{product.price}</span>
                )}
                <span className="text-gray-500 text-lg mb-1">/ {product.unit || 'each'}</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <span className={`font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Out of Stock' : `In Stock: ${product.stock} ${product.unit || 'each'}(s) available`}
                  </span>
                </div>
                
                {!isOutOfStock && (
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">Quantity:</span>
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <button 
                        onClick={() => updateQty(qty - 1)} 
                        className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                        disabled={qty <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="w-14 text-center font-bold text-lg text-gray-800">{qty}</span>
                      <button 
                        onClick={() => updateQty(qty + 1)} 
                        className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                        disabled={qty >= product.stock}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-lg transition-all shadow-sm ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-md'}`}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-lg transition-all shadow-md ${isOutOfStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5'}`}
                >
                  <FiCreditCard /> Buy Now
                </button>
              </div>
              
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-600">
                    <div className="bg-green-100 p-1.5 rounded-full text-green-600"><FiCheck size={14} /></div>
                    Guaranteed Fresh
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <div className="bg-green-100 p-1.5 rounded-full text-green-600"><FiCheck size={14} /></div>
                    Secure Payment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(prod => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
