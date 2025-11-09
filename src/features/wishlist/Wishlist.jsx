import React, { useEffect, useState } from 'react'
import { useWishlist } from './WishlistContext';
import useProduct from '../products/useProduct';
import { CiShoppingCart } from 'react-icons/ci';
import useCart from '../cart/useCart';

function Wishlist() {
    const { wishlist, loading, error, getWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const { getProductById } = useProduct();
    useEffect(() => {
        getWishlist();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!wishlist.products?.length) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
            <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 max-w-md">
                We couldn't find any products in your wishlist.
            </p>
            <button
                onClick={() => window.history.back()}
                className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
            >
                Go Back
            </button>
        </div>
    );

    return (
        <div>
            <div className='flex items-center justify-between max-w-7xl mx-auto p-2'>
                <h2 className="text-2xl font-bold text-start text-black group">
                    <span className="relative inline-block">
                        Your Wishlist
                        <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                    </span>
                </h2>
                <div className=''>
                    <button
                        onClick={() => clearWishlist()}
                        className="text-sm text-purple-600 cursor-pointer underline hover:text-purple-800 transition-colors "
                    >
                        Clear Wishlist
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
                {wishlist.products?.map((product, index) => (
                    <div
                        key={product._id}
                        className='overflow-hidden  cursor-pointer'
                        onMouseEnter={() => setHoveredProductId(product._id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    >
                        <div onClick={() => getProductById(product._id)} className='relative w-full h-64'>
                            <img
                                className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-grab'
                                src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[0]}
                                alt={product.name}
                                style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                            />
                            {product.images[1] && (
                                <img
                                    className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-grab'
                                    src={import.meta.env.VITE_BASE_URL + "/uploads/" + product.images[1]}
                                    alt={product.name}
                                    style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                />
                            )}
                        </div>
                        <div className=''>
                            <div className='px-2 mt-2'>
                                <h2 className='text-lg font-bold'>{product.name}</h2>
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

export default Wishlist