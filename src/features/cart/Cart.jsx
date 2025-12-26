import React, {useEffect, useState} from 'react';
import {FiShoppingCart, FiPlus, FiMinus,} from 'react-icons/fi';
import {Link, useNavigate} from 'react-router-dom';
import useCart from './useCart';
import toast from 'react-hot-toast';
import Dialog from '../../components/Dialog';
import useOrder from '../order/useOrder';

export default function Cart() {
    const {
        cart,
        loading,
        error,
        updateCartItem,
        removeFromCart,
        clearCart
    } = useCart();

    // console.log(cart.totalPrice);
    const navigate = useNavigate();
    const {CreateOrder} = useOrder();
    const STORAGE_KEY = 'checkoutInfo';
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('KH');
    const [phone, setPhone] = useState('');
    const paymentMethods = [
        {value: 'none', label: 'No Payment Method'},
        {value: 'cash_on_delivery', label: 'Cash on Delivery'},
        {value: 'bakong', label: 'Bakong Wallet'},
        {value: 'paypal', label: 'Paypal'},
    ];
    const countryCodes = {
        'KH': 'Cambodia',
    };
    const [paymentMethod, setPaymentMethod] = useState('none');
    const [placing, setPlacing] = useState(false);

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
            const payload = {fullName, address, city, postalCode, country, phone, paymentMethod};
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
            console.error('Failed to save checkout info', err);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            toast.success('Cart cleared successfully');
        } catch (err) {
            console.error('Error clearing cart:', err);
            toast.error('Failed to clear cart');
        }
    };

    if (loading) {
        return (
            <div className="py-60 flex flex-col items-center justify-center bg-white">
                {/* Mechanical Square Loader */}
                <div className="relative w-14 h-14">
                    {/* Outer Static Frame */}
                    <div className="absolute inset-0 border border-gray-200"></div>

                    {/* Spinning Top/Bottom Bars */}
                    <div
                        className="absolute inset-0 border-t-2 border-b-2 border-black animate-spin duration-700"></div>

                    {/* Center Pulsing Square */}
                    <div className="absolute inset-4 bg-rose-600 animate-pulse"></div>
                </div>

                {/* Status Text */}
                <div className="mt-8 flex flex-col items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
                        Accessing_Archives
                    </h3>

                    {/* Simple Tailwind-only Progress Line */}
                    <div className="mt-3 w-24 h-[2px] bg-gray-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black w-1/2 animate-[bounce_2s_infinite] left-0"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        // toast.error(error);
    }

    // Compute derived totals as a reliable fallback for UI consistency
    const items = cart?.items ?? [];
    const computedSubtotal = items.reduce((sum, item) => {
        const unitPrice = Number(item.price ?? item.product?.price ?? 0);
        const qty = Number(item.quantity ?? 0);
        return sum + unitPrice * qty;
    }, 0);
    const shippingCost = cart?.shippingCost;
    const tax = cart?.tax;
    const computedTotal = computedSubtotal + Number(shippingCost ?? 0) + Number(tax ?? 0);

    return (
        <>
            <div className="max-w-7xl min-h-[60vh] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {/* SINGLE RESPONSIVE HEADER - Handles both Mobile and Desktop */}
                <div className='flex justify-between items-center md:items-end mt-4 mb-6 border-b border-black pb-4'>
                    <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter italic leading-none">
                        Shopping_Cart
                        <span
                            className="block md:inline md:ml-4 mt-2 md:mt-0 text-[9px] font-black bg-black text-white px-2 py-1 uppercase tracking-widest not-italic w-fit">
                {cart?.items?.length || 0} Items
            </span>
                    </h1>
                    {cart?.items?.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-rose-600 transition-colors underline underline-offset-4"
                            disabled={loading}
                        >
                            {loading ? '...' : 'Clear All'}
                        </button>
                    )}
                </div>

                {!cart?.items?.length ? (
                    /* EMPTY STATE - Optimized */
                    <div className="text-center min-h-[60vh] bg-white flex items-center justify-center">
                        <div className="p-4">
                            <div
                                className="relative mx-auto h-20 w-20 border border-dashed border-gray-200 flex items-center justify-center mb-6">
                                <FiShoppingCart className="h-8 w-8 text-gray-200"/>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500"></div>
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tighter italic text-gray-900">Bag_Is_Empty</h2>
                            <p className="mt-2 text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] max-w-xs mx-auto">
                                Your selection is empty. Explore the archive.
                            </p>
                            <Link to="/"
                                  className="mt-8 inline-block px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-rose-600 transition-all">
                                Explore_Now
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* CART CONTENT */
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Cart Items List */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-white rounded-none border border-black overflow-hidden">
                                {/* Desktop Table Header - Stays hidden on mobile */}
                                <div
                                    className="hidden md:grid grid-cols-12 bg-gray-50 border-b border-black p-4 text-[10px] font-black uppercase tracking-widest">
                                    <div className="col-span-5">Product Details</div>
                                    <div className="col-span-2 text-center">Price</div>
                                    <div className="col-span-3 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>

                                {cart.items.map((item) => (
                                    <div key={item._id} className="border-b border-gray-100 last:border-0 p-4">
                                        {/* Layout: Grid on Desktop, Flex-Col on Mobile */}
                                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">

                                            {/* Product Info & Image */}
                                            <div className="flex items-start w-full md:col-span-5">
                                                <img
                                                    src={item.product.images?.[0] ? `${import.meta.env.VITE_BASE_URL}/uploads/${item.product.images[0]}` : 'https://via.placeholder.com/80'}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 md:w-20 md:h-20 object-cover border border-gray-200"
                                                />
                                                <div className="ml-4 flex-1">
                                                    <h3 className="font-bold text-xs md:text-sm uppercase tracking-tight line-clamp-2">{item.product.name}</h3>
                                                    {/* Show price on mobile only right here */}
                                                    <p className="md:hidden font-black text-xs text-rose-600 mt-1">${Number(item.price ?? item.product?.price ?? 0).toFixed(2)}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.product._id)}
                                                        className="mt-2 text-[8px] font-black uppercase text-gray-400 hover:text-rose-600 tracking-widest transition-colors"
                                                    >
                                                        [ Remove ]
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price - Desktop Only */}
                                            <div
                                                className="hidden md:block md:text-center md:col-span-2 font-bold text-sm">
                                                ${Number(item.price ?? item.product?.price ?? 0).toFixed(2)}
                                            </div>

                                            {/* Quantity Control - Optimized for Mobile Taps */}
                                            <div
                                                className="flex items-center justify-between w-full md:justify-center md:col-span-3 border-t md:border-t-0 pt-3 md:pt-0">
                                                <span
                                                    className="md:hidden text-[10px] font-black uppercase text-gray-400">Quantity</span>
                                                <div className="flex items-center border border-black bg-white">
                                                    <button
                                                        onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors border-r border-black"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FiMinus size={10}/>
                                                    </button>
                                                    <span className="px-4 font-bold text-xs">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors border-l border-black"
                                                    >
                                                        <FiPlus size={10}/>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total Price - Desktop Only */}
                                            <div
                                                className="hidden md:block text-right md:col-span-2 font-black text-sm">
                                                ${(Number(item.price ?? item.product?.price ?? 0) * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary - Stays clean on mobile below the items */}
                        <div className="w-full lg:w-1/3 mb-10">
                            <div className="bg-white border-2 border-black p-6 sticky top-24">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-gray-100 text-gray-400">
                                    Summary_Archive
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span>${computedSubtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-bold uppercase">
                                        <span className="text-gray-400">Logistics</span>
                                        <span>${Number(cart.shippingPrice ?? 0).toFixed(2)}</span>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-black flex justify-between items-end">
                                        <span
                                            className="text-[10px] font-black uppercase tracking-widest">Total_Assets</span>
                                        <span className="text-2xl font-black text-rose-600 italic leading-none">
                                ${Number(cart.totalPrice ?? 0).toFixed(2)}
                            </span>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-black text-white py-4 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-rose-600 transition-all duration-300 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                                    onClick={() => {
                                        if (!localStorage.getItem('token')) {
                                            navigate('/login');
                                            return;
                                        }
                                        setCheckoutOpen(true);
                                    }}
                                >
                                    Execute Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Dialog
                open={checkoutOpen}
                title="Shipping_Details"
                description="Validation required for archive logistics"
                confirmText={placing ? 'Processing...' : 'Place_Order'}
                cancelText="Back"
                onConfirm={async () => {
                    const payload = {
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            postalCode,
                            country: countryCodes[country] || country || 'Cambodia',
                            phone
                        },
                        paymentMethod: paymentMethod === 'none' ? 'none' : paymentMethod
                    };
                    try {
                        setPlacing(true);
                        await CreateOrder(payload);
                        persistCheckoutInfo();
                        await clearCart();
                        setCheckoutOpen(false);
                        setFullName('');
                        setAddress('');
                        setCity('');
                        setPostalCode('');
                        setCountry('');
                        setPaymentMethod('none');
                        setPhone('');
                        navigate('/profile');
                    } catch (e) {
                        setCheckoutOpen(false);
                    } finally {
                        setPlacing(false);
                    }
                }}
                onCancel={() => setCheckoutOpen(false)}
                onClose={() => setCheckoutOpen(false)}
                disableConfirm={placing || !fullName || !address || !city || !postalCode || !country || !phone}
            >
                <div className="grid grid-cols-1 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label
                            className="text-[9px] font-black uppercase tracking-widest text-gray-400">Full_Name</label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border-2 border-gray-100 rounded-none px-3 py-2 outline-none focus:border-black transition-colors font-bold text-xs"
                            placeholder="EG: JOHN DOE"
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                        <label
                            className="text-[9px] font-black uppercase tracking-widest text-gray-400">Street_Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border-2 border-gray-100 rounded-none px-3 py-2 outline-none focus:border-black transition-colors font-bold text-xs"
                            placeholder="EG: PHNOM PENH, ST. 123"
                        />
                    </div>

                    {/* City & Postal Code */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label
                                className="text-[9px] font-black uppercase tracking-widest text-gray-400">City</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full border-2 border-gray-100 rounded-none px-3 py-2 outline-none focus:border-black transition-colors font-bold text-xs"
                                placeholder="CITY"
                            />
                        </div>
                        <div className="space-y-1">
                            <label
                                className="text-[9px] font-black uppercase tracking-widest text-gray-400">Postal_Code</label>
                            <input
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full border-2 border-gray-100 rounded-none px-3 py-2 outline-none focus:border-black transition-colors font-bold text-xs"
                                placeholder="00000"
                            />
                        </div>
                    </div>

                    {/* Country Select */}
                    <div className="space-y-1">
                        <label
                            className="text-[9px] font-black uppercase tracking-widest text-gray-400">Country_Origin</label>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border-2 border-gray-100 rounded-none px-3 py-2 outline-none focus:border-black bg-white font-bold text-xs appearance-none"
                        >
                            <option value="">SELECT_REGION</option>
                            {Object.entries(countryCodes).map(([code, name]) => (
                                <option key={code} value={code}>
                                    {code} - {name.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                        <label
                            className="text-[9px] font-black uppercase tracking-widest text-gray-400">Contact_Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border-2 border-gray-100 rounded-none px-3 py-2 outline-none focus:border-black transition-colors font-bold text-xs"
                            placeholder="+855 000 000"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
}


