import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiClock, FiMapPin } from 'react-icons/fi';

const DeliveryDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setDeliveries([
        {
          _id: 'DEL-101',
          orderId: 'ORD-1001',
          customerName: 'John Doe',
          address: '123 Main St, Springfield',
          status: 'Pending',
        },
        {
          _id: 'DEL-102',
          orderId: 'ORD-1002',
          customerName: 'Jane Smith',
          address: '456 Oak Ave, Springfield',
          status: 'In Transit',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setDeliveries(deliveries.map(d => d._id === id ? { ...d, status: newStatus } : d));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Deliveries</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-6 text-center text-gray-500">Loading deliveries...</div>
        ) : deliveries.length === 0 ? (
          <div className="col-span-full p-6 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
            No deliveries assigned currently.
          </div>
        ) : (
          deliveries.map((delivery) => (
            <div key={delivery._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Order #{delivery.orderId}</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">{delivery.customerName}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  delivery.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  delivery.status === 'In Transit' ? 'bg-purple-100 text-purple-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {delivery.status}
                </span>
              </div>
              
              <div className="flex items-start gap-3 text-gray-600 mb-6 flex-1">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <p className="text-sm">{delivery.address}</p>
              </div>

              {delivery.status !== 'Delivered' && (
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  {delivery.status === 'Pending' && (
                    <button 
                      onClick={() => handleUpdateStatus(delivery._id, 'In Transit')}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2"
                    >
                      <FiClock /> Start Transit
                    </button>
                  )}
                  {delivery.status === 'In Transit' && (
                    <button 
                      onClick={() => handleUpdateStatus(delivery._id, 'Delivered')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2"
                    >
                      <FiCheckCircle /> Mark Delivered
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
