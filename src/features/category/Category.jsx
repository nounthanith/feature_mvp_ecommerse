import React, { useRef, useState } from 'react';
import useCategory from './useCategory';
import { Link } from 'react-router-dom';
import race from "./../../assets/race.png";
import { FaArrowDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

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
      <h2 className="text-2xl font-bold text-center text-black group mt-5 mb-5">
        <span className="relative inline-block">
          Explore Our Categories
          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
        </span>
      </h2>

      <div className="flex justify-center mb-3"><span className="p-2 rounded-full bg-rose-50 animate-bounce"><FaArrowDown className="text-rose-500" /></span></div>

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
          className="flex overflow-x-auto scrollbar-hide px-16 border-b-2 border-t-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {categories.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="relative inline-block shrink-0 px-8 py-6 text-2xl font-bold whitespace-nowrap hover:bg-gray-100/50 text-gray-900 hover:text-black transition-all duration-300 cursor-grab"
            >
              <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                 <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  {category.name}
                 </div>
              </span>
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
      <div className="overflow-hidden text-sm font-medium bg-white text-black border-b-2">
        <Marquee autoFill speed={25} gradient={false} className="cursor-grab">
          <div className="flex items-center space-x-10 mx-4">
            <img src={race} className="w-10 h-10 opacity-90" alt="logo" />
            <span>🚚 Free Shipping Over $50</span>
            <span>•</span>
            <span>🔥 New Collection Released!</span>
            <span>•</span>
            <span>🎁 15% OFF with code NEW15</span>
            <span>•</span>
            <span>💯 100% Satisfaction Guaranteed</span>
            <span>•</span>
            <img src={race} className="w-10 h-10 opacity-90" alt="logo" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Category;