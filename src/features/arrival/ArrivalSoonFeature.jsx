import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiClock } from 'react-icons/fi';
import useArrival from './useArrival';
import { useRealTimeFormatted } from '../../lib/realTime'; // Assuming this path exists from your snippet

function ArrivalSoonFeature() {
    const { arrivalSoon, loading, getArrivalFeature } = useArrival();
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const { now, day } = useRealTimeFormatted();

    const products = arrivalSoon?.data || [];

    const pad = (n) => String(n).padStart(2, '0');
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    useEffect(() => {
        getArrivalFeature();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % products.length);
            }, 8000); // 8 seconds auto-slide
            return () => clearInterval(interval);
        }
    }, [products.length]);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % products.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + products.length) % products.length);

    // --- SKELETON LOADING (Your Old Style) ---
    if (loading || products.length === 0) {
        return (
            <div className="relative w-full h-[450px] overflow-hidden max-w-7xl mx-auto p-2">
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />
                <div className="absolute top-6 left-6 z-10 space-y-2">
                    <div className="h-4 w-24 bg-gray-300 rounded" />
                    <div className="h-12 w-48 bg-gray-300 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[450px] overflow-hidden max-w-7xl mx-auto group">
            
            {/* --- TOP LEFT CLOCK (Your Old Style) ---
            <div className="absolute top-6 left-6 z-30 text-white bg-black/40 backdrop-blur-md px-5 py-4 rounded-xl border border-white/10">
                <div className="mb-2 text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold flex items-center gap-2">
                   <FiClock className="animate-pulse" /> Live Pipeline | {day}
                </div>
                <div className="flex items-start gap-4">
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black leading-none">{hours}</div>
                        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-60">Hrs</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-light opacity-30">:</div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black leading-none">{minutes}</div>
                        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-60">Min</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-light opacity-30">:</div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black leading-none text-rose-500">{seconds}</div>
                        <div className="mt-1 text-[8px] tracking-widest uppercase opacity-60">Sec</div>
                    </div>
                </div>
            </div> */}

            {/* --- CAROUSEL TRACK --- */}
            <div
                className="flex transition-transform duration-1000 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {products.map((item) => {
                    const arrivalDate = new Date(item.expectedArrivalDate).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric'
                    });

                    return (
                        <div key={item._id} className="w-full shrink-0 h-full relative">
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
                            
                            {/* Product Image */}
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}${item.images[0]}`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Center Content */}
                            <div className="absolute inset-0 flex items-center justify-center z-20 text-white p-4">
                                <div className="max-w-2xl text-center transform translate-y-8">
                                    <span className="bg-rose-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">
                                        Arriving {arrivalDate}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black mb-3 uppercase tracking-tighter italic">
                                        {item.name}
                                    </h2>
                                    <p className="text-sm md:text-base mb-8 text-white/70 max-w-md mx-auto line-clamp-2 font-medium">
                                        {item.description}
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- NAVIGATION --- */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white hover:text-black text-white p-3 rounded-full z-30 transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
            >
                <FiChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white hover:text-black text-white p-3 rounded-full z-30 transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100"
            >
                <FiChevronRight size={20} />
            </button>

            {/* --- INDICATORS --- */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
                {products.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-500 rounded-full h-1.5 ${currentSlide === index ? 'bg-rose-600 w-10' : 'bg-white/30 w-4'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ArrivalSoonFeature;