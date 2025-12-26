import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

function Contact() {
    // idle, sending, success
    const [status, setStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        
        // Simulating API Transmission
        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-white'>
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 py-12 border-b border-black">
                <span className="text-rose-500 font-black text-[10px] tracking-[0.5em] uppercase block mb-2">
                    System_Communications
                </span>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
                    Contact_Us
                </h1>
            </div>

            {/* Marquee Decoration */}
            <Marquee direction="right" className="border-y border-black py-4 bg-black text-white overflow-hidden">
                <div className="flex whitespace-nowrap gap-12 text-[10px] font-black uppercase tracking-[0.5em]">
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

            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-black min-h-[600px]'>

                {/* Left Side: Contact Information */}
                <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black p-8 md:p-12 space-y-12 bg-gray-50">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <FiMapPin className="text-xl" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">TP-Cambo_HQ</span>
                        </div>
                        <p className="text-sm font-bold uppercase leading-relaxed">
                            Kdol Doun Teav <br />
                            Battambang, Cambodia <br />
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <FiPhone className="text-xl" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Comms_Channel</span>
                        </div>
                        <p className="text-sm font-bold uppercase">+855 939 392 90</p>
                        <p className="text-sm font-bold uppercase underline">support@tpcambo.com</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <FiClock className="text-xl" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational_Hours</span>
                        </div>
                        <div className="text-[11px] font-bold uppercase space-y-1 text-gray-500">
                            <p className="flex justify-between"><span>Mon — Fri</span> <span className="text-black">09:00 - 18:00</span></p>
                            <p className="flex justify-between"><span>Sat — Sun</span> <span className="text-black">10:00 - 15:00</span></p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Message Form or Success Response */}
                <div className="lg:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    
                    {status === 'success' ? (
                        /* SUCCESS VIEW */
                        <div className="max-w-md animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
                                <FiCheckCircle className="text-rose-500 text-3xl" />
                            </div>
                            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
                                Transmission_Success
                            </h2>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-8">
                                Your message has been archived in our system. A representative from the support sector will respond shortly.
                            </p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="flex items-center gap-3 border-2 border-black px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                                <FiRefreshCw /> Open_New_Ticket
                            </button>
                        </div>
                    ) : (
                        /* FORM VIEW */
                        <form onSubmit={handleSubmit} className={`space-y-8 max-w-2xl transition-opacity duration-300 ${status === 'sending' ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">User_Identity</label>
                                    <input required type="text" placeholder="YOUR FULL NAME" className="w-full border-b-2 border-gray-200 py-3 outline-none focus:border-black transition-colors font-bold text-sm uppercase bg-transparent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact_Email</label>
                                    <input required type="email" placeholder="EMAIL@ADDRESS.COM" className="w-full border-b-2 border-gray-200 py-3 outline-none focus:border-black transition-colors font-bold text-sm uppercase bg-transparent" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Request_Subject</label>
                                <select className="w-full border-b-2 border-gray-200 py-3 outline-none focus:border-black transition-colors font-bold text-sm uppercase bg-transparent appearance-none rounded-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Order Logistics</option>
                                    <option>Product Feedback</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Data_Input</label>
                                <textarea required rows="4" placeholder="WRITE YOUR MESSAGE HERE..." className="w-full border-2 border-gray-100 p-4 outline-none focus:border-black transition-colors font-bold text-sm uppercase bg-gray-50/50"></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={status === 'sending'}
                                className="group flex items-center gap-4 bg-black text-white px-10 py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-rose-600 transition-all shadow-[8px_8px_0px_0px_rgba(225,29,72,0.2)]"
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