import React, { useEffect, useState } from 'react'
import useArrival from './useArrival'
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useProduct from '../products/useProduct';

function Arrival() {
    const { arrival, loading, error, getArrival } = useArrival();
    const navigate = useNavigate();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const {getProductById} = useProduct();

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
            <div className="">
                <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 p-2 scrollbar-hide">
                    {arrival?.data?.map((product, index) => (
                        <div
                            key={product._id}
                            className='overflow-hidden cursor-pointer flex-shrink-0 w-[178px] sm:w-[290px]'
                            onMouseEnter={() => setHoveredProductId(product._id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div className='relative w-full h-64'>
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
                                {product.stock > 0 ? (
                                    <div className="absolute top-2 left-2 z-10 bg-black backdrop-blur-sm px-2 py-1  text-white text-xs font-semibold">
                                        In stock
                                    </div>
                                ) : (
                                    <div className="absolute top-2 left-2 z-10 bg-green-500 backdrop-blur-sm px-2 py-1  text-white text-xs font-semibold animate-pulse">
                                        Not available
                                    </div>
                                )}
                            </div>
                            <div className=''>
                                <p className="text-gray-700 font-semibold text-[12px] flex justify-end mt-2 mr-2">Arrival on {new Date(product?.expectedArrivalDate).toLocaleDateString()}</p>
                                <div className='px-2'>
                                    <h2 className='text-lg font-bold truncate' title={product.name}>{product.name}</h2>
                                    <div className="flex items-center justify-between">
                                        <p className='text-rose-600 text-xl font-bold'>{product.price} $</p>
                                    </div>
                                </div>
                                <button
                                    disabled={Number(product.stock || 0) <= 0}
                                    onClick={() => { if ((product.stock || 0) <= 0) { return; } addToCart(product._id, 1); }}
                                    className={`mt-2 w-full flex items-center justify-center gap-2 rounded-none font-semibold py-2 px-4 transition-all duration-300 ${Number(product.stock || 0) <= 0 ? 'bg-gray-100 border-2 border-black text-black cursor-not-allowed' : 'bg-black border-2 border-black hover:bg-black/80 text-white cursor-pointer'}`}>
                                    Not available
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