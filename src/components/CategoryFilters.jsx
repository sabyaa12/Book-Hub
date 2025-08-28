import React from 'react';

const CategoryFilters = ({ onCategorySelect }) => {
  const categories = [
    { name: 'Computer Science', icon: '💻', color: 'from-blue-500 to-blue-600', search: 'computer science programming' },
    { name: 'Mathematics', icon: '🔢', color: 'from-green-500 to-green-600', search: 'mathematics calculus algebra' },
    { name: 'Physics', icon: '⚛️', color: 'from-purple-500 to-purple-600', search: 'physics quantum mechanics' },
    { name: 'Chemistry', icon: '🧪', color: 'from-orange-500 to-orange-600', search: 'chemistry organic inorganic' },
    { name: 'Biology', icon: '🧬', color: 'from-emerald-500 to-emerald-600', search: 'biology molecular genetics' },
    { name: 'Psychology', icon: '🧠', color: 'from-pink-500 to-pink-600', search: 'psychology cognitive behavioral' },
    { name: 'Literature', icon: '📖', color: 'from-indigo-500 to-indigo-600', search: 'literature english classics' },
    { name: 'History', icon: '🏛️', color: 'from-yellow-500 to-yellow-600', search: 'history world ancient modern' }
  ];

  const handleCategoryClick = (category) => {
    if (onCategorySelect && typeof onCategorySelect === 'function') {
      onCategorySelect(category.search);
    } else {
      console.warn('⚠️ onCategorySelect is not a valid function');
    }
  };

  const handleViewAllClick = () => {
    // Handle view all categories functionality
    console.log('View all categories clicked');
    // You can add navigation or modal logic here
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mx-4 sm:mx-0">
      {/* Header Section - Responsive text sizing */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
          🎯 Browse by Category
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-2 sm:px-0">
          Find specialized resources for your field of study
        </p>
        <div className="w-16 sm:w-24 h-1 bg-indigo-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>
      
      {/* Responsive Grid - Optimized for all screen sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className="group relative overflow-hidden rounded-xl p-4 sm:p-5 lg:p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            type="button"
            aria-label={`Browse ${category.name} books`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon - Responsive sizing */}
              <div 
                className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 transform transition-transform duration-300 group-hover:scale-110"
                role="img"
                aria-label={`${category.name} icon`}
              >
                {category.icon}
              </div>
              
              {/* Category Name - Responsive text */}
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base leading-tight">
                {category.name}
              </h3>
            </div>
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
      
      {/* View All Button - Responsive */}
      <div className="text-center mt-6 sm:mt-8">
        <button 
          onClick={handleViewAllClick}
          className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          type="button"
          aria-label="View all book categories"
        >
          View All Categories →
        </button>
      </div>
    </div>
  );
};

export default CategoryFilters;