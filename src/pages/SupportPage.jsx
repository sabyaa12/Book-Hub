import React, { useState } from 'react';

const SupportPage = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I search for books?',
      answer: 'Use the search bar on the homepage to enter keywords, author names, or book titles. You can also browse by categories using the Academic Fields dropdown.'
    },
    {
      question: 'Can I download books for offline reading?',
      answer: 'Yes, many books offer download options. Look for the download button on the book details page. Downloaded files will appear in your Downloads section.'
    },
    {
      question: 'How do I add books to my collection?',
      answer: 'Click the "Add to Collection" button on any book card or details page. Your saved books will appear in the My Collection section of your sidebar.'
    },
    {
      question: 'Is BookHub Academic free to use?',
      answer: 'Yes, basic features are free. We also offer a Pro subscription with additional features like unlimited downloads and advanced search filters.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach us through the contact form below, email us at support@bookhub.academic, or use the live chat feature during business hours.'
    }
  ];

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen bg-gray-50">
      {/* Header Section - Responsive */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          <span className="mr-2">🛟</span>
          Help & Support
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Get help and find answers to common questions</p>
      </div>

      {/* Quick Help Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center">
          <div className="bg-blue-500 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-white text-lg sm:text-xl" role="img" aria-label="Books">📚</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Getting Started</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Learn how to use BookHub Academic</p>
          <button 
            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors"
            type="button"
          >
            View Guide →
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center">
          <div className="bg-green-500 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-white text-lg sm:text-xl" role="img" aria-label="Chat">💬</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Live Chat</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Chat with our support team</p>
          <button 
            className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-medium transition-colors"
            type="button"
          >
            Start Chat →
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
          <div className="bg-purple-500 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-white text-lg sm:text-xl" role="img" aria-label="Email">📧</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Email Support</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Send us an email</p>
          <button 
            className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium transition-colors"
            type="button"
          >
            Email Us →
          </button>
        </div>
      </div>

      {/* FAQ Section - Responsive */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                type="button"
              >
                <span className="font-medium text-gray-800 text-sm sm:text-base pr-2">{faq.question}</span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transform transition-transform flex-shrink-0 ${
                    selectedFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedFaq === index && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form - Responsive */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={contactForm.subject}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Message</label>
            <textarea
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-vertical"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;