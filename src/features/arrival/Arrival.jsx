import React, { useEffect, useState } from 'react'
import useArrival from './useArrival'
import { CiShoppingCart } from 'react-icons/ci';
import useProduct from '../products/useProduct';
import useCart from '../cart/useCart';
import ArrivalSoonFeature from './ArrivalSoonFeature';

function Arrival() {
    const { arrival, loading, error, getArrival } = useArrival();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const { getProductById } = useProduct();

    // State to ensure loading animation shows for exactly 1.2s
    const [isInitialSync, setIsInitialSync] = useState(true);

    useEffect(() => {
        getArrival();
        // Force the loading state for 1.2 seconds for a smoother UI feel
        const timer = setTimeout(() => {
            setIsInitialSync(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // --- 1.2s MODERN LOADING STATE ---
    if (isInitialSync || loading) return (
        <div className='max-w-7xl mx-auto px-2 py-10'>
            <div className="flex flex-col items-center mb-8">
                <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
                <div className="mt-2 h-1 w-20 bg-rose-500/20 animate-pulse" />
            </div>
            <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-shrink-0 w-[210px] sm:w-[260px] animate-pulse">
                        <div className="w-full h-60 bg-gray-100 mb-3" />
                        <div className="space-y-2 px-2">
                            <div className="h-3 bg-gray-100 w-full" />
                            <div className="h-4 bg-gray-100 w-3/4" />
                            <div className="h-5 bg-gray-100 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // --- ERROR STATE ---
    if (error) return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-red-500 text-sm mb-4">Failed to load arrivals: {error.message}</p>
            <button onClick={() => getArrival()} className="px-6 py-2 bg-black text-white text-xs uppercase font-bold tracking-widest">Retry</button>
        </div>
    );

    return (
        <div className='max-w-7xl mx-auto animate-in fade-in duration-700'>


            <ArrivalSoonFeature />

            
            <h2 className="text-4xl font-bold text-center text-black group mt-5 mb-5">
                <span className="relative inline-block uppercase tracking-tighter font-black italic">
                    Arrival Soon
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                </span>
            </h2>

            <div className="overflow-x-auto scrollbar-hide pb-5">
                <div className="flex snap-x snap-mandatory gap-1 px-2">
                    {arrival?.data?.map((product) => (
                        <div
                            key={product._id}
                            className="flex-shrink-0 snap-start w-[210px] sm:w-[260px] bg-white transition-all duration-300 overflow-hidden cursor-pointer"
                            onMouseEnter={() => setHoveredProductId(product._id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                            onClick={() => getProductById(product._id)}
                        >
                            <div className="relative w-full h-60 overflow-hidden">
                                {/* Image Overlay Logic */}
                                <div className="w-full h-full relative">
                                    <img
                                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out"
                                        src={import.meta.env.VITE_BASE_URL + product.images[0]}
                                        alt={product.name}
                                        style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                                    />
                                    {product.images[1] && (
                                        <img
                                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out"
                                            src={import.meta.env.VITE_BASE_URL + product.images[1]}
                                            alt={product.name}
                                            style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                        />
                                    )}
                                </div>

                                {/* Status Badges */}
                                {product.stock > 0 ? (
                                    <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-sm px-2 py-1 text-white text-[10px] font-bold uppercase tracking-widest">
                                        Available
                                    </div>
                                ) : (
                                    <div className="absolute top-2 left-2 z-10 bg-rose-600 px-2 py-1 text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">
                                        Coming Soon
                                    </div>
                                )}
                            </div>

                            <div className="px-2 pb-3 pt-2 space-y-1">
                                <p className="text-gray-400 font-bold text-[10px] flex justify-between items-center uppercase tracking-wider">
                                    <span>Expected</span>
                                    <span>{new Date(product?.expectedArrivalDate).toLocaleDateString()}</span>
                                </p>

                                <h2 className="text-md font-black truncate uppercase tracking-tighter" title={product.name}>
                                    {product.name}
                                </h2>

                                <p className="text-rose-600 text-xl font-black">${product.price}</p>

                                <button
                                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-none font-black py-2 px-4 transition-all duration-300 bg-gray-100 border border-black text-black cursor-not-allowed opacity-70 text-[10px] uppercase tracking-[0.2em]">
                                    Coming Soon
                                    <CiShoppingCart className="text-lg" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Arrival