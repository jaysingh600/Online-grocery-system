import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiPrinter, FiArrowLeft } from 'react-icons/fi';

const Invoice = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate fetching order by id
    setTimeout(() => {
      setOrder({
        _id: id || 'ORD-1001',
        createdAt: '2023-10-27T10:00:00Z',
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 234 567 8900'
        },
        shippingAddress: {
          street: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          zipCode: '62701',
          country: 'USA'
        },
        orderItems: [
          { product: '1', name: 'Fresh Apple', qty: 2, price: 120 },
          { product: '2', name: 'Whole Wheat Bread', qty: 1, price: 40 },
          { product: '3', name: 'Milk 1L', qty: 3, price: 60 },
        ],
        itemsPrice: 460,
        taxPrice: 23,
        shippingPrice: 50,
        totalPrice: 533,
        paymentMethod: 'Credit Card',
        isPaid: true,
        paidAt: '2023-10-27T10:05:00Z',
      });
    }, 500);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return <div className="min-h-screen flex items-center justify-center">Loading Invoice...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons - hidden on print */}
        <div className="mb-6 flex justify-between items-center print:hidden px-4 md:px-0">
          <Link to={-1} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <FiArrowLeft className="mr-2" /> Back
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <FiPrinter className="mr-2" /> Print Invoice
          </button>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white shadow-lg print:shadow-none p-8 md:p-12 rounded-xl print:rounded-none">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">Fresh<span className="text-secondary">Mart</span></h1>
              <p className="text-gray-500 mt-1">Online Grocery Delivery System</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>123 Store Address,</p>
                <p>City, State, 12345</p>
                <p>support@freshmart.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider mb-2">Invoice</h2>
              <p className="text-sm text-gray-600"><span className="font-semibold">Invoice #:</span> {order._id}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className={`mt-2 inline-block px-3 py-1 rounded text-xs font-semibold ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {order.isPaid ? 'PAID' : 'UNPAID'}
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid grid-cols-2 gap-8 mb-8 border-b border-gray-200 pb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Billed To</h3>
              <p className="text-gray-800 font-medium">{order.customer.name}</p>
              <p className="text-gray-600 text-sm mt-1">{order.customer.email}</p>
              <p className="text-gray-600 text-sm">{order.customer.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">Shipped To</h3>
              <p className="text-gray-600 text-sm">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left mb-8">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 text-sm font-bold text-gray-800 uppercase">Item Description</th>
                <th className="py-3 text-sm font-bold text-gray-800 uppercase text-center">Qty</th>
                <th className="py-3 text-sm font-bold text-gray-800 uppercase text-right">Price</th>
                <th className="py-3 text-sm font-bold text-gray-800 uppercase text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 text-gray-800">{item.name}</td>
                  <td className="py-4 text-gray-600 text-center">{item.qty}</td>
                  <td className="py-4 text-gray-600 text-right">₹{item.price.toFixed(2)}</td>
                  <td className="py-4 text-gray-800 font-medium text-right">₹{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-1/2">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-gray-800">₹{order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm border-b border-gray-200">
                <span className="text-gray-600 font-medium">Tax</span>
                <span className="text-gray-800">₹{order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm border-b border-gray-200">
                <span className="text-gray-600 font-medium">Shipping</span>
                <span className="text-gray-800">₹{order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p className="font-semibold text-gray-800 mb-1">Thank you for your business!</p>
            <p>If you have any questions concerning this invoice, contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
