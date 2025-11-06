import React, { useRef, useState } from 'react';
import useCategory from './useCategory';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Category() {
  const { categories, loading, error } = useCategory();
  const scrollContainer = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollSpeed = 1; // Adjust scroll speed as needed

  if (loading) return <div className="p-4 text-center">Loading categories...</div>;
  if (error) return <div className="p-4 text-red-600 text-center">Error loading categories</div>;

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Explore Our Categories</h2>

      <div className="relative group">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto scrollbar-hide px-16 py-4 gap-4 bg-pink-50"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {categories.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="flex-shrink-0 px-6 py-3 text-2xl font-bold whitespace-nowrap transition-all duration-200 hover:cursor-grabbing"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Category;