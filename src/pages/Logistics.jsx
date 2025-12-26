import React from 'react';
import Marquee from 'react-fast-marquee';
import { FiTruck, FiMap, FiPackage, FiShield, FiClock } from 'react-icons/fi';

function Logistics() {
    const partners = [
        {
            name: "Vireak Buntham",
            type: "Express & Van",
            coverage: "All 25 Provinces",
            speed: "24h - 48h",
            description: "Leading local logistics network specializing in fast van delivery and provincial hub-to-hub transfers."
        },
        {
            name: "J&T Express",
            type: "Home Delivery",
            coverage: "Nationwide",
            speed: "1 - 3 Days",
            description: "Technology-driven international courier providing reliable last-mile delivery directly to your doorstep."
        },
        {
            name: "Grab Express",
            type: "Instant",
            coverage: "Phnom Penh Only",
            speed: "60 Minutes",
            description: "Immediate delivery within the capital city for urgent archive assets."
        }
    ];

    return (
        <div className='min-h-screen bg-white'>
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 py-12 border-b border-black">
                <span className="text-rose-500 font-black text-[10px] tracking-[0.5em] uppercase block mb-2">
                    Distribution_Network
                </span>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
                    Logistics_Hub
                </h1>
            </div>

            {/* Status Marquee */}
            <Marquee gradient={false} className="bg-black text-white py-4 border-b border-black">
                <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em]">
                    <span>Vireak Buntham Active</span>
                    <span className="text-rose-500">✦</span>
                    <span>J&T Express Integrated</span>
                    <span className="text-rose-500">✦</span>
                    <span>Nationwide Coverage</span>
                    <span className="text-rose-500">✦</span>
                    <span>Real-time Tracking Online</span>
                    <span className="text-rose-500">✦</span>
                </div>
            </Marquee>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Shipping Process */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="border-2 border-black p-6 bg-gray-50">
                            <h2 className="text-lg font-black uppercase italic mb-6 border-b border-black pb-2">Archive_Protocol</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-xs shrink-0">01</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-rose-600">Verification</p>
                                        <p className="text-xs font-bold uppercase">Items are inspected and sealed in the archive lab.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-xs shrink-0">02</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-rose-600">Dispatch</p>
                                        <p className="text-xs font-bold uppercase">Handed over to selected carrier (VBT / J&T).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-xs shrink-0">03</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-rose-600">Arrival</p>
                                        <p className="text-xs font-bold uppercase">Secure delivery to your provincial hub or door.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Policy Box */}
                        <div className="bg-rose-600 text-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <FiShield className="text-3xl mb-4" />
                            <h3 className="font-black uppercase tracking-widest text-sm mb-2">Safe_Transit_Assurance</h3>
                            <p className="text-[10px] uppercase font-bold leading-relaxed opacity-90">
                                All shipments are insured against damage. If the seal is broken upon arrival, do not accept the package.
                            </p>
                        </div>
                    </div>

                    {/* Right: Partner Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {partners.map((partner, index) => (
                                <div key={index} className="border border-black p-6 hover:bg-gray-50 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 bg-black text-white text-[8px] font-black uppercase">
                                        Partner_ID: 0{index + 1}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase italic mb-1">{partner.name}</h3>
                                    <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest mb-4">{partner.type}</p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2">
                                            <FiMap className="text-gray-400" />
                                            <span className="text-[10px] font-bold uppercase">{partner.coverage}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-gray-400" />
                                            <span className="text-[10px] font-bold uppercase">{partner.speed} Delivery</span>
                                        </div>
                                    </div>

                                    <p className="text-xs font-medium text-gray-500 uppercase leading-relaxed border-t border-gray-100 pt-4">
                                        {partner.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Tracking Placeholder */}
                        <div className="border-2 border-black p-8 flex flex-col items-center text-center space-y-4">
                            <FiPackage className="text-4xl text-black" />
                            <h3 className="text-xl font-black uppercase tracking-tighter italic">Track_Shipment</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest max-w-xs">
                                Enter your distribution ID to locate your assets in real-time.
                            </p>
                            <div className="flex w-full max-w-md border-2 border-black">
                                <input
                                    type="text"
                                    placeholder="EX: VBT-992031"
                                    className="flex-1 px-4 py-3 outline-none font-bold uppercase text-xs"
                                />
                                <button className="bg-black text-white px-6 font-black uppercase text-[10px] hover:bg-rose-600 transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Logistics;