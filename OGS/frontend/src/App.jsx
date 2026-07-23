import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProfileLayout from './layouts/ProfileLayout';
import ProfileDashboard from './pages/profile/ProfileDashboard';
import PersonalInfo from './pages/profile/PersonalInfo';
import Addresses from './pages/profile/Addresses';
import MyOrders from './pages/profile/MyOrders';
import Settings from './pages/profile/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* User Profile Routes */}
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfileDashboard />} />
            <Route path="info" element={<PersonalInfo />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="settings" element={<Settings />} />
            {/* Other profile routes will go here */}
          </Route>
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
