import React, { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function FeaturedProduct() {
    const { featuredProducts, getFeaturedProducts } = useProduct();
    const [currentSlide, setCurrentSlide] = useState(0);

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
        return <div className="h-96 bg-gray-100 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading featured products...</div>
        </div>;
    }

    return (
        <div className="relative w-full h-[500px] overflow-hidden max-w-7xl mx-auto p-2">
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
                                <button className="bg-white text-black px-8 py-2 rounded-none font-medium hover:bg-gray-100 transition-colors">
                                    Shop Now
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