import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

function Contact() {
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-white'>
            {/* Page Header - Responsive Text Sizes */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 border-b border-black">
                <span className="text-rose-500 font-black text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase block mb-2">
                    System_Communications
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
                    Contact_Us
                </h1>
            </div>

            {/* Marquee Decoration */}
            <Marquee direction="right" className="border-y border-black py-3 md:py-4 bg-black text-white overflow-hidden">
                <div className="flex whitespace-nowrap gap-8 md:gap-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">
                    <span>Support Sector Active</span>
                    <span className="text-rose-500">✦</span>
                    <span>Global Response Available</span>
                    <span className="text-rose-500">✦</span>
                    <span>Encrypted Connection</span>
                    <span className="text-rose-500">✦</span>
                    <span>System Online 24/7</span>
                    <span className="text-rose-500">✦</span>
                </div>
            </Marquee>

            {/* Main Content Container - Flex direction changes on LG */}
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row border-black md:border-x min-h-[500px]'>

                {/* Left Side: Information - Full width on mobile, 1/3 on Desktop */}
                <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black p-6 md:p-12 space-y-8 md:space-y-12 bg-gray-50">
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <FiMapPin className="text-lg md:text-xl" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">TP-Cambo_HQ</span>
                        </div>
                        <p className="text-xs md:text-sm font-bold uppercase leading-relaxed text-black">
                            Kdol Doun Teav <br />
                            Battambang, Cambodia
                        </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <FiPhone className="text-lg md:text-xl" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Comms_Channel</span>
                        </div>
                        <p className="text-xs md:text-sm font-bold uppercase text-black">+855 939 392 90</p>
                        <p className="text-xs md:text-sm font-bold uppercase underline text-black">support@tpcambo.com</p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <FiClock className="text-lg md:text-xl" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Operational_Hours</span>
                        </div>
                        <div className="text-[10px] md:text-[11px] font-bold uppercase space-y-2 text-gray-500">
                            <p className="flex justify-between"><span>Mon — Fri</span> <span className="text-black">09:00 - 18:00</span></p>
                            <p className="flex justify-between"><span>Sat — Sun</span> <span className="text-black">10:00 - 15:00</span></p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form View */}
                <div className="w-full lg:w-2/3 p-6 md:p-12 flex flex-col justify-center bg-white">
                    
                    {status === 'success' ? (
                        <div className="max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-black flex items-center justify-center mb-6">
                                <FiCheckCircle className="text-rose-500 text-2xl md:text-3xl" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-4">
                                Transmission_Success
                            </h2>
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-8">
                                Your message has been archived. Our sector representative will respond shortly.
                            </p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="w-full md:w-fit flex items-center justify-center gap-3 border-2 border-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all active:scale-95"
                            >
                                <FiRefreshCw /> Open_New_Ticket
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={`space-y-6 md:space-y-8 w-full max-w-2xl transition-opacity duration-300 ${status === 'sending' ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">User_Identity</label>
                                    <input required type="text" placeholder="YOUR FULL NAME" className="w-full border-b-2 border-gray-200 py-2 md:py-3 outline-none focus:border-black transition-colors font-bold text-xs md:text-sm uppercase bg-transparent rounded-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Contact_Email</label>
                                    <input required type="email" placeholder="EMAIL@ADDRESS.COM" className="w-full border-b-2 border-gray-200 py-2 md:py-3 outline-none focus:border-black transition-colors font-bold text-xs md:text-sm uppercase bg-transparent rounded-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Request_Subject</label>
                                <select className="w-full border-b-2 border-gray-200 py-2 md:py-3 outline-none focus:border-black transition-colors font-bold text-xs md:text-sm uppercase bg-transparent appearance-none rounded-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Order Logistics</option>
                                    <option>Product Feedback</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Data_Input</label>
                                <textarea required rows="4" placeholder="WRITE YOUR MESSAGE HERE..." className="w-full border-2 border-gray-100 p-3 md:p-4 outline-none focus:border-black transition-colors font-bold text-xs md:text-sm uppercase bg-gray-50/50 rounded-none"></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full md:w-fit group flex items-center justify-center gap-4 bg-black text-white px-10 py-4 md:py-5 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] hover:bg-rose-600 transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(225,29,72,0.4)] md:shadow-[8px_8px_0px_0px_rgba(225,29,72,0.2)]"
                            >
                                {status === 'sending' ? 'Transmitting...' : 'Transmit_Message'}
                                <FiSend className={`transition-transform ${status === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-2'}`} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;