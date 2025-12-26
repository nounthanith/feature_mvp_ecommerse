import { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { BsHeart } from 'react-icons/bs';
import Marquee from 'react-fast-marquee';

import Footer from './Footer';
import useCart from '../features/cart/useCart';
import { useWishlist } from '../features/wishlist/WishlistContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const { cart } = useCart();
  const { count } = useWishlist();

  const cartCount = cart?.items?.length || 0;
  const wishlistCount = count?.data?.count || 0;

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      // Marquee will hide after 10px of scrolling
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ARCHIVE_SHOP', path: '/' },
    // { name: 'PARTNERS', path: '/our-partner' },
    { name: 'LOGISTICS', path: '/logistics' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        
        {/* TOP MARQUEE - Hidden on Scroll */}
        <div className={`bg-black text-white overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-1.5 opacity-100'
        }`}>
          <Marquee autoFill speed={50} gradient={false}>
            <div className="flex items-center space-x-12 mx-6 text-[10px] font-black uppercase tracking-[0.2em]">
              <span>🚚 Free shipping on orders over $50</span>
              <span className="text-rose-500">●</span>
              <span>🔥 New arrivals just dropped!</span>
              <span className="text-rose-500">●</span>
              <span>🎁 15% off your first order - NEW15</span>
              <span className="text-rose-500">●</span>
            </div>
          </Marquee>
        </div>

        {/* MAIN NAVBAR */}
        <header
          className={`w-full transition-all duration-300 border-b-2 border-black ${
            scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-md py-4'
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              
              {/* Logo */}
              <button onClick={() => navigate('/')} className="flex flex-col leading-none">
                <span className="text-2xl font-black uppercase tracking-tighter italic">
                  TP-CAMBO
                </span>
                <span className="text-[8px] font-bold tracking-[0.4em] text-gray-400 uppercase">Archive_System</span>
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-1 text-[11px] font-black uppercase tracking-widest transition-all ${
                        isActive 
                        ? 'text-white bg-black' 
                        : 'text-black hover:bg-gray-100'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Right Icons with Classic Bubbles */}
              <div className="flex items-center space-x-1">
                
                {/* Wishlist */}
                <button
                  onClick={() => navigate('/wishlist')}
                  className="relative p-2.5 text-black hover:text-rose-600 transition-colors"
                >
                  <BsHeart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0 -right-0 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in fade-in zoom-in">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2.5 text-black hover:text-rose-600 transition-colors"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0 -right-0 bg-rose-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in fade-in zoom-in">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Profile */}
                <button
                  onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
                  className="p-2.5 text-black hover:text-rose-600 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                </button>

                {/* Mobile Toggle */}
                <button
                  className="md:hidden p-2.5 text-black"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 py-4' : 'max-h-0'
              }`}>
              <div className="flex flex-col space-y-2 pt-2 border-t border-black/5">
                {navLinks.map((link) => (
                  <NavLink
                    key={`mobile-${link.name}`}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 text-[10px] font-black uppercase tracking-widest ${
                        isActive ? 'bg-black text-white' : 'text-black hover:bg-gray-100'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Dynamic Padding: Shorter when scrolled */}
      <div className={`transition-all duration-300 ${scrolled ? 'pt-16' : 'pt-24'}`}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Navbar;