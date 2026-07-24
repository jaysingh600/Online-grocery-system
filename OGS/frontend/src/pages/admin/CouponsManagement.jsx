import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CouponsManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newCoupon, setNewCoupon] = useState({
    code: '', discount: '', expiry: '', isActive: true
  });
  
  const { user } = useSelector((state) => state.auth);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/coupons', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCoupons(res.data);
    } catch (error) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/coupons/${editingId}`, newCoupon, config);
        toast.success('Coupon updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/coupons', newCoupon, config);
        toast.success('Coupon created successfully!');
      }
      closeModal();
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save coupon');
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setNewCoupon({ code: '', discount: '', expiry: '', isActive: true });
    setShowAddModal(true);
  };

  const openEditModal = (coupon) => {
    setIsEditMode(true);
    setEditingId(coupon._id);
    setNewCoupon({
      code: coupon.code,
      discount: coupon.discount,
      expiry: coupon.expiry.split('T')[0],
      isActive: coupon.isActive
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`http://localhost:5000/api/coupons/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success('Coupon deleted');
        fetchCoupons();
      } catch (error) {
        toast.error('Failed to delete coupon');
      }
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Coupons Management</h1>
        <button onClick={openAddModal} className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors">
          <FiPlus /> Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading coupons...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600">Code</th>
                  <th className="p-4 font-semibold text-gray-600">Discount Amount (₹)</th>
                  <th className="p-4 font-semibold text-gray-600">Expiry Date</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 font-bold text-primary-600 uppercase tracking-wide">{coupon.code}</td>
                    <td className="p-4 text-gray-800 font-medium">₹{coupon.discount}</td>
                    <td className="p-4 text-gray-600">{new Date(coupon.expiry).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {coupon.isActive ? 'Active' : 'Expired/Inactive'}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2 justify-end items-center h-full">
                      <button onClick={() => openEditModal(coupon)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(coupon._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {coupons.length === 0 && (
                  <tr><td colSpan="5" className="p-4 text-center text-gray-500">No coupons found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Coupon' : 'Create Coupon'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAddCoupon} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg p-2 uppercase" placeholder="e.g. SUMMER50" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount (₹)</label>
                  <input type="number" required min="1" className="w-full border border-gray-300 rounded-lg p-2" value={newCoupon.discount} onChange={e => setNewCoupon({...newCoupon, discount: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="date" required className="w-full border border-gray-300 rounded-lg p-2" value={newCoupon.expiry} onChange={e => setNewCoupon({...newCoupon, expiry: e.target.value})} />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={newCoupon.isActive} onChange={e => setNewCoupon({...newCoupon, isActive: e.target.checked})} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">{isEditMode ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsManagement;
