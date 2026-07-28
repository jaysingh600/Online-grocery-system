import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About FreshMart</h1>
        <p className="text-xl text-gray-600 leading-relaxed">We are on a mission to deliver the freshest groceries right to your doorstep, making healthy living accessible and convenient for everyone.</p>
      </div>

      <div className="prose prose-lg prose-emerald max-w-none text-gray-700 space-y-8">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" alt="Fresh Produce" className="w-full h-[400px] object-cover rounded-3xl shadow-lg" />
        
        <h2>Our Story</h2>
        <p>Founded in 2026, FreshMart started with a simple idea: why should people have to compromise on the quality of their fresh produce just because they have busy lives? We partnered with local farmers and suppliers to build a supply chain that prioritizes freshness above all else and deliverd food in your Door step.</p>
        
        <h2>Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 not-prose">
          <div className="bg-emerald-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Quality First</h3>
            <p className="text-emerald-800">We never compromise on the quality of our products. If it's not good enough for our family, it's not good enough for yours.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Sustainability</h3>
            <p className="text-blue-800">We work closely with local farmers to reduce our carbon footprint and promote sustainable agricultural practices.</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-orange-900 mb-3">Customer Centric</h3>
            <p className="text-orange-800">Your satisfaction is our top priority. We offer a 100% freshness guarantee on all our products.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Community</h3>
            <p className="text-purple-800">We believe in giving back to the communities we serve through food bank donations and local partnerships.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
