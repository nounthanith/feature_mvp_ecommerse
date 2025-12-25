import React from "react";
import Marquee from "react-fast-marquee";
import { FaFacebookF } from "react-icons/fa";
import race from "../assets/race.png";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const navLinks = [
    { name: 'Shop', path: '/' },
    { name: 'Partner', path: '/our-partner' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="mt-10 border-t border-white/10">
      {/* Top Marquee - Made slimmer */}
      <div className="overflow-hidden bg-black border-b border-white/10 text-white">
        <Marquee autoFill speed={40} gradient={false} className="py-2 text-xs font-light tracking-widest uppercase">
          <div className="flex items-center space-x-8 mx-4">
            <img src={race} className="w-6 h-6 opacity-70" alt="logo" />
            <span>Free Shipping Over $50</span>
            <span>•</span>
            <span>15% OFF: NEW15</span>
            <span>•</span>
          </div>
        </Marquee>
      </div>

      {/* Footer Main */}
      <div className="relative text-white footer-grid-bg">
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left: Branding */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold tracking-tighter">TP-CAMBO</h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Premium Shopping</p>
            </div>

            {/* Center: Inline Navigation Links */}
            <nav>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: Social & Phone */}
            <div className="flex items-center gap-4">
              <Link to="tel:+88593939290" className="text-xs text-gray-400 hover:text-white transition-colors border-r border-white/20 pr-4">
                +885 939 392 90
              </Link>
              <Link
                to="https://facebook.com/tha.nith.549"
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all"
              >
                <FaFacebookF size={14} />
              </Link>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} TP-Cambo. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link to="/terms-conditions" className="hover:text-gray-300">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}