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

function CategoryIdProduct() {
    const { products, loading, error, getCategoryProducts } = useCategory();
    const { addToWishlist, removeFromWishlist, checkWishlistStatus } = useWishlist();
    const { id } = useParams();
    const { getProductById } = useProduct();
    const [hoveredProductId, setHoveredProductId] = useState(null);

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
            <Category />

            <h2 className="text-2xl font-bold text-center text-black group mt-5">
                <span className="relative inline-block">
                    {products.data[0].category.name}
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                </span>
            </h2>
            <p className="text-center text-gray-600 px-2 max-w-7xl mx-auto mb-5">{products.data[0].category.description}</p>

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
                                    <FaHeart className='text-rose-500 text-xl' />
                                ) : (
                                    <CiHeart className='text-white text-xl hover:text-rose-500' />
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
                                onClick={() => addToCart(product._id, 1)}
                                className="mt-2 bg-black hover:bg-black/80 text-white font-semibold py-2 px-4 w-full flex items-center justify-center gap-2 rounded-none cursor-pointer transition-all duration-300">
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