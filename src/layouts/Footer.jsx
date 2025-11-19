import React from "react";
import Marquee from "react-fast-marquee";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import race from "../assets/race.png";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const navLinks = [
    { name: 'Shop & Collections', path: '/' },
    { name: 'Our Partner', path: '/our-partner' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];
  return (
    <footer className="mt-20">
      {/* Top Marquee */}
      <div className="overflow-hidden border-y text-sm font-medium bg-black border-white text-white">
        <Marquee autoFill speed={55} gradient={false} className="cursor-grab py-3">
          <div className="flex items-center space-x-10 mx-4">
            <img src={race} className="w-10 h-10 opacity-90" alt="logo" />
            <span>🚚 Free Shipping Over $50</span>
            <span>•</span>
            <span>🔥 New Collection Released!</span>
            <span>•</span>
            <span>🎁 15% OFF with code NEW15</span>
            <span>•</span>
            <span>💯 100% Satisfaction Guaranteed</span>
            <span>•</span>
            <img src={race} className="w-10 h-10 opacity-90" alt="logo" />
          </div>
        </Marquee>
      </div>

      {/* Footer Main */}
      <div className="
        relative 
        text-white 
        footer-grid-bg 
        border-t border-white/10
      ">
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

        <div className="container mx-auto px-6 py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Logo / Branding */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-wide">TP-Cambo</h2>
              <p className="text-gray-400 text-sm mt-1">Your premium shopping experience.</p>
            </div>

            {/* Navigation Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-gray-300 hover:text-white font-bold leading-normal transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons */}
            <div className="flex flex-col items-center md:items-end gap-y-4 md:gap-y-0">
              <div className="flex items-center justify-center space-x-6">
                {[
                  { icon: <FaFacebookF size={22} />, link: "https://web.facebook.com/tha.nith.549" },

                ].map((item, i) => (
                  <Link
                    key={i}
                    to={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                                p-3
                                rounded-full
                                bg-white/10
                                backdrop-blur-md
                                hover:bg-white hover:text-black
                                transition-all duration-300
                                shadow-lg
                                hover:shadow-white/50
                              "
                  >
                    <div className="w-5 h-5">{item.icon}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom Text */}
          <div className="text-center text-gray-500 text-sm mt-10">
            © {new Date().getFullYear()} TP-Cambo. All rights reserved.
          </div>
          <div className="text-center text-gray-500 text-sm mt-10">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white font-bold leading-normal transition-colors duration-200">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms-conditions" className="text-gray-300 hover:text-white font-bold leading-normal transition-colors duration-200">Terms & Conditions</Link>
          </div>
          <div className="text-center text-gray-500 text-sm mt-10">
            <Link to="tel:+88593939290" className="text-gray-300 hover:text-white font-bold leading-normal transition-colors duration-200">+885 939 392 90</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
