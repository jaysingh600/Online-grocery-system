import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, MapPin, X } from 'lucide-react';

const Addresses = () => {
  const { user } = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState(user.addresses || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    houseNo: '',
    street: '',
    area: '',
    city: '',
    state: '',
    country: 'India',
    pinCode: '',
    addressType: 'Home',
    isDefault: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/users/addresses', formData, config);
      
      setAddresses(data);
      
      // Update local storage
      const updatedUser = { ...user, addresses: data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Address added successfully!');
      setIsModalOpen(false);
      setFormData({
        receiverName: '', phone: '', houseNo: '', street: '', area: '', city: '', state: '', country: 'India', pinCode: '', addressType: 'Home', isDefault: false
      });
    } catch (error) {
      toast.error('Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.delete(`http://localhost:5000/api/users/addresses/${id}`, config);
        
        setAddresses(data);
        const updatedUser = { ...user, addresses: data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Address deleted!');
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 py-2"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p>You haven't saved any addresses yet.</p>
          </div>
        ) : (
          addresses.map(addr => (
            <div key={addr._id} className="border border-gray-200 rounded-xl p-5 hover:border-primary transition-colors relative group">
              {addr.isDefault && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-xl font-medium">
                  Default
                </span>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium uppercase">{addr.addressType}</span>
                <h3 className="font-bold text-gray-800">{addr.receiverName}</h3>
              </div>
              <p className="text-gray-600 text-sm mt-2">{addr.houseNo}, {addr.street}</p>
              <p className="text-gray-600 text-sm">{addr.area}, {addr.city}</p>
              <p className="text-gray-600 text-sm">{addr.state} - {addr.pinCode}</p>
              <p className="text-gray-800 text-sm mt-3 font-medium">Phone: {addr.phone}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4">
                <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button 
                  onClick={() => handleDeleteAddress(addr._id)}
                  className="text-red-500 text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 bg-gray-50 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Address</h2>
            
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Receiver Name</label>
                  <input type="text" name="receiverName" required value={formData.receiverName} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                  <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">House / Flat No.</label>
                  <input type="text" name="houseNo" required value={formData.houseNo} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Street Name</label>
                  <input type="text" name="street" required value={formData.street} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Area / Locality</label>
                  <input type="text" name="area" required value={formData.area} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">City</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">State</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">PIN Code</label>
                  <input type="text" name="pinCode" required value={formData.pinCode} onChange={handleChange} className="input-field" />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-sm text-gray-700 mb-2">Address Type</label>
                <div className="flex gap-4">
                  {['Home', 'Office', 'Other'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="addressType" value={type} checked={formData.addressType === type} onChange={handleChange} className="text-primary focus:ring-primary" />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="rounded text-primary focus:ring-primary w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">Make this my default address</span>
                </label>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Address'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
