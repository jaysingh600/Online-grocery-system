import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
        <p>By accessing or using FreshMart's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on FreshMart's website for personal, non-commercial transitory viewing only.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>This is the grant of a license, not a transfer of title.</li>
          <li>You may not modify or copy the materials.</li>
          <li>You may not use the materials for any commercial purpose.</li>
          <li>This license shall automatically terminate if you violate any of these restrictions.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Product Descriptions</h2>
        <p>FreshMart attempts to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by FreshMart itself is not as described, your sole remedy is to return it in unused condition.</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Pricing and Availability</h2>
        <p>All prices are inclusive of applicable taxes unless stated otherwise. We reserve the right to modify prices without prior notice. Products are subject to availability. If a product is out of stock after your order is placed, we will notify you and process a refund for that item.</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Delivery</h2>
        <p>Delivery times are estimates and not guarantees. FreshMart is not liable for any delays in delivery due to unforeseen circumstances such as weather conditions, traffic, or other events beyond our control.</p>
      </div>
    </div>
  );
};

export default Terms;
