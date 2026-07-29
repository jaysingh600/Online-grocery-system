import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "We offer same-day delivery for orders placed before 2 PM and based on your location. Orders placed after 2 PM will be delivered the next morning."
  },
  {
    question: "Is there a minimum order value?",
    answer: "Yes, the minimum order value for free delivery is ₹500. Orders below ₹500 will incur a flat ₹50 delivery charge."
  },
  {
    question: "What is your return policy?",
    answer: "We have a 'no questions asked' return policy at the time of delivery. If you're not satisfied with the quality of any product, you can return it to the delivery executive and get an instant refund."
  },
  {
    question: "How do I apply a coupon code?",
    answer: "You can apply your coupon code on the cart page before proceeding to checkout. Only one coupon can be applied per order."
  },
  {
    question: "Do you deliver to my area?",
    answer: "Currently, we deliver across major metropolitan areas. You can enter your pin code on the homepage to check if we deliver to your specific location ."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg">Find answer to common questions about our services.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-200">
            <button 
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span className="font-bold text-gray-800 text-lg">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center p-8 bg-primary-50 rounded-3xl border border-primary-100">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Still have questions ?</h3>
        <p className="text-gray-600 mb-6">We are here to help you 24/7.</p>
        <a href="/contact" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-600 transition-colors">
          Contact Supports
        </a>
      </div>
    </div>
  );
};

export default FAQ;
