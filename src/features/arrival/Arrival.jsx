import React, { useEffect, useState } from 'react'
import useArrival from './useArrival'
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import useProduct from '../products/useProduct';
import useCart from '../cart/useCart';
import { useWishlist } from '../wishlist/WishlistContext';
import { IoWarningOutline } from "react-icons/io5";

function Arrival() {
    const { arrival, loading, error, getArrival } = useArrival();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const { getProductById } = useProduct();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, checkWishlistStatus } = useWishlist();

    const toggleWishlist = (productId) => {
        if (checkWishlistStatus(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    useEffect(() => {
        getArrival();
    }, []);
    // console.log(arrival)

    if (loading) return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading products...</p>
            </div>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-md">
                <div className="flex">
                    <div className="shrink-0">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            Failed to load products. {error.message || 'Please try again later.'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => getArrival()}
                    className="mt-4 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors text-sm font-medium"
                >
                    Retry
                </button>
            </div>
        </div>
    );
    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className="text-4xl font-bold text-center text-black group mt-5 mb-5">
                <span className="relative inline-block">
                    Arrival Soon
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                </span>
            </h2>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="max-w-7xl mx-auto flex pb-5 snap-x snap-mandatory">
                    {arrival?.data?.map((product) => (
                        <div
                            key={product._id}
                            className="flex-shrink-0 snap-start w-[210px] sm:w-[260px] bg-white transition-all duration-300 overflow-hidden cursor-pointer"
                            onMouseEnter={() => setHoveredProductId(product._id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div className="relative w-full h-60">
                                <div
                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                                    className="absolute top-2 right-2 z-10 p-2 bg-black/70 rounded-full hover:bg-black/80 transition-colors cursor-pointer backdrop-blur-sm"
                                >
                                    <IoWarningOutline className="text-white text-xl" />
                                </div>
                                <div onClick={() => getProductById(product._id)} className="w-full h-full">
                                    <img
                                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer"
                                        src={import.meta.env.VITE_BASE_URL + product.images[0]}
                                        alt={product.name}
                                        style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                                    />
                                    {product.images[1] && (
                                        <img
                                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer"
                                            src={import.meta.env.VITE_BASE_URL + product.images[1]}
                                            alt={product.name}
                                            style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                        />
                                    )}
                                </div>
                                {product.stock > 0 ? (
                                    <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-sm px-2 py-1 text-white text-[11px] font-semibold">
                                        Available
                                    </div>
                                ) : (
                                    <div className="absolute top-2 left-2 z-10 bg-red-500 backdrop-blur-sm px-2 py-1 text-white text-[11px] font-semibold animate-pulse">
                                        Not Available
                                    </div>
                                )}
                            </div>
                            <div className="px-2 pb-3 pt-2 space-y-1">
                                <p className="text-gray-700 font-semibold text-[12px] flex justify-between items-center">
                                    <span className="text-gray-500">Arrival</span>
                                    <span className="text-gray-600">{new Date(product?.expectedArrivalDate).toLocaleDateString()}</span>
                                </p>
                                <h2 className="text-lg font-bold truncate" title={product.name}>{product.name}</h2>

                                <p className="text-rose-600 text-xl font-bold">{product.price} $</p>

                                <button

                                    className={`mt-2 w-full flex items-center justify-center gap-2 rounded-none font-semibold py-2 px-4 transition-all duration-300 bg-gray-100 border-2 border-black text-black cursor-not-allowed line-through'`}>
                                    Comming Soon
                                    <CiShoppingCart className="text-xl" />
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