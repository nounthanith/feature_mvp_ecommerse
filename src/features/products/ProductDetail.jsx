import React, { useEffect, useState } from 'react';
import useProduct from './useProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaHeart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import toast from 'react-hot-toast';
import Dialog from '../../components/Dialog';
import useOrder from '../order/useOrder';
import useCart from '../cart/useCart';
import { useWishlist } from '../wishlist/WishlistContext';

function ProductDetail() {
  const { product, getProductById, getProductsByCategory, getRelatedProducts, relatedProducts } = useProduct();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, checkWishlistStatus } = useWishlist();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { CreateOrder, buyNow } = useOrder();
  const [buyOpen, setBuyOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('KH');
  const [phone, setPhone] = useState('');
  const STORAGE_KEY = 'checkoutInfo';
  const paymentMethods = [
    { value: 'none', label: 'No Payment Method' },
    { value: 'cash_on_delivery', label: 'Cash on Delivery' },
    { value: 'bakong', label: 'Bakong Wallet' },
    { value: 'paypal', label: 'Paypal' },
  ];
  //'paypal', 'stripe', 'cash_on_delivery', 'bakong', 'none'
  const countryCodes = {
    'KH': 'Cambodia',
  };
  const [paymentMethod, setPaymentMethod] = useState('none');
  const [placing, setPlacing] = useState(false);
  const available = Number((product?.countInStock ?? product?.stock) || 0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (parsed.fullName) setFullName(parsed.fullName);
      if (parsed.address) setAddress(parsed.address);
      if (parsed.city) setCity(parsed.city);
      if (parsed.postalCode) setPostalCode(parsed.postalCode);
      if (parsed.country) setCountry(parsed.country);
      if (parsed.phone) setPhone(parsed.phone);
      // if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
    } catch (err) {
      console.error('Failed to load saved checkout info', err);
    }
  }, []);

  const persistCheckoutInfo = () => {
    try {
      const payload = {
        fullName,
        address,
        city,
        postalCode,
        country,
        phone,
        paymentMethod,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to save checkout info', err);
    }
  };

  useEffect(() => {
    if (!product) return;
    if (available <= 0) {
      if (quantity !== 1) setQuantity(1);
      return;
    }
    if (quantity > available) {
      setQuantity(available);
      toast.error('Out of stock');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [available]);

  const toggleWishlist = (productId) => {
    if (checkWishlistStatus(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };



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


  if (!product) return <div className="flex items-center justify-center min-h-[80vh]">
    <div className="animate-pulse flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600">Loading products details...</p>
    </div>
  </div>

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Minimalist Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors py-8 cursor-pointer group"
        >
          <FaChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Return_to_Archive
        </button>

        {/* Main Container */}
        <div className="md:flex gap-12">
          {/* Left Column: Product Images */}
          <div className="md:w-1/2">
            <div className="relative aspect-square overflow-hidden bg-white border border-black group">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${product.images[selectedImage]}`}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Wishlist Toggle (Square Style) */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                className='absolute top-4 right-4 z-10 p-4 bg-white border border-black hover:bg-black hover:text-white transition-all cursor-pointer'
              >
                {checkWishlistStatus(product._id) ? (
                  <FaHeart className='text-rose-600 text-xl' />
                ) : (
                  <CiHeart className='text-xl' />
                )}
              </button>
            </div>

            {/* Thumbnail Gallery (Square) */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border shrink-0 transition-all ${selectedImage === index ? 'border-black border-2' : 'border-gray-200'}`}
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${img}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            {/* Status & Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 border ${product.isActive ? 'border-black text-black' : 'border-rose-600 text-rose-600'}`}>
                {product.isActive ? 'Status: Active' : 'Status: Vaulted'}
              </span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Collection: {product.category?.name || 'General'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter italic mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-black text-rose-600 italic">
                ${product.price.toFixed(2)}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${available > 0 ? 'text-green-600' : 'text-rose-600'}`}>
                {available > 0 ? `// Stock Available: ${available}` : '// Out of stock'}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-lg">
              {product.description}
            </p>

            {/* Quantity Selector (Industrial Style) */}
            <div className="flex items-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-black mr-6">Quantity</span>
              <div className="flex items-center border-2 border-black">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold border-r-2 border-black"
                >
                  -
                </button>
                <span className="w-14 text-center font-black text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(available || 1, prev + 1))}
                  className="px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold border-l-2 border-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-12">
              <button
                disabled={available <= 0}
                onClick={() => { if (available <= 0) return; addToCart(product._id, quantity); }}
                className={`group w-full py-5 flex items-center justify-center gap-3 transition-all duration-500 border-2 border-black font-black uppercase tracking-[0.3em] text-[11px] ${available <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-white hover:text-black'
                  }`}
              >
                <CiShoppingCart className="text-xl group-hover:scale-125 transition-transform" />
                Add_to_Cart
              </button>

              <button
                disabled={available <= 0}
                onClick={() => { if (!localStorage.getItem('token')) { navigate('/login'); return; } if (available <= 0) return; setBuyOpen(true); }}
                className={`w-full py-5 border-2 border-black font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-300 ${available <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-rose-600 hover:text-white hover:border-rose-600 active:translate-y-1'
                  }`}
              >
                Immediate_Checkout
              </button>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              <div className="bg-white p-4">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Date_Added</p>
                <p className="text-[11px] font-bold text-black">{new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Authenticity</p>
                <p className="text-[11px] font-bold text-black">Verified_Archive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Original Layout with New Styling */}
        <div className="mt-16">
          {relatedProducts.length > 0 && (
            <h2 className="text-2xl font-black text-center text-black mb-10 group mt-4 uppercase italic tracking-tighter">
              <span className="relative inline-block">
                You may also like
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-black transition-all duration-500 group-hover:w-full"></span>
              </span>
            </h2>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-2">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden cursor-pointer border border-transparent hover:border-black transition-all duration-300"
                onMouseEnter={() => setHoveredProductId(product._id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div className="relative w-full h-64">
                  {/* Original Circle Wishlist Button */}
                  <div
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                    className="absolute top-2 right-2 z-10 p-2 bg-black/70 rounded-full hover:bg-black transition-colors cursor-pointer"
                  >
                    {checkWishlistStatus(product._id) ? (
                      <FaHeart className="text-rose-500 text-xl" />
                    ) : (
                      <CiHeart className="text-white text-xl hover:text-rose-300" />
                    )}
                  </div>

                  {/* Original Image Sliding Logic */}
                  <div onClick={() => { getProductById(product._id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-full h-full">
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer"
                      src={import.meta.env.VITE_BASE_URL + product.images[0]}
                      alt={product.name}
                      style={{ transform: hoveredProductId === product._id ? 'translateX(-100%)' : 'translateX(0)' }}
                    />
                    {product.images[1] && (
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out cursor-pointer"
                        src={import.meta.env.VITE_BASE_URL + product.images[1]}
                        alt={product.name}
                        style={{ transform: hoveredProductId === product._id ? 'translateX(0)' : 'translateX(100%)' }}
                      />
                    )}
                  </div>

                  {/* Original Stock Badge */}
                  {product.stock > 0 ? (
                    <div className="absolute top-2 left-2 z-10 bg-black px-2 py-1 text-white text-[10px] font-black uppercase tracking-widest">
                      In stock
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 z-10 bg-rose-600 px-2 py-1 text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                      Out of stock
                    </div>
                  )}
                </div>

                {/* Info Section - Kept your original structure */}
                <div className="bg-white">
                  <p className="text-gray-400 font-bold text-[10px] flex justify-end mt-2 mr-2 uppercase tracking-widest">
                    {new Date(product?.createdAt).toLocaleDateString()}
                  </p>
                  <div className="px-2">
                    <h2 className="text-lg font-black uppercase tracking-tight truncate" title={product.name}>
                      {product.name}
                    </h2>
                    <div className="flex items-center justify-between">
                      <p className="text-rose-600 text-xl font-black italic">${product.price}</p>
                    </div>
                  </div>

                  {/* Original Button Shape with Updated Styling */}
                  <button
                    disabled={Number(product.stock || 0) <= 0}
                    onClick={() => { if ((product.stock || 0) <= 0) return; addToCart(product._id, 1); }}
                    className={`mt-2 w-full flex items-center justify-center gap-2 rounded-none font-black uppercase text-[11px] tracking-widest py-3 px-4 transition-all duration-300 ${Number(product.stock || 0) <= 0
                        ? 'bg-gray-100 text-black border-2 border-black cursor-not-allowed line-through'
                        : 'bg-black hover:bg-black/80 text-white cursor-pointer border-2 border-black'
                      }`}
                  >
                    Add to cart
                    <CiShoppingCart className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog
        open={buyOpen}
        title="Shipping Details"
        description="Enter your shipping information to place the order"
        confirmText={placing ? 'Placing…' : 'Place Order'}
        cancelText="Cancel"
        onConfirm={async () => {
          const payload = {
            productId: product?._id || id,
            quantity: quantity,
            shippingAddress: {
              fullName,
              address,
              city,
              postalCode,
              country: countryCodes[country] || country || 'Cambodia',
              phone
            },

          };
          console.log('Buy Now Payload:', JSON.stringify(payload, null, 2));
          try {
            setPlacing(true);
            await buyNow(payload);
            persistCheckoutInfo();
            setBuyOpen(false);
            setFullName('');
            setAddress('');
            setCity('');
            setPostalCode('');
            setCountry('');
            setPhone('');
            navigate('/profile');
          } catch (e) {
            setBuyOpen(false);
          } finally {
            setPlacing(false);
          }
        }}
        onCancel={() => setBuyOpen(false)}
        onClose={() => setBuyOpen(false)}
        disableConfirm={placing || !fullName || !address || !city || !postalCode || !country || !phone}
      >
        <div className="grid grid-cols-1 gap-3">
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Eg: John Doe/ចន ដូ" />
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Eg: Phnom Penh/ភ្នំពេញ" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Eg: Toul Kork/ទួលគោក" />
            <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Postal Code" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Country Code</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200 bg-white"
            >
              <option value="">Select Country</option>
              {Object.entries(countryCodes).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Phone/លេខទូរស័ព្ទ" />
        </div>
      </Dialog>
    </>
  );
}

export default ProductDetail;

