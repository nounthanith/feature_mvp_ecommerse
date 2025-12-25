import React, { useEffect, useState } from 'react';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
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

    console.log(cart.totalPrice);
    const navigate = useNavigate();
    const { CreateOrder } = useOrder();
    const STORAGE_KEY = 'checkoutInfo';
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('KH');
    const [phone, setPhone] = useState('');
    const paymentMethods = [
        { value: 'none', label: 'No Payment Method' },
        { value: 'cash_on_delivery', label: 'Cash on Delivery' },
        { value: 'bakong', label: 'Bakong Wallet' },
        { value: 'paypal', label: 'Paypal' },
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
            const payload = { fullName, address, city, postalCode, country, phone, paymentMethod };
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
                    <div className="absolute inset-0 border-t-2 border-b-2 border-black animate-spin duration-700"></div>

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
            <div className="max-w-7xl min-h-[60vh] mx-auto px-2 sm:px-6 lg:px-8 mt-6">
                {/* Mobile Header */}


                {!cart?.items?.length ? (
                    <div className="text-center min-h-[70vh] bg-white flex items-center justify-center ">
                        <div className="p-8">
                            {/* Minimalist Icon Wrapper */}
                            <div className="relative mx-auto h-24 w-24 border border-dashed border-gray-200 flex items-center justify-center mb-8">
                                <FiShoppingCart className="h-10 w-10 text-gray-200" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500"></div>
                            </div>

                            {/* Bold Typography */}
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic text-gray-900">
                                Bag_Is_Empty
                            </h2>

                            <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-xs mx-auto leading-relaxed">
                                Your current selection is empty. <br />
                                Explore the collection to add items.
                            </p>

                            {/* Square Button */}
                            <Link
                                to="/"
                                className="mt-10 inline-block px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-none hover:bg-rose-600 transition-all duration-300 active:scale-95"
                            >
                                Explore_Now
                            </Link>

                            <div className="mt-8 flex justify-center gap-4 items-center">
                                <div className="h-1 w-8 bg-gray-200"></div>
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">TP-Cambodia</span>
                                <div className="h-1 w-8 bg-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Desktop Header */}
                        <div className='hidden md:flex justify-between items-end mt-4 mb-8 border-b border-black pb-4'>
                            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
                                Shopping_Cart
                                {cart?.items?.length > 0 && (
                                    <span className="ml-4 text-[10px] font-black bg-black text-white px-2 py-1 uppercase tracking-widest not-italic">
                                        {cart.totalItems} Items
                                    </span>
                                )}
                            </h1>
                            <button
                                onClick={handleClearCart}
                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-4"
                                disabled={loading || !cart?.items?.length}
                            >
                                {loading ? 'Processing...' : 'Clear All'}
                            </button>
                        </div>

                        <div className="lg:flex gap-4">
                            {/* Cart Items List */}
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-none border border-black overflow-hidden">
                                    {/* Desktop Table Header */}
                                    <div className="hidden md:grid grid-cols-12 bg-gray-50 border-b border-black p-4 text-[10px] font-black text-black uppercase tracking-widest">
                                        <div className="col-span-5">Product Details</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-3 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    {cart.items.map((item) => (
                                        <div key={item._id} className="border-b border-gray-100 last:border-0 p-4">
                                            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                                                {/* Product Info */}
                                                <div className="flex items-start w-full md:col-span-5">
                                                    <img
                                                        src={item.product.images?.[0] ? `${import.meta.env.VITE_BASE_URL}/uploads/${item.product.images[0]}` : 'https://via.placeholder.com/80'}
                                                        alt={item.product.name}
                                                        className="w-20 h-20 object-cover rounded-none border border-gray-200"
                                                    />
                                                    <div className="ml-4 flex-1">
                                                        <h3 className="font-bold text-sm uppercase tracking-tight">{item.product.name}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.product._id)}
                                                            className="mt-2 text-[9px] font-black uppercase text-rose-600 hover:underline tracking-widest"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="hidden md:block md:text-center md:col-span-2 font-bold text-sm">
                                                    ${Number(item.price ?? item.product?.price ?? 0).toFixed(2)}
                                                </div>

                                                {/* Quantity (Square Style) */}
                                                <div className="flex items-center justify-center md:col-span-3">
                                                    <div className="flex items-center border border-black rounded-none">
                                                        <button
                                                            onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                                                            className="p-2 hover:bg-black hover:text-white transition-colors border-r border-black"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FiMinus size={12} />
                                                        </button>
                                                        <span className="px-4 font-bold text-xs">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                                                            className="p-2 hover:bg-black hover:text-white transition-colors border-l border-black"
                                                        >
                                                            <FiPlus size={12} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="hidden md:block text-right md:col-span-2 font-black text-sm">
                                                    ${(Number(item.price ?? item.product?.price ?? 0) * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary (White Square Style) */}
                            <div className="lg:w-1/3 mt-6 lg:mt-0">
                                <div className="bg-white border-2 border-black rounded-none p-6 sticky top-6">
                                    <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-gray-100">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                                            <span className="text-gray-500">Subtotal</span>
                                            <span className="text-black">${computedSubtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                                            <span className="text-gray-500">Shipping</span>
                                            <span className="text-black">${Number(cart.shippingPrice ?? 0).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                                            <span className="text-gray-500">Tax</span>
                                            <span className="text-black">${Number(cart.taxPrice ?? 0).toFixed(2)}</span>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-black flex justify-between items-baseline">
                                            <span className="text-xs font-black uppercase tracking-widest text-black">Total_Price</span>
                                            <span className="text-2xl font-black text-rose-600 italic">
                                                ${Number(cart.totalPrice ?? 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full bg-black text-white py-4 rounded-none font-black uppercase tracking-[0.2em] text-[11px] hover:bg-rose-600 transition-all duration-300 active:translate-y-1"
                                        onClick={() => { if (!localStorage.getItem('token')) { navigate('/login'); return; } setCheckoutOpen(true); }}
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="mt-6 text-center">
                                        <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-4">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)}
            </div>
            <Dialog
                open={checkoutOpen}
                title="Shipping Details"
                description="Enter your shipping information to place the order"
                confirmText={placing ? 'Placing…' : 'Place Order'}
                cancelText="Cancel"
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
                    console.log('Cart Checkout Payload:', JSON.stringify(payload, null, 2));
                    try {
                        setPlacing(true);
                        await CreateOrder(payload);
                        persistCheckoutInfo();
                        await clearCart();
                        setCheckoutOpen(false);
                        setFullName(''); setAddress(''); setCity(''); setPostalCode(''); setCountry('');
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
                <div className="grid grid-cols-1 gap-3">
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Eg: John Doe/ចន ដូ" />
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Eg: Phnom Penh/ភ្នំពេញ" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Eg: Toul Kork/ទួលគោក" />
                        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Postal Code/លេខកិច្ចការស្រុក" />
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


