import React, { useState } from 'react';
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

    const navigate = useNavigate();
    const { CreateOrder } = useOrder();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('none');
    const [placing, setPlacing] = useState(false);

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
            <div className="py-60 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-60 flex items-center justify-center">
                <div className="text-center">
                    <FiShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
                    <h2 className="mt-4 text-lg font-medium text-gray-900">Something went wrong</h2>
                    <p className="mt-1 text-gray-500">{typeof error === 'string' ? error : 'Failed to load your cart. Please try again.'}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 inline-block px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile Header */}


                {!cart?.items?.length ? (
                    <div className="text-center py-60 bg-white flex items-center justify-center">
                        <div>
                            <FiShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
                            <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
                            <p className="mt-1 text-gray-500">Start shopping to add items to your cart</p>
                            <Link
                                to="/"
                                className="mt-6 inline-block px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Desktop Header (full width) */}
                        <div className='hidden md:flex justify-between items-center mt-2 mb-4'>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Your Shopping Cart
                                {cart?.items?.length > 0 && (
                                    <span className="ml-3 text-sm font-normal bg-gray-100 text-gray-700 px-3 py-1 rounded-full border">
                                        {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
                                    </span>
                                )}
                            </h1>
                            <button
                                onClick={handleClearCart}
                                className="text-sm text-purple-600 cursor-pointer underline hover:text-purple-800 transition-colors"
                                disabled={loading || !cart?.items?.length}
                            >
                                {loading ? 'Clearing...' : 'Clear Cart'}
                            </button>
                        </div>

                        <div className="lg:flex gap-6">
                            <div className="md:hidden flex items-center justify-between mb-6">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-2 -ml-2 text-gray-600 hover:text-rose-600 flex justify-center items-center"
                                >
                                    <FiArrowLeft className="w-5 h-5" /><span>back</span>
                                </button>
                                <h1 className="text-xl font-semibold text-gray-900 underline underline-offset-4">Your Cart</h1>
                                <button
                                    onClick={handleClearCart}
                                    className="text-sm text-purple-600 cursor-pointer underline hover:text-purple-800 transition-colors"
                                    disabled={loading || !cart?.items?.length}
                                >
                                    {loading ? 'Clearing...' : 'Clear Cart'}
                                </button>
                            </div>
                            {/* Cart Items */}
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    {/* Desktop Table Header */}
                                    <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="col-span-5">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-3 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    {cart.items.map((item) => (
                                        <div key={item._id} className="border-b border-gray-100 p-4">
                                            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                                                {/* Product Info */}
                                                <div className="flex items-start w-full md:col-span-5">
                                                    <div className="shrink-0 mr-3">
                                                        <img
                                                            src={item.product.images?.[0] ?
                                                                `${import.meta.env.VITE_BASE_URL}/uploads/${item.product.images[0]}` :
                                                                'https://via.placeholder.com/80'}
                                                            alt={item.product.name}
                                                            className="w-20 h-20 object-cover rounded"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                                                        {/* Mobile Quantity Controls */}
                                                        <div className="md:hidden mt-3">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            updateCartItem(item.product._id, item.quantity - 1);
                                                                        }}
                                                                        className="p-1.5 border rounded-none hover:bg-gray-50"
                                                                        disabled={item.quantity <= 1}
                                                                    >
                                                                        <FiMinus className="w-3.5 h-3.5" />
                                                                    </button>
                                                                    <span className="w-8 text-center font-medium">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            updateCartItem(item.product._id, item.quantity + 1);
                                                                        }}
                                                                        className="p-1.5 border rounded-none hover:bg-gray-50"
                                                                    >
                                                                        <FiPlus className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                                <div className="font-medium text-right">
                                                                    <div className="text-sm text-gray-500">Total</div>
                                                                    <div>${(Number(item.price ?? item.product?.price ?? 0) * item.quantity).toFixed(2)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price - Desktop */}
                                                <div className="hidden md:block md:text-center md:col-span-2">
                                                    ${Number(item.price ?? item.product?.price ?? 0).toFixed(2)}
                                                </div>

                                                {/* Quantity - Desktop */}
                                                <div className="hidden md:flex items-center justify-center md:col-span-3">
                                                    <div className="flex items-center border rounded-none">
                                                        <button
                                                            onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                                                            className="p-2 text-gray-600 hover:bg-gray-50"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FiMinus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                                                            className="p-2 text-gray-600 hover:bg-gray-50"
                                                        >
                                                            <FiPlus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Total & Remove - Desktop */}
                                                <div className="hidden md:flex items-center justify-between w-full md:justify-end md:col-span-2">
                                                    <div className="font-medium">
                                                        ${(Number(item.price ?? item.product?.price ?? 0) * item.quantity).toFixed(2)}
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        className="text-gray-400 hover:text-rose-600 ml-4"
                                                        title="Remove item"
                                                    >
                                                        <FiTrash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-1/3 mt-6 lg:mt-0">
                                <div className="bg-white rounded-none shadow-sm p-6 sticky top-6">
                                    <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span>${computedSubtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span>{shippingCost != null ? `$${Number(shippingCost).toFixed(2)}` : 'Calculated at checkout'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span>${Number(tax ?? 0).toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-3 mt-3 flex justify-between text-lg font-medium">
                                            <span>Total</span>
                                            <span className="text-rose-600">${computedTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 transition-colors"
                                        onClick={() => { if (!localStorage.getItem('token')) { toast.error('Please login to continue'); navigate('/login'); return; } setCheckoutOpen(true); }}
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className="mt-4 text-center">
                                        <Link to="/" className="text-rose-600 hover:text-rose-700 text-sm font-medium">
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
                        shippingAddress: { fullName, address, city, postalCode, country },
                        paymentMethod
                    };
                    try {
                        setPlacing(true);
                        await CreateOrder(payload);
                        await clearCart();
                        setCheckoutOpen(false);
                        setFullName(''); setAddress(''); setCity(''); setPostalCode(''); setCountry('');
                        setPaymentMethod('none');
                        navigate('/profile');
                    } catch (e) {
                        setCheckoutOpen(false);
                    } finally {
                        setPlacing(false);
                    }
                }}
                onCancel={() => setCheckoutOpen(false)}
                onClose={() => setCheckoutOpen(false)}
                disableConfirm={placing || !fullName || !address || !city || !postalCode || !country || !paymentMethod}
            >
                <div className="grid grid-cols-1 gap-3">
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Full name" />
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Address" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="City" />
                        <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Postal code" />
                    </div>
                    <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200" placeholder="Country" />
                </div>
            </Dialog>
        </>
    );
}


