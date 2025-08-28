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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🛟 Help & Support</h1>
        <p className="text-gray-600">Get help and find answers to common questions</p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">📚</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Getting Started</h3>
          <p className="text-gray-600 text-sm mb-4">Learn how to use BookHub Academic</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Guide →
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">💬</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-4">Chat with our support team</p>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Start Chat →
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl">📧</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
          <p className="text-gray-600 text-sm mb-4">Send us an email</p>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Email Us →
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    selectedFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={contactForm.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;