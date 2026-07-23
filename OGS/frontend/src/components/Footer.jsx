import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Fresh<span className="text-secondary">Mart</span>
            </h2>
            <p className="text-sm">Fresh Grocery Delivered Fast. Quality you can trust.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/shop" className="hover:text-primary">Shop</a></li>
              <li><a href="/categories" className="hover:text-primary">Categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
              <li><a href="/policy" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe for offers and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="px-3 py-2 w-full rounded-l-lg text-dark focus:outline-none" />
              <button className="bg-primary text-white px-4 rounded-r-lg hover:bg-emerald-600">Sub</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} FreshMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
