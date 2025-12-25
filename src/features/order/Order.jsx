import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrder from './useOrder';
import Pagination from '../products/Pagination';
import { HiOutlinePrinter, HiOutlineDownload } from 'react-icons/hi';

function Order({ page = 1 }) {
    const navigate = useNavigate();
    const { orders, loading, error, getOrders, pagination } = useOrder();

    useEffect(() => {
        getOrders(page);
    }, [page]);

    const data = orders?.data;

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 border-4 border-gray-200 border-t-black animate-spin rounded-full"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-black">
            {/* Header */}
            <div className="bg-white border-2 border-black p-8 mb-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">Order History</h1>
                        <p className="text-gray-500 font-mono text-sm mt-1">Statement of Accounts</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase text-gray-400">Total Records</p>
                        <p className="text-2xl font-black font-mono">{pagination?.total || 0}</p>
                    </div>
                </div>
            </div>

            {/* Grid 2 Column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data?.map((o) => {
                    const addr = o.shippingAddress || o.shippingInfo || o.address || null;
                    const items = o.orderItems || [];

                    return (
                        <div key={o._id} className="bg-white border border-black flex flex-col relative overflow-hidden">
                            {/* Real-life Invoice Header */}
                            <div className="p-6 border-b border-gray-200 flex justify-between bg-white">
                                <div className="space-y-1">
                                    <h3 className="font-black text-xl uppercase tracking-tighter">Invoice</h3>
                                    <p className="font-mono text-xs text-gray-500">#{String(o._id).toUpperCase()}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <div className={`text-[10px] font-bold px-2 py-0.5 border border-black uppercase inline-block ${o.status === 'Delivered' ? 'bg-black text-white' : 'bg-white'}`}>
                                        {o.status || 'Processing'}
                                    </div>
                                    <p className="text-xs font-mono block text-gray-400">
                                        {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ''}
                                    </p>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6 grid grid-cols-2 gap-4 border-b border-gray-100 bg-gray-50/50">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Billed To:</p>
                                    <p className="text-xs font-bold uppercase">{addr?.name || 'Customer'}</p>
                                    <p className="text-[11px] text-gray-600 truncate">{addr?.city}, {addr?.country}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Payment:</p>
                                    <p className="text-xs font-bold uppercase">Paid Online</p>
                                </div>
                            </div>

                            {/* Items with Images */}
                            <div className="p-6 flex-1">
                                <div className="space-y-4">
                                    {items.map((it) => {
                                        const img = it.product?.images?.[0] || it.image;
                                        const imgUrl = img ? (img.startsWith('http') ? img : `${import.meta.env.VITE_BASE_URL}/uploads/${img}`) : null;

                                        return (
                                            <div key={it._id} className="flex items-center gap-4 group">
                                                <div className="h-12 w-12 bg-gray-100 border border-gray-200 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                                    {imgUrl ? (
                                                        <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-[8px] text-gray-400">NO IMG</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold uppercase truncate">{it.name}</p>
                                                    <p className="text-[10px] font-mono text-gray-400">QTY: {it.quantity} @ ${it.price}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-mono font-bold">${(it.quantity * it.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Summary Footer */}
                            <div className="p-6 bg-white border-t border-black">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold uppercase tracking-widest">Total Amount</span>
                                    <span className="text-2xl font-black font-mono">${Number(o.totalPrice).toFixed(2)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {/* Print / View Button */}
                                    <button
                                        onClick={() => window.open(`/order/${o._id}`, '_blank')}
                                        className="border border-black p-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <HiOutlinePrinter size={14} /> Print_View
                                    </button>

                                    {/* Download / Invoice Button */}
                                    <button
                                        onClick={() => window.open(`/order/${o._id}`, '_blank')}
                                        className="bg-black text-white p-2 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <HiOutlineDownload size={14} /> Get_Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Styled Pagination */}
            <div className="mt-12 flex justify-center">
                <Pagination page={pagination.page} totalPages={pagination.pages} onPageChange={(p) => getOrders(p)} />
            </div>
        </div>
    );
}

export default Order;