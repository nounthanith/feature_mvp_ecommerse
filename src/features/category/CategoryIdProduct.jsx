import React from 'react'
import useCategory from './useCategory';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import useProduct from '../products/useProduct';
import Category from './Category';
import { useWishlist } from '../wishlist/WishlistContext';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import useCart from '../cart/useCart';
import Marquee from 'react-fast-marquee';

function CategoryIdProduct() {
    const { products, loading, error, getCategoryProducts } = useCategory();
    const { addToWishlist, removeFromWishlist, checkWishlistStatus } = useWishlist();
    const { id } = useParams();
    const { getProductById } = useProduct();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const { addToCart } = useCart();

    const toggleWishlist = (productId) => {
        if (checkWishlistStatus(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    useEffect(() => {
        getCategoryProducts(id);
    }, [id, getCategoryProducts]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading products...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
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
                    onClick={() => getCategoryProducts(id)}
                    className="mt-4 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors text-sm font-medium"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    if (!products?.data?.length) return (
        <>
            <Category />
            <div className="flex flex-col items-center justify-center py-20 text-center">

                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500 max-w-md">
                    We couldn't find any products in this category. Check back later or explore other categories.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                    Go Back
                </button>
            </div>
        </>
    );

    return (
        <div className="">
            

            {/* Sticky Hero Banner */}
            <div
                className="relative max-w-7xl mx-auto h-[400px] sm:h-[400px] lg:h-[400px] flex flex-col justify-center items-center rounded-none overflow"
                style={{
                    backgroundImage: `url(${import.meta.env.VITE_BASE_URL + products?.data?.[0]?.category?.image})`,
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center px-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 group">
                        <span className="relative inline-block">
                            {products?.data?.[0]?.category?.name}
                            <span className="absolute left-0 bottom-0 w-0 h-[4px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                        </span>
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
                        {products?.data?.[0]?.category?.description}
                    </p>
                </div>
            </div>
            <div className="overflow-hidden border-y text-sm font-medium bg-black border-white text-white max-w-7xl mx-auto">
                <Marquee autoFill speed={55} gradient={false} className="cursor-grab py-3">
                    <div className="flex items-center space-x-10 mx-4">
                        {/* <img src={race} className="w-10 h-10 opacity-90" alt="logo" /> */}
                        <span>🚚 Free Shipping Over $50</span>
                        <span>•</span>
                        <span>🔥 New Collection Released!</span>
                        <span>•</span>
                        <span>🎁 15% OFF with code NEW15</span>
                        <span>•</span>
                        <span>💯 100% Satisfaction Guaranteed</span>
                        <span>•</span>
                        {/* <img src={race} className="w-10 h-10 opacity-90" alt="logo" /> */}
                    </div>
                </Marquee>
            </div>
            <Category />

            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
                {products.data.map((product, index) => (
                    <div
                        key={product._id}
                        className='overflow-hidden  cursor-pointer'
                        onMouseEnter={() => setHoveredProductId(product._id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    >
                        <div className='relative w-full h-64'>
                            <div
                                onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                                className='absolute top-2 right-2 z-10 p-2 bg-black/70 rounded-full hover:bg-black/80 transition-colors cursor-pointer'
                            >
                                {checkWishlistStatus(product._id) ? (
                                    <FaHeart className='text-red-300 text-xl' />
                                ) : (
                                    <CiHeart className='text-white text-xl hover:text-red-300' />
                                )}
                            </div>
                            <div onClick={() => getProductById(product._id)} className='w-full h-full'>
                                <img
                                    className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer'
                                    src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[0]}
                                    alt={product.name}
                                    style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                                />
                                {product.images[1] && (
                                    <img
                                        className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer'
                                        src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[1]}
                                        alt={product.name}
                                        style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                    />
                                )}
                            </div>
                            {product.stock > 0 ? (
                                <div className="absolute top-2 left-2 z-10 bg-black backdrop-blur-sm px-2 py-1  text-white text-xs font-semibold">
                                    In stock
                                </div>
                            ) : (
                                <div className="absolute top-2 left-2 z-10 bg-red-500 backdrop-blur-sm px-2 py-1  text-white text-xs font-semibold animate-pulse">
                                    Out of stock
                                </div>
                            )}
                        </div>
                        <div className=''>
                            <p className="text-gray-700 font-semibold text-[12px] flex justify-end mt-2 mr-2">{new Date(product?.createdAt).toLocaleDateString()}</p>
                            <div className='px-2'>
                                <h2 className='text-lg font-bold truncate' title={product.name}>{product.name}</h2>
                                <div className="flex items-center justify-between">
                                    <p className='text-rose-600 text-xl font-bold'>{product.price} $</p>
                                </div>
                            </div>
                            <button
                                disabled={Number(product.stock || 0) <= 0}
                                onClick={() => { if ((product.stock || 0) <= 0) { return; } addToCart(product._id, 1); }}
                                className={`mt-2 w-full flex items-center justify-center gap-2 rounded-none font-semibold py-2 px-4 transition-all duration-300 ${Number(product.stock || 0) <= 0 ? 'bg-gray-100 text-black border-2 border-black cursor-not-allowed line-through' : 'bg-black hover:bg-black/80 text-white cursor-pointer border-2 border-black'}`}>
                                Add to cart
                                <CiShoppingCart className="text-xl" />
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryIdProduct;