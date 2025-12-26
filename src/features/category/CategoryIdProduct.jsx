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
import { BsArrowDown } from 'react-icons/bs';

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
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-2 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-t-2 border-rose-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Syncing_Archive...</p>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
            <div className="border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md">
                <h3 className="text-sm font-black uppercase mb-2 text-red-600">Connection_Error</h3>
                <p className="text-[11px] text-gray-500 mb-6 uppercase tracking-wider">{error.message}</p>
                <button onClick={() => getCategoryProducts(id)} className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors">Retry_Link</button>
            </div>
        </div>
    );

    if (!products?.data?.length) return (
        <>
            <Category />
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">Sector_Empty</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-8">No assets found in this category.</p>
                <button onClick={() => window.history.back()} className="px-8 py-3 border-2 border-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">Return_to_Archive</button>
            </div>
        </>
    );

    return (
        <div className="bg-white">
            {/* MODERN STICKY HERO SECTION */}
            <div className="relative w-full overflow-visible">
                {/* The Sticky Image Layer */}
                <div className="sticky top-0 h-[65vh] md:h-[75vh] w-full overflow-hidden z-0 border-x-0 md:border-x border-black max-w-7xl mx-auto">
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: `url(${import.meta.env.VITE_BASE_URL + products?.data?.[0]?.category?.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        {/* Modern Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80"></div>
                    </div>

                    {/* Hero Text Content */}
                    <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
                        <span className="text-rose-500 font-black text-[10px] tracking-[0.5em] uppercase block mb-3">
                            Category_Archive
                        </span>
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                            {products?.data?.[0]?.category?.name}
                        </h2>
                        <div className="h-1.5 w-24 bg-white mb-6"></div>
                        <p className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] max-w-xl mx-auto leading-relaxed border border-white/20 p-4 backdrop-blur-sm">
                            {products?.data?.[0]?.category?.description}
                        </p>

                        {/* YOUR SCROLL DOWN BUTTON */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                            <span className="text-white/50 text-[8px] font-black uppercase tracking-[0.4em]">Explore_Sector</span>
                            <button
                                onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
                                className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-rose-600 hover:border-rose-600 transition-all duration-500 group"
                            >
                                <BsArrowDown className='animate-bounce font-bold text-xl group-hover:scale-110' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CONTENT LAYER - This slides OVER the hero */}
                <div className="relative z-10 bg-white">
                    {/* Marquee Separator */}
                    <div className="border-y-2 border-black bg-black text-white max-w-7xl mx-auto">
                        <Marquee autoFill speed={40} gradient={false} className="py-3.5">
                            <div className="flex items-center space-x-12 mx-6 text-[10px] font-black uppercase tracking-[0.2em]">
                                <span>🚚 Free Shipping Over $50</span>
                                <span className="text-rose-500 text-lg">✦</span>
                                <span>🔥 New Arrivals Dispatched</span>
                                <span className="text-rose-500 text-lg">✦</span>
                                <span>🎁 15% OFF: NEW15</span>
                                <span className="text-rose-500 text-lg">✦</span>
                            </div>
                        </Marquee>
                    </div>

                    {/* Category Selector */}
                    <div className="max-w-7xl mx-auto">
                        <Category />
                    </div>

                    {/* PRODUCT GRID - YOUR ORIGINAL STYLE */}
                    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2 bg-white border-x border-black">
                        {products.data.map((product) => (
                            <div
                                key={product._id}
                                className='overflow-hidden cursor-pointer'
                                onMouseEnter={() => setHoveredProductId(product._id)}
                                onMouseLeave={() => setHoveredProductId(null)}
                            >
                                {/* Original Card Image Area */}
                                <div className='relative w-full h-64 md:h-80'>
                                    {/* Original Rounded Wishlist Button */}
                                    <div
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                                        className='absolute top-2 right-2 z-10 p-2 bg-black/70 rounded-full hover:bg-black/80 transition-colors cursor-pointer'
                                    >
                                        {checkWishlistStatus(product._id) ? (
                                            <FaHeart className='text-red-400 text-xl' />
                                        ) : (
                                            <CiHeart className='text-white text-xl hover:text-red-400' />
                                        )}
                                    </div>

                                    {/* Original Slide-Hover Logic */}
                                    <div onClick={() => getProductById(product._id)} className='w-full h-full relative overflow-hidden bg-gray-100'>
                                        <img
                                            className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out'
                                            src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[0]}
                                            alt={product.name}
                                            style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                                        />
                                        {product.images[1] && (
                                            <img
                                                className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out'
                                                src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[1]}
                                                alt={product.name}
                                                style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                            />
                                        )}
                                    </div>

                                    {/* Stock Badge */}
                                    <div className={`absolute top-2 left-2 z-10 px-2 py-1 text-white text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'bg-black' : 'bg-red-600 animate-pulse'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </div>

                                {/* Original Product Info Section */}
                                <div className='py-3'>
                                    <p className="text-gray-400 font-bold text-[10px] flex justify-end mb-1 mr-2 uppercase tracking-tighter">
                                        {new Date(product?.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className='px-2'>
                                        <h2 className='text-sm md:text-base font-black uppercase truncate' title={product.name}>
                                            {product.name}
                                        </h2>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className='text-rose-600 text-lg font-black tracking-tighter'>${product.price}</p>
                                            <span className="text-[8px] font-mono text-gray-300">REF_{product._id.substring(18)}</span>
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        disabled={Number(product.stock || 0) <= 0}
                                        onClick={() => { if ((product.stock || 0) <= 0) return; addToCart(product._id, 1); }}
                                        className={`mt-3 w-full flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] py-3 transition-all duration-300 border-2 border-black ${Number(product.stock || 0) <= 0
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                            : 'bg-black text-white hover:bg-white hover:text-black'
                                            }`}>
                                        Add_to_Cart
                                        <CiShoppingCart className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryIdProduct;