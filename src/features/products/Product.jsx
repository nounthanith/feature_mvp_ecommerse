import { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { CiShoppingCart } from "react-icons/ci";
function Product() {
    const { products, loading, error, getProducts, getProductById } = useProduct();
    const [hoveredProductId, setHoveredProductId] = useState(null);

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">Error: {error.message}</p>;

    return (
        <div className="">
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
                {products.map((product, index) => (
                    <div
                        key={product._id}
                        className='overflow-hidden  cursor-pointer'
                        onMouseEnter={() => setHoveredProductId(product._id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                    >
                        <div onClick={() => getProductById(product._id)} className='relative w-full h-64'>
                            <img
                                className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-grab'
                                src={import.meta.env.VITE_BASE_URL + product.images[0]}
                                alt={product.name}
                                style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                            />
                            {product.images[1] && (
                                <img
                                    className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-grab'
                                    src={import.meta.env.VITE_BASE_URL + product.images[1]}
                                    alt={product.name}
                                    style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                                />
                            )}
                        </div>
                        <div className=''>
                            <p className="text-gray-700 font-semibold text-[12px] flex justify-end mt-2 mr-2">
                                {new Date(product.createdAt).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                }).replace(/ /g, '-')}
                            </p>
                            <div className='px-2'>
                                <h2 className='text-lg font-bold'>{product.name}</h2>
                                <div className="flex items-center justify-between">
                                    <p className='text-rose-600 text-xl font-bold'>{product.price} $</p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // console.log(`🛒 Added ${product.name} to cart`);
                                    // later you can call your addToCart(product) function here
                                }}
                                className="mt-2 bg-black hover:bg-black/80 text-white font-semibold py-2 px-4 w-full flex items-center justify-center gap-2 rounded-none cursor-pointer transition-all duration-300"
                            >
                                Add to cart
                                <CiShoppingCart className="text-xl" />
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;
