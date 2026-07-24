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
import ProductsManagement from './pages/admin/ProductsManagement';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import UsersManagement from './pages/admin/UsersManagement';
import DeliveryLayout from './layouts/DeliveryLayout';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import ProfileLayout from './layouts/ProfileLayout';
import ProfileDashboard from './pages/profile/ProfileDashboard';
import PersonalInfo from './pages/profile/PersonalInfo';
import Addresses from './pages/profile/Addresses';
import MyOrders from './pages/profile/MyOrders';
import Settings from './pages/profile/Settings';

import Invoice from './pages/Invoice';

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
          <Route path="invoice/:id" element={<Invoice />} />
          
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
          <Route path="products" element={<ProductsManagement />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="users" element={<UsersManagement />} />
        </Route>

        {/* Delivery Routes */}
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
          <Route path="orders" element={<DeliveryDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
