import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });
  const [imageFile, setImageFile] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/categories');
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load categories');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('icon', newCategory.icon);
    if (imageFile) {
      formData.append('image', imageFile); // 'image' matches upload.single('image')
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        }
      };
      
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/categories/${editingId}`, formData, config);
        toast.success('Category updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/categories', formData, config);
        toast.success('Category added successfully!');
      }
      
      closeModal();
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        await axios.delete(`http://localhost:5000/api/categories/${id}`, config);
        toast.success('Category deleted');
        fetchCategories();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete');
      }
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setNewCategory({ name: '', icon: '' });
    setImageFile(null);
    setShowAddModal(true);
  };

  const openEditModal = (category) => {
    setIsEditMode(true);
    setEditingId(category._id);
    setNewCategory({ name: category.name, icon: category.icon || '' });
    setImageFile(null);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setIsEditMode(false);
    setEditingId(null);
    setNewCategory({ name: '', icon: '' });
    setImageFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
        <button onClick={openAddModal} className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors">
          <FiPlus /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading categories...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Image</th>
                <th className="p-4 font-semibold text-gray-600">Category Name</th>
                <th className="p-4 font-semibold text-gray-600">Icon Class</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    {cat.image && cat.image.url ? (
                      <img src={cat.image.url} alt={cat.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">No Img</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-800 font-medium">{cat.name}</td>
                  <td className="p-4 text-gray-600">{cat.icon || 'N/A'}</td>
                  <td className="p-4 flex gap-2 justify-end items-center h-full">
                    <button onClick={() => openEditModal(cat)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mt-2">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(cat._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Category' : 'Add New Category'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-lg p-2" 
                    value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Class (e.g. FiStar)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2" 
                    value={newCategory.icon} onChange={e => setNewCategory({...newCategory, icon: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Image {isEditMode && '(Leave blank to keep current)'}</label>
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                  {isEditMode ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
