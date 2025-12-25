import React, { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useRealTimeFormatted } from '../../lib/realTime';

function FeaturedProduct() {
    const { featuredProducts, getFeaturedProducts } = useProduct();
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const { now, day } = useRealTimeFormatted();

    const pad = (n) => String(n).padStart(2, '0');
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    useEffect(() => {
        getFeaturedProducts();
    }, []);

    useEffect(() => {
        if (featuredProducts.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
            }, 8000); // 8 seconds for a better reading pace
            return () => clearInterval(interval);
        }
    }, [featuredProducts.length]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    // --- SKELETON LOADING (Matching the new style) ---
    if (featuredProducts.length === 0) {
        return (
            <div className="relative w-full h-[450px] overflow-hidden max-w-7xl mx-auto p-2">
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-3xl" />
                <div className="absolute top-10 left-10 w-32 h-20 bg-gray-200 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 w-64">
                        <div className="h-10 bg-gray-200 rounded-full" />
                        <div className="h-4 bg-gray-200 rounded-full w-40 mx-auto" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden max-w-7xl mx-auto p-2 group">

            {/* --- GLASSMOPHISM CLOCK (Arrival Style) --- */}
            <div className="absolute w-fit transition-all top-4 left-4 z-30 text-white bg-black/40 backdrop-blur-md px-5 py-4 rounded border border-white/10 hidden md:block">
                <div className="mb-2 text-[10px] tracking-[0.3em] uppercase text-white/60 font-black flex items-center gap-2">
                    <FiClock className="animate-pulse text-rose-500" /> Featured | {day}
                </div>
                <div className="flex items-start gap-3">
                    <div className="text-center">
                        <div className="text-4xl font-black leading-none tracking-tighter">{hours}</div>
                        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-40 font-bold">Hrs</div>
                    </div>
                    <div className="text-3xl font-light opacity-20">:</div>
                    <div className="text-center">
                        <div className="text-4xl font-black leading-none tracking-tighter">{minutes}</div>
                        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-40 font-bold">Min</div>
                    </div>
                    <div className="text-3xl font-light opacity-20">:</div>
                    <div className="text-center">
                        <div className="text-4xl font-black leading-none tracking-tighter text-rose-500">{seconds}</div>
                        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-40 font-bold text-rose-500">Sec</div>
                    </div>
                </div>
            </div>

            {/* --- CAROUSEL TRACK --- */}
            <div
                className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {featuredProducts.map((product) => (
                    <div key={product._id} className="w-full shrink-0 h-full relative">
                        {/* Improved Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 z-10" />

                        <img
                            src={import.meta.env.VITE_BASE_URL + (product.images[0] || product.images[1])}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />

                        {/* Centered Content */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 text-white p-6">
                            <div className="max-w-2xl text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Staff Pick</span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic leading-none">
                                    {product.name}
                                </h2>

                                <p className="text-sm md:text-lg mb-8 text-white/70 max-w-lg mx-auto font-medium line-clamp-2">
                                    {product.description}
                                </p>

                                <button
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    className="group/btn relative inline-flex items-center gap-4 bg-white text-black font-black text-xs md:text-sm px-10 py-4 rounded-full transition-all hover:bg-rose-600 hover:text-white hover:shadow-[0_0_30px_rgba(225,29,72,0.4)]"
                                >
                                    <FiShoppingBag size={18} />
                                    <span className="tracking-[0.1em] uppercase">Explore Collection</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- NAVIGATION ARROWS --- */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-white hover:text-black text-white p-4 rounded-full z-30 transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hidden md:flex"
            >
                <FiChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-white hover:text-black text-white p-4 rounded-full z-30 transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 hidden md:flex"
            >
                <FiChevronRight size={24} />
            </button>

            {/* --- MODERN INDICATORS --- */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
                {featuredProducts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === index ? 'bg-white w-12' : 'bg-white/20 w-4 hover:bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default FeaturedProduct;