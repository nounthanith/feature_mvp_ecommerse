import React, { useEffect } from 'react'
import useOrder from './useOrder';
import Pagination from '../products/Pagination';

function Order({ page = 1 }) {
    const { orders, loading, error, getOrders, pagination } = useOrder();
    useEffect(() => {
        getOrders(page);
    }, [page]);
    const data = orders?.data;

    console.log(data);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-md">
                {typeof error === 'string' ? error : 'Failed to load orders'}
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                <p className="text-gray-500 max-w-md">
                    We couldn't find any orders in this category. Check back later or explore other categories.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const statusClass = (s) => {
        const v = (s || '').toLowerCase();
        if (v.includes('paid') || v.includes('delivered') || v.includes('completed')) return 'bg-green-100 text-green-700';
        if (v.includes('processing') || v.includes('pending')) return 'bg-yellow-100 text-yellow-700';
        if (v.includes('cancel')) return 'bg-red-100 text-red-700';
        return 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="space-y-6">
            <div className="text-sm text-gray-500"> <span className="font-medium text-gray-900">{pagination?.total}</span> orders</div>

            {data.map((o) => {
                const created = o.createdAt ? new Date(o.createdAt).toLocaleString() : '';
                const items = o.orderItems || [];
                const itemsPrice = Number(o.itemsPrice ?? 0);
                const shipping = Number(o.shippingPrice ?? 0);
                const tax = Number(o.taxPrice ?? 0);
                const total = Number(o.totalPrice ?? (itemsPrice + shipping + tax));
                const addr = o.shippingAddress || o.shippingInfo || o.address || o.shipping || null;
                const nameLine = addr?.name || addr?.fullName || '';
                const street = addr?.address || addr?.address1 || addr?.street || '';
                const city = addr?.city || '';
                const state = addr?.state || addr?.province || '';
                const zip = addr?.postalCode || addr?.zip || '';
                const country = addr?.country || '';
                const phone = addr?.phone || addr?.phoneNumber || '';

                return (
                    <div key={o._id} className="rounded-lg shadow-lg overflow-hidden bg-white">
                        {/* Gradient header (no hard border) */}
                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-5 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-500">Order</div>
                                    <div className="font-semibold">#{String(o._id).slice(-6)}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusClass(o.status)}`}>{o.status ?? 'Pending'}</span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Delivered: {o.deliveredAt ? new Date(o.deliveredAt).toLocaleString() : 'Not Delivered'}</span>
                                </div>
                                <div className="text-sm text-gray-500">{created}</div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="px-5 py-5 space-y-3">
                            {items.map((it) => (
                                <div key={it._id} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <img
                                            className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover bg-gray-100 shadow"
                                            src={it.product?.images?.[0] ? `${import.meta.env.VITE_BASE_URL}/uploads/${it.product.images[0]}` : 'https://via.placeholder.com/80'}
                                            alt={it.name}
                                            loading="lazy"
                                        />
                                        <div className="min-w-0">
                                            <div className="font-medium truncate" title={it.name}>{it.name}</div>
                                            <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm sm:text-base font-semibold text-gray-900">${Number(it.price ?? 0).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Address (optional) */}
                        {addr && (
                            <div className="px-5 pb-2">
                                <div className="rounded-lg bg-white/70 ring-1 ring-gray-100 p-4">
                                    <div className="text-sm font-medium text-gray-900 mb-1">Shipping Address</div>
                                    <div className="text-sm text-gray-600 space-y-0.5">
                                        {nameLine ? <div>{nameLine}</div> : null}
                                        {street ? <div>{street}</div> : null}
                                        {(city || state || zip) ? (
                                            <div>{[city, state, zip].filter(Boolean).join(', ')}</div>
                                        ) : null}
                                        {country ? <div>{country}</div> : null}
                                        {phone ? <div className="text-gray-500">{phone}</div> : null}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Soft summary section */}
                        <div className="px-5 pb-5">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-600">Items</span><span>${itemsPrice.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span>${shipping.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>${tax.toFixed(2)}</span></div>
                                    <div className="flex justify-between pt-2 font-semibold"><span>Total</span><span className="text-rose-600">${total.toFixed(2)}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <Pagination page={pagination.page} totalPages={pagination.pages} onPageChange={(page) => getOrders(page)} />
        </div>
    )
}

export default Order