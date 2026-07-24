import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h2>
        <p>Welcome to FreshMart. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Financial Data:</strong> includes payment card details (processed securely by our payment providers).</li>
          <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., fulfilling your order).</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:privacy@freshmart.com" className="text-primary hover:underline">privacy@freshmart.com</a>.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
