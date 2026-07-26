import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const OffersManagement = () => {
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newOffer, setNewOffer] = useState({
    title: '', discountPercentage: '', isActive: true, expiryDate: '', flashSale: false, applicableCategory: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/offers');
      setOffers(res.data);
    } catch (error) {
      toast.error('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchOffers();
    fetchCategories();
  }, []);

  const handleAddOffer = async (e) => {
    e.preventDefault();
    if (!isEditMode && !imageFile) {
      toast.error('Please select a banner image');
      return;
    }
    
    const formData = new FormData();
    formData.append('title', newOffer.title);
    formData.append('discountPercentage', newOffer.discountPercentage);
    formData.append('isActive', newOffer.isActive);
    formData.append('expiryDate', newOffer.expiryDate);
    formData.append('flashSale', newOffer.flashSale);
    formData.append('applicableCategory', newOffer.applicableCategory);
    if (imageFile) {
      formData.append('banner', imageFile);
    }

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` } };
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/offers/${editingId}`, formData, config);
        toast.success('Offer updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/offers', formData, config);
        toast.success('Offer added successfully!');
      }
      closeModal();
      fetchOffers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save offer');
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setNewOffer({ title: '', discountPercentage: '', isActive: true, expiryDate: '', flashSale: false, applicableCategory: '' });
    setImageFile(null);
    setShowAddModal(true);
  };

  const openEditModal = (offer) => {
    setIsEditMode(true);
    setEditingId(offer._id);
    setNewOffer({
      title: offer.title,
      discountPercentage: offer.discountPercentage,
      isActive: offer.isActive,
      expiryDate: offer.expiryDate.split('T')[0],
      flashSale: offer.flashSale,
      applicableCategory: offer.applicableCategory?._id || ''
    });
    setImageFile(null);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/offers/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success('Offer deleted');
        fetchOffers();
      } catch (error) {
        toast.error('Failed to delete offer');
      }
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Offers & Banners</h1>
        <button onClick={openAddModal} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
          <FiPlus /> Add Offer
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading offers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-semibold text-gray-600">Banner</th>
                  <th className="p-4 font-semibold text-gray-600">Title</th>
                  <th className="p-4 font-semibold text-gray-600">Category</th>
                  <th className="p-4 font-semibold text-gray-600">Discount</th>
                  <th className="p-4 font-semibold text-gray-600">Expiry</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4">
                      {offer.banner ? (
                        <img src={offer.banner.url} alt={offer.title} className="w-24 h-12 object-cover rounded border border-gray-200" />
                      ) : (
                        <div className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center text-xs">No Img</div>
                      )}
                    </td>
                    <td className="p-4 text-gray-800 font-medium">
                      {offer.title}
                      {offer.flashSale && <span className="ml-2 px-2 py-0.5 rounded text-xs bg-red-100 text-red-800 font-bold">FLASH</span>}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {offer.applicableCategory ? offer.applicableCategory.name : 'All Categories'}
                    </td>
                    <td className="p-4 text-gray-600">{offer.discountPercentage}% OFF</td>
                    <td className="p-4 text-gray-600">{new Date(offer.expiryDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${offer.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {offer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2 justify-end items-center h-full pt-6">
                      <button onClick={() => openEditModal(offer)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(offer._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Offer' : 'Add New Offer'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAddOffer} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                    <input type="number" required min="0" max="100" className="w-full border border-gray-300 rounded-lg p-2" value={newOffer.discountPercentage} onChange={e => setNewOffer({...newOffer, discountPercentage: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Category</label>
                    <select className="w-full border border-gray-300 rounded-lg p-2 bg-white" value={newOffer.applicableCategory} onChange={e => setNewOffer({...newOffer, applicableCategory: e.target.value})}>
                      <option value="">All Categories</option>
                      {categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input type="date" required className="w-full border border-gray-300 rounded-lg p-2" value={newOffer.expiryDate} onChange={e => setNewOffer({...newOffer, expiryDate: e.target.value})} />
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={newOffer.isActive} onChange={e => setNewOffer({...newOffer, isActive: e.target.checked})} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                    <span>Active Status</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={newOffer.flashSale} onChange={e => setNewOffer({...newOffer, flashSale: e.target.checked})} className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                    <span>Flash Sale</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image {isEditMode && '(Leave blank to keep)'}</label>
                  <input type="file" required={!isEditMode} accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600">{isEditMode ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersManagement;
