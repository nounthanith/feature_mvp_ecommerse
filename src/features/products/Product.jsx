import { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import FeaturedProduct from './FeaturedProduct';
import Category from '../category/Category';
import useCart from '../cart/useCart';
import { useWishlist } from '../wishlist/WishlistContext';
import Arrival from '../arrival/Arrival';

function Product() {
    const { products, loading, error, getProducts, getProductById, pagination } = useProduct();
    const { addToWishlist, removeFromWishlist, checkWishlistStatus } = useWishlist();
    const { addToCart } = useCart();
    
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [page, setPage] = useState(1);
    
    // State to ensure loading animation shows for exactly 1.2s
    const [isInitialSync, setIsInitialSync] = useState(true);

    // Initial Data Fetch + 1.2s Timer
    useEffect(() => {
        getProducts(page);
        
        if (page === 1) {
            const timer = setTimeout(() => {
                setIsInitialSync(false);
            }, 1200); // 1.2 seconds
            return () => clearTimeout(timer);
        }
    }, [page]);

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (loading) return;
            if (!pagination || page >= pagination.totalPages) return;

            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 300; 

            if (scrollPosition >= threshold) {
                setPage((prev) => {
                    if (prev >= pagination.totalPages) return prev;
                    return prev + 1;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, pagination?.totalPages, page]);

    const toggleWishlist = (productId) => {
        if (checkWishlistStatus(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    // --- 1. INITIAL LOADING SCREEN (Shows for 1.2s) ---
    if (isInitialSync || (loading && page === 1)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
                <div className="relative w-16 h-16">
                    {/* Outer gray ring */}
                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                    {/* Inner spinning rose ring */}
                    <div className="absolute inset-0 border-4 border-t-rose-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.5em] text-gray-400 animate-pulse">
                    Initializing Catalog
                </p>
                <div className="mt-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-200 rounded-full animate-bounce"></div>
                </div>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-md">
                <p className="text-sm text-red-700">Failed to load products. {error.message}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-rose-500 text-white text-sm font-medium">Retry</button>
            </div>
        </div>
    );

    // --- NO PRODUCTS STATE ---
    if (!products?.length && !loading) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <button onClick={() => window.history.back()} className="mt-6 px-4 py-2 bg-black text-white text-sm">Go Back</button>
        </div>
    );

    // --- MAIN PRODUCT GRID ---
    return (
        <div className="animate-in fade-in duration-700">
            <FeaturedProduct />
            <Category />
            <Arrival />

            <div className="pb-20">
                <h2 className="text-4xl font-bold text-center text-black group mt-5 mb-5">
                    <span className="relative inline-block uppercase tracking-tighter font-black italic">
                        Products
                        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                    </span>
                </h2>

                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className='overflow-hidden cursor-pointer'
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
                                        src={import.meta.env.VITE_BASE_URL + product.images[0]}
                                        alt={product.name}
                                        style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                                    />
                                    {product.images[1] && (
                                        <img
                                            className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer'
                                            src={import.meta.env.VITE_BASE_URL + product.images[1]}
                                            alt={product.name}
                                            style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                        />
                                    )}
                                </div>
                                {Number(product.stock || 0) <= 0 && (
                                    <div className="absolute top-2 left-2 z-10 bg-black backdrop-blur-sm px-2 py-1 text-white text-[10px] font-bold uppercase animate-pulse">
                                        Out of stock
                                    </div>
                                )}
                            </div>

                            <div className='p-2'>
                                <p className="text-gray-400 font-semibold text-[10px] flex justify-end mt-1 italic">
                                    {new Date(product?.createdAt).toLocaleDateString()}
                                </p>
                                <div className='px-1'>
                                    <h2 className='text-md font-bold truncate uppercase tracking-tight' title={product.name}>
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center justify-between">
                                        <p className='text-rose-600 text-xl font-black'>${product.price}</p>
                                    </div>
                                </div>
                                <button
                                    disabled={Number(product.stock || 0) <= 0}
                                    onClick={() => { if ((product.stock || 0) <= 0) return; addToCart(product._id, 1); }}
                                    className={`mt-3 w-full flex items-center justify-center gap-2 rounded-none font-black py-2 px-4 transition-all duration-300 text-xs uppercase tracking-widest ${Number(product.stock || 0) <= 0 ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed line-through' : 'bg-black border border-black hover:bg-white hover:text-black text-white cursor-pointer'}`}>
                                    Add to cart
                                    <CiShoppingCart className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- 2. BOTTOM SCROLL LOADING ANIMATION --- */}
                {loading && page > 1 && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="flex space-x-2 mb-4">
                            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-bounce"></div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">
                            Loading More
                        </p>
                    </div>
                )}

                {/* END OF COLLECTION */}
                {!loading && products.length > 0 && page >= (pagination?.totalPages || 1) && (
                    <div className="flex flex-col items-center justify-center py-6 opacity-30">
                        <div className="h-px w-12 bg-black mb-3"></div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                            End of Products
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;