import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrder from './useOrder';

function Invoice() {
  const { id } = useParams();
  const { order, loading, error, getOrderByID } = useOrder();

  useEffect(() => {
    if (id) getOrderByID(id);
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="h-10 w-10 border-2 border-black border-t-transparent animate-spin"></div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.5em]">Generating_Document...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="border-2 border-black p-10 text-center uppercase font-black text-red-600">
        Error_System: {error}
      </div>
    </div>
  );

  if (!order) return null;

  const addr = order?.data?.shippingAddress || order?.data?.shippingInfo || order?.data?.address || null;
  const items = order?.data?.orderItems || [];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      {/* Centered Document Container */}
      <div className="max-w-3xl w-full bg-white border-2 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] p-8 md:p-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-black pb-8 mb-8">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter italic">Invoice</h1>
            <p className="font-bold text-[10px] text-gray-400 mt-2 tracking-widest uppercase">
              ID_Reference: <span className="text-black">#{String(order?.data?._id).toUpperCase()}</span>
            </p>
          </div>
          <div className="mt-6 md:mt-0 text-left md:text-right flex flex-col items-start md:items-end">
            <span className="bg-black text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest mb-3">
              {order.status || 'Processing'}
            </span>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              Issued: {order?.data?.createdAt ? new Date(order?.data?.createdAt).toLocaleDateString() : ''}
            </p>
            <button
              onClick={() => window.print()}
              className="mt-4 border-2 border-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95 no-print"
            >
              Print_Document
            </button>
          </div>
        </div>

        {/* Address & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="border-l-4 border-black pl-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Billed_To:</p>
            <p className="font-black uppercase text-sm">{addr?.fullName}</p>
            <p className="text-[11px] text-gray-600 uppercase mt-1">
              {addr?.address}, {addr?.city}<br />
              {addr?.country}
            </p>
            <p className="text-[11px] text-gray-500 mt-2 font-mono">{addr?.phone}</p>
            <p className="text-[11px] text-gray-500 mt-2 font-mono">{order?.data?.user?.email}</p>
          </div>
          <div className="md:text-right flex flex-col md:items-end">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Transaction_Method:</p>
            <p className="text-xs font-black uppercase italic border-b-2 border-black inline-block">
              {order?.data?.paymentMethod || 'Pending_Validation'}
            </p>
          </div>
        </div>

        {/* Items Table Header */}
        <div className="grid grid-cols-4 border-b border-gray-200 pb-2 mb-4">
          <span className="col-span-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Qty</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Amount</span>
        </div>

        {/* Items List */}
        <div className="space-y-6 mb-12">
          {items.map((it) => (
            <div key={it._id} className="grid grid-cols-4 items-center">
              <div className="col-span-2">
                <p className="font-black text-xs uppercase italic">{it.name}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-1">Unit_Price: ${it.price}</p>
              </div>
              <div className="text-center font-black text-xs">
                x{it.quantity}
              </div>
              <div className="text-right font-black text-sm italic">
                ${(it.quantity * it.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Final Calculation Grid */}
        <div className="grid grid-cols-2 border-2 border-black bg-white overflow-hidden mt-20">
          <div className="p-6 border-r-2 border-black flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-gray-200"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Logistics_Fee
              </span>
            </div>
            <span className="text-3xl font-black italic tracking-tighter text-black">
              ${Number(order?.data.shippingPrice).toFixed(2)}
            </span>
          </div>

          <div className="p-6 flex flex-col justify-center bg-gray-50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-rose-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                Grand_Total
              </span>
            </div>
            <span className="text-3xl font-black italic tracking-tighter text-rose-600">
              ${Number(order?.data.totalPrice).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer Signature/Note */}
        <div className="mt-12 text-center">
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.5em]">
            Thank you for your archive acquisition
          </p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;