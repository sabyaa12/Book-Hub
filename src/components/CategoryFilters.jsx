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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🎯 Browse by Category
        </h2>
        <p className="text-gray-600">
          Find specialized resources for your field of study
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.search)}
            className="group relative overflow-hidden rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="text-white font-semibold text-sm">{category.name}</h3>
            </div>
          </button>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors">
          View All Categories →
        </button>
      </div>
    </div>
  );
};

export default CategoryFilters;