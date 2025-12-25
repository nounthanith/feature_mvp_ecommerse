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
      <div className="h-8 w-8 border-2 border-black border-t-transparent animate-spin"></div>
    </div>
  );

  if (!order) return null;

  const addr = order?.data?.shippingAddress || order?.data?.shippingInfo || order?.data?.address || null;
  const items = order?.data?.orderItems || [];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:py-10">
      {/* Print Logic Optimization */}
      <style>
        {`
          @media print {
            @page { size: portrait; margin: 10mm; }
            body { background: white !important; }
            .no-print { display: none !important; }
            .print-container { 
              box-shadow: none !important; 
              border: 1px solid black !important;
              width: 100% !important; 
              padding: 15px !important;
            }
            .text-rose-600 { color: #e11d48 !important; -webkit-print-color-adjust: exact; }
          }
        `}
      </style>

      <div className="print-container max-w-2xl w-full bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] p-6 md:p-10">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">Invoice</h1>
            <p className="font-bold text-[9px] text-gray-400 mt-1">
              ID: <span className="text-black">#{String(order?.data?._id).toUpperCase()}</span>
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print border-2 border-black px-4 py-1 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all"
          >
            Print
          </button>
        </div>

        {/* Customer & Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="border-l-2 border-black pl-3">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Billed_To</p>
            <p className="font-black uppercase text-xs mb-1">{addr?.fullName}</p>
            <p className="text-[10px] text-gray-600 leading-relaxed uppercase">
              {addr?.address}, {addr?.city}<br />
              {addr?.country}
            </p>
          </div>
          
          <div className="sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-black pl-3 sm:pl-0 sm:pr-3">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact_Details</p>
            <p className="text-[10px] font-bold text-black">{addr?.phone}</p>
            <p className="text-[10px] font-bold text-black break-all">{order?.data?.user?.email}</p>
            <p className="text-[9px] text-gray-400 mt-2 font-black italic">
              DATE: {new Date(order?.data?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Payment Type */}
        <div className="mb-8 p-2 bg-gray-50 border border-black/5 inline-block">
          <p className="text-[8px] font-black text-gray-400 uppercase">Method</p>
          <p className="text-[10px] font-black uppercase italic">{order?.data?.paymentMethod || 'SECURE_TRANSACTION'}</p>
        </div>

        {/* Items */}
        <div className="space-y-4 mb-10">
          <div className="grid grid-cols-4 border-b border-black pb-1">
            <span className="col-span-2 text-[9px] font-black uppercase">Archive_Item</span>
            <span className="text-[9px] font-black uppercase text-center">Qty</span>
            <span className="text-[9px] font-black uppercase text-right">Sum</span>
          </div>
          {items.map((it) => (
            <div key={it._id} className="grid grid-cols-4 items-center py-1">
              <div className="col-span-2">
                <p className="font-black text-[11px] uppercase italic truncate">{it.name}</p>
                <p className="text-[8px] text-gray-400 font-bold">UNIT: ${it.price}</p>
              </div>
              <div className="text-center font-black text-[10px]">x{it.quantity}</div>
              <div className="text-right font-black text-[11px]">${(it.quantity * it.price).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 border-2 border-black bg-white">
          <div className="p-4 border-r-2 border-black">
            <span className="text-[8px] font-black uppercase text-gray-400 block">Shipping</span>
            <span className="text-xl font-black italic tracking-tighter">${Number(order?.data.shippingPrice).toFixed(2)}</span>
          </div>
          <div className="p-4 bg-zinc-50">
            <span className="text-[8px] font-black uppercase text-black block">Total_Amount</span>
            <span className="text-xl font-black italic tracking-tighter text-rose-600">${Number(order?.data.totalPrice).toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center pt-4 border-t border-dashed border-gray-200">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em]">
            Official Digital Archive Receipt
          </p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;