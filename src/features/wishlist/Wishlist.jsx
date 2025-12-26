import React, {useEffect, useState} from 'react'
import {useWishlist} from './WishlistContext';
import useProduct from '../products/useProduct';
import {CiShoppingCart} from 'react-icons/ci';
import useCart from '../cart/useCart';
import {GoTrash} from "react-icons/go";
import {Link} from 'react-router-dom';

function Wishlist() {
    const {
        wishlist,
        loading,
        error,
        getWishlist,
        clearWishlist,

        removeFromWishlist
    } = useWishlist();
    const {addToCart} = useCart();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const {getProductById} = useProduct();


    useEffect(() => {
        getWishlist();
    }, []);

    // --- NEW REFINED LOADING ---
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div
                    className="absolute inset-0 border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-black animate-pulse">
                Fetching Wishlist
            </p>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
            <div className="bg-red-50 border border-black p-6 w-full max-w-md rounded-none">
                <p className="text-sm font-bold text-red-700 uppercase tracking-tight">Sync Failed</p>
                <p className="text-xs text-red-600 mt-2">{error.message || 'Please try again later.'}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors"
                >
                    Retry Connection
                </button>
            </div>
        </div>
    );

    if (!wishlist.products?.length) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
            <div className="w-20 h-20 border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
                <GoTrash className="h-8 w-8 text-gray-200"/>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Archive_is_Empty</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-xs leading-loose">
                You haven't saved any items to your wishlist yet.
            </p>
            <Link
                to='/'
                className="mt-8 px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-rose-600 transition-all active:scale-95"
            >
                Start Shopping
            </Link>
        </div>
    );

    return (
        <div className="pb-20 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className='flex items-end justify-between max-w-7xl mx-auto p-4 border-b border-black mb-6'>
                <div className='flex items-baseline'>
                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">
                        Wishlist
                    </h2>
                    <span
                        className='ml-4 text-[10px] font-black bg-black text-white px-2 py-0.5 uppercase tracking-widest'>
                        {wishlist.products?.length} {wishlist.products?.length === 1 ? 'Entry' : 'Entries'}
                    </span>
                </div>
                <button
                    onClick={() => clearWishlist()}
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-rose-600 transition-colors underline underline-offset-4"
                >
                    Empty All
                </button>
            </div>

            {/* Grid - Consistent with Product Page */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
                {wishlist.products?.map((product) => (
                    <div
                        key={product._id}
                        className='overflow-hidden group'
                        onMouseEnter={() => setHoveredProductId(product._id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    >
                        <div className='relative w-full h-72 border border-gray-100'>
                            {/* Remove Icon (Trash) */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromWishlist(product._id);
                                }}
                                className='absolute top-2 right-2 z-10 p-2 bg-black/80 text-white rounded-full hover:bg-rose-600 transition-colors cursor-pointer'
                            >
                                <GoTrash className='text-lg'/>
                            </div>

                            <div onClick={() => getProductById(product._id)} className='w-full h-full cursor-pointer'>
                                <img
                                    className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out'
                                    src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[0]}
                                    alt={product.name}
                                    style={{transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)'}}
                                />
                                {product.images[1] && (
                                    <img
                                        className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out'
                                        src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[1]}
                                        alt={product.name}
                                        style={{transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)'}}
                                    />
                                )}
                            </div>

                            {/* Stock Badge */}
                            <div
                                className={`absolute top-2 left-2 z-10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white ${product.stock > 0 ? 'bg-black' : 'bg-rose-600 animate-pulse'}`}>
                                {product.stock > 0 ? 'Available' : 'Sold Out'}
                            </div>
                        </div>

                        <div className='p-3 bg-white border-x border-b border-gray-50'>
                            <div className="flex justify-between items-start mb-1">
                                <h2 className='text-sm font-black uppercase tracking-tight truncate w-3/4'
                                    title={product.name}>
                                    {product.name}
                                </h2>
                                <p className='text-rose-600 font-black text-sm'>${product.price}</p>
                            </div>

                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                                Added: {new Date(product?.createdAt).toLocaleDateString()}
                            </p>

                            {/* UPDATED MOVE TO CART BUTTON */}
                            <button
                                disabled={Number(product.stock || 0) <= 0}
                                onClick={() => {
                                    if ((product.stock || 0) <= 0) return;

                                    // 1. Add to Cart
                                    addToCart(product._id, 1);

                                    // 2. Remove from Wishlist immediately
                                    removeFromWishlist(product._id);
                                }}
                                className={`w-full flex items-center justify-center gap-2 rounded-none font-black py-3 px-4 transition-all duration-300 text-[10px] uppercase tracking-[0.2em] ${Number(product.stock || 0) <= 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through border border-gray-200'
                                    : 'bg-black text-white hover:bg-rose-600 border border-black hover:border-rose-600'
                                }`}>
                                Move to cart
                                <CiShoppingCart className="text-base"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist;