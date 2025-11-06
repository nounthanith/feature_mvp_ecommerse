import React, { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import toast from 'react-hot-toast';
import useCart from '../cart/useCart';

function ProductDetail() {
  const { product, getProductById, getProductsByCategory, getRelatedProducts, relatedProducts } = useProduct();
  console.log(relatedProducts);
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (quantity > product?.stock) {
    toast.error('Out of stock');
    setQuantity(product?.stock);
  }



  const [hoveredProductId, setHoveredProductId] = useState(null);

  const categoryId = product?.category?._id;

  // console.log(products);

  useEffect(() => {
    if (id) {
      getProductById(id);
      getRelatedProducts(id);
    }
  }, [id]);

  useEffect(() => {
    if (categoryId && product?._id) {
      getProductsByCategory(categoryId, product._id);
    }
  }, [categoryId, product?._id]);

  const handleAddToCart = () => {
    if (quantity > product?.stock) {
      toast.error('Out of stock');
      setQuantity(product?.stock);
    }
    addToCart({ ...product, quantity });
  };

  if (!product) return <div className="flex items-center justify-center h-[80vh] text-gray-600">Loading product details...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black hover:text-blue-600 transition-colors px-4 cursor-pointer mt-4"
      >
        <FaChevronLeft className="mr-2" /> Back to Products
      </button>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div className="md:flex">
          {/* Product Images */}
          <div className="md:w-1/2 p-6">
            <div className="h-96 overflow-hidden rounded-none mb-4 border border-rose-200">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 cursor-grab"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 border-2 rounded-none overflow-hidden shrink-0 hover:shadow-md transition-all ${selectedImage === index ? 'border-rose-500' : 'border-gray-200'}`}
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${img}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover cursor-grab"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6">
            <div>
              {product.isActive ? (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[14px] font-semibold">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-red-50 text-red-700 border border-red-300 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  Inactive
                </span>
              )}
            </div>

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              </div>
              <button className="text-gray-400 hover:text-rose-500 transition-colors">
                <CiHeart className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-semibold text-rose-600">${product.price.toFixed(2)}</span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category?.name || 'N/A'}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Availability</h3>
              <p className="mt-1 text-sm text-green-600">
                {product.countInStock > 0
                  ? `In Stock (${product.countInStock} available)`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <span className="mr-4 font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-500 rounded-none">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(product.countInStock || 10, prev + 1))}
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product._id, quantity)}
                className="flex-1 bg-black hover:bg-black/80 cursor-pointer text-white py-3 px-6 rounded-none font-medium flex items-center justify-center gap-2 transition-all"
              >
                <CiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-black cursor-pointer text-black hover:bg-black hover:text-white py-3 px-6 rounded-none font-medium transition-all">
                Buy Now
              </button>
            </div>

            {/* Delivery & Security Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <TbTruckDelivery className="w-6 h-6 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                    <p className="text-xs text-gray-500">On all orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BsShieldCheck className="w-6 h-6 text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="p-6 border-t border-gray-200 border-b mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2 border-gray-300">Product Details</h2>
          <div className="flex justify-start gap-4">
            <div className='border border-gray-200 shadow-sm p-3 rounded-sm hover:shadow-md transition-all'>
              <h3 className="font-medium text-gray-900">Date Added</h3>
              <p className="text-gray-600">{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
            <div className='border border-gray-200 shadow-sm p-3 rounded-sm hover:shadow-md transition-all'>
              <h3 className="font-medium text-gray-900">Last Updated</h3>
              <p className="text-gray-600">{new Date(product.updatedAt || product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Product you may also like */}
        <div>
          {relatedProducts.length > 0 && <h2 className="text-2xl font-semibold text-center text-black mb-10 group mt-4">
            <span className="relative inline-block">
              You may also like
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </h2>}
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
            {relatedProducts.map((product, index) => (
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
                  <p className="text-gray-700 font-semibold text-[12px] flex justify-end mt-2 mr-2">{new Date(product?.createdAt).toLocaleDateString()}</p>
                  <div className='px-2'>
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
      </div>
    </div>
  );
}

export default ProductDetail;
