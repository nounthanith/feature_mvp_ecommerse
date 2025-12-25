import React, { useRef } from 'react';
import useCategory from './useCategory';
import { Link } from 'react-router-dom';
import race from "./../../assets/race.png";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';

function Category() {
  const { categories, loading, error } = useCategory();
  const scrollContainer = useRef(null);

  if (loading) return <div className="p-10 text-center text-[10px] font-bold uppercase tracking-widest">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500 text-[10px] font-bold uppercase">Error_Loading</div>;

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      {/* Small Header with Minimal Nav */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
          Shop / <span className="text-black italic">Categories</span>
        </h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-1 hover:text-rose-600 transition-colors">
            <FaChevronLeft size={10} />
          </button>
          <button onClick={() => scroll('right')} className="p-1 hover:text-rose-600 transition-colors">
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>

      {/* Main Category Grid - Medium Index Style */}
      <div className="relative overflow-hidden bg-white border-y-2 border-black">
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto scrollbar-hide snap-x"
        >
          {categories.map((category, index) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="relative inline-block shrink-0 w-56 md:w-64 border-r border-gray-200 hover:bg-black/10 group transition-all duration-300 snap-start py-10 px-8"
            >
              {/* Category Number (Slightly Smaller) */}
              <span className="absolute top-4 left-8 text-[9px] font-black text-gray-300 group-hover:text-gray-700 transition-colors tracking-widest">
                {String(index + 1).padStart(2, '0')} — INDEX
              </span>

              <div className="space-y-3 mt-2">
                {/* Medium Sized Heading */}
                <h3 className="text-xl font-black uppercase tracking-tighter text-black group-hover:text-black transition-colors leading-none italic">
                  {category.name}
                </h3>

                {/* Accent Line */}
                <div className="h-[2px] w-6 bg-black group-hover:bg-rose-500 group-hover:w-12 transition-all duration-500"></div>

                <p className="text-[9px] font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-[0.2em]">
                  Browse_Archive
                </p>
              </div>

              {/* Decorative Corner Square (Small) */}
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-gray-200 group-hover:bg-rose-500 transition-colors"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Very Slim Info Bar */}
      <div className="mt-6 border-y border-gray-100 py-2">
        <Marquee autoFill speed={40} gradient={false}>
          <div className="flex items-center space-x-8 mx-4">
            <img src={race} className="w-4 h-4 grayscale opacity-40" alt="icon" />
            <span className="text-[9px] font-bold text-black uppercase tracking-widest">New Arrivals Daily</span>
            <span className="text-gray-200">|</span>
            <span className="text-[9px] font-bold text-black uppercase tracking-widest">Secure Checkout</span>
            <span className="text-gray-200">|</span>
            <span className="text-[9px] font-bold text-black uppercase tracking-widest">Fast Logistics</span>
            <span className="text-gray-200">|</span>
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Category;