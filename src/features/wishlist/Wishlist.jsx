import React, { useEffect, useState } from 'react'
import useWishlist from './useWishlist';
import useProduct from '../products/useProduct';
import { CiShoppingCart } from 'react-icons/ci';
import useCart from '../cart/useCart';
function Wishlist() {
    const { wishlist, loading, error, getWishlist } = useWishlist();
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

    return (
        <div>
            <h2 className="text-2xl font-bold text-start text-black group mt-5 mb-5 max-w-7xl mx-auto">
                <span className="relative inline-block">
                    Your Wishlist
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
                </span>
            </h2>
            <p className='text-start p-2 text-lg md:text-xl font-bold max-w-7xl mx-auto'>{wishlist.count} {wishlist.count === 1 ? "Product" : "Products"} in your wishlist</p>
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