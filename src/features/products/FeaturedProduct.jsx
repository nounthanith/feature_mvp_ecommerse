import React, { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
        // Auto slide 5 seconds
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % (featuredProducts.length || 1));
        }, 15000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featuredProducts.length]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    if (featuredProducts.length === 0) {
        return (
            <div className="relative w-full h-[500px] overflow-hidden max-w-7xl mx-auto p-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-gray-500 animate-pulse" />

                <div className="absolute top-6 left-4 z-10 bg-black/10 backdrop-blur-sm px-4 py-3 rounded">
                    <div className="mb-2 h-3 w-28 bg-white/50 rounded" />
                    <div className="flex items-start gap-6">
                        <div className="space-y-2">
                            <div className="h-10 w-12 bg-white/60 rounded" />
                            <div className="h-2 w-10 bg-white/40 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-10 w-12 bg-white/60 rounded" />
                            <div className="h-2 w-10 bg-white/40 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-10 w-12 bg-white/60 rounded" />
                            <div className="h-2 w-10 bg-white/40 rounded" />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
                    <div className="w-full max-w-2xl space-y-4">
                        <div className="h-8 md:h-10 bg-white/60 rounded" />
                        <div className="h-16 md:h-20 bg-white/50 rounded" />
                        <div className="h-10 w-40 bg-white/70 rounded" />
                    </div>
                </div>

                <button
                    disabled
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-gray-400 p-2 rounded-full z-30 cursor-not-allowed"
                    aria-label="Previous slide"
                >
                    <FiChevronLeft size={24} />
                </button>
                <button
                    disabled
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-gray-400 p-2 rounded-full z-30 cursor-not-allowed"
                    aria-label="Next slide"
                >
                    <FiChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                    {[0, 1, 2].map((i) => (
                        <span key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className="relative w-full h-[500px] overflow-hidden max-w-7xl mx-auto p-2">
            <div className="absolute top-6 left-4 z-10 text-white bg-black/20 backdrop-blur-sm px-4 py-3 rounded">
                <div className="mb-2 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80">Today {day}</div>
                <div className="flex items-start gap-6">
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-extrabold leading-none">{hours}</div>
                        <div className="mt-1 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80">Hours</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-extrabold leading-none">{minutes}</div>
                        <div className="mt-1 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80">Minutes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-extrabold leading-none">{seconds}</div>
                        <div className="mt-1 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80">Seconds</div>
                    </div>
                </div>
            </div>

            {/* Carousel container */}
            <div
                className="flex transition-transform duration-1000 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {featuredProducts.map((product, index) => (
                    <div
                        key={product._id}
                        className="w-full shrink-0 h-full relative"
                    >
                        <div className="absolute inset-0 bg-black/30 z-10"></div>
                        <img
                            src={import.meta.env.VITE_BASE_URL + (product.images[0] || product.images[1])}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20 text-white p-2">
                            <div className="max-w-2xl text-center">
                                <h2 className="text-4xl md:text-3xl font-bold mb-4">{product.name}</h2>
                                <p className="text-lg mb-6">{product.description}</p>
                                <button onClick={() => navigate(`/product/${product._id}`)} className="text-white font-bold text-xl border px-8 py-2 rounded-none hover:bg-black/40 bg-black/50 transition-colors">
                                    <span className="animate-pulse">Shop Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-30 transition-all"
                aria-label="Previous slide"
            >
                <FiChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-30 transition-all"
                aria-label="Next slide"
            >
                <FiChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                {featuredProducts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default FeaturedProduct;