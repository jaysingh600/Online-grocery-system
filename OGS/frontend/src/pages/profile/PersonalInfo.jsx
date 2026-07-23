import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Camera, Save, X, Loader2 } from 'lucide-react';

const PersonalInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    alternativePhone: user.alternativePhone || '',
    gender: user.gender || '',
    dob: user.dob ? user.dob.split('T')[0] : '',
    language: user.language || 'English',
    bio: user.bio || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // 1. Upload Image if changed
      if (imageFile) {
        const formDataImg = new FormData();
        formDataImg.append('image', imageFile);
        
        // Normally we'd dispatch an action here or update local state, 
        // but for simplicity we directly hit API
        await axios.post('http://localhost:5000/api/users/profile/photo', formDataImg, {
          headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
        });
      }

      // 2. Update Details
      const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, config);
      
      // Update local storage (simulated dispatch since we're not fully mapping the slice right here)
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully! Refresh to see changes globally.');
      setIsEditing(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-secondary text-sm px-4 py-2"
          >
            Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Profile Photo Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-50">
          <div className="relative">
            <img 
              src={imagePreview || user.profileImage?.url || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-sm"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-emerald-600 shadow-lg">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            {isEditing && <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 5MB.</p>}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" name="name"
              disabled={!isEditing}
              value={formData.name} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary' : 'bg-gray-50 border-gray-100 cursor-not-allowed text-gray-600'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" disabled
              value={user.email} 
              className="w-full px-4 py-2 rounded-lg border bg-gray-50 border-gray-100 cursor-not-allowed text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="text" name="phone"
              disabled={!isEditing}
              value={formData.phone} onChange={handleChange}
              placeholder="+91 "
              className={`w-full px-4 py-2 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary' : 'bg-gray-50 border-gray-100 cursor-not-allowed text-gray-600'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone</label>
            <input 
              type="text" name="alternativePhone"
              disabled={!isEditing}
              value={formData.alternativePhone} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary' : 'bg-gray-50 border-gray-100 cursor-not-allowed text-gray-600'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              name="gender"
              disabled={!isEditing}
              value={formData.gender} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary' : 'bg-gray-50 border-gray-100 cursor-not-allowed text-gray-600'}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="date" name="dob"
              disabled={!isEditing}
              value={formData.dob} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary' : 'bg-gray-50 border-gray-100 cursor-not-allowed text-gray-600'}`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / About Me</label>
            <textarea 
              name="bio" rows="3"
              disabled={!isEditing}
              value={formData.bio} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary' : 'bg-gray-50 border-gray-100 cursor-not-allowed text-gray-600'}`}
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => { setIsEditing(false); setImagePreview(null); setImageFile(null); }}
              className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
