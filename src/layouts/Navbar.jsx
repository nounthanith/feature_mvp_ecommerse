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
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  const { cart } = useCart();
  const { count } = useWishlist();

  const cartCount = cart?.items?.length || 0;
  const wishlistCount = count?.data?.count || 0;

  /* ===========================
     Sync login state
  ============================ */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /* ===========================
     Scroll shadow
  ============================ */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ===========================
     Lock body scroll when mobile menu open
  ============================ */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const navLinks = [
    { name: 'Shop & Collections', path: '/' },
    { name: 'Our Partner', path: '/our-partner' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    isLoggedIn
      ? { name: 'Profile', path: '/profile' }
      : { name: 'Login', path: '/login' },
  ];

  return (
    <>
      {/* ================= FIXED TOP AREA ================= */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* TOP MARQUEE */}
        <div className="bg-gradient-to-r from-black via-pink-950 to-black py-1 text-white text-sm font-medium">
          <Marquee autoFill speed={40} pauseOnHover gradient={false}>
            <div className="flex items-center space-x-8 mx-4">
              <span>🚚 Free shipping on orders over $50</span>
              <span>🔥 New arrivals just dropped!</span>
              <span>🎁 15% off your first order - NEW15</span>
              <span>💯 100% Satisfaction Guaranteed</span>
            </div>
          </Marquee>
        </div>

        {/* NAVBAR */}
        <header
          className={`w-full transition-all duration-300 border-b border-gray-300 ${
            scrolled
              ? 'bg-white shadow-md py-2'
              : 'bg-white/90 backdrop-blur-sm py-4'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-black"
              >
                TP-Cambo
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-black'
                          : 'text-gray-600 hover:text-black'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <span
                        className={`relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 ${
                          isActive
                            ? 'after:w-full'
                            : 'after:w-0 hover:after:w-full'
                        }`}
                      >
                        {link.name}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Right Icons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => navigate('/wishlist')}
                  className="relative p-2 text-gray-600 hover:text-rose-600"
                >
                  <BsHeart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                </button>

                <button
                  onClick={() => navigate('/cart')}
                  className="relative p-2 text-gray-600 hover:text-rose-600"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                </button>

                <button
                  onClick={() =>
                    navigate(isLoggedIn ? '/profile' : '/login')
                  }
                  className="p-2 text-gray-600 hover:text-rose-600"
                >
                  <FiUser className="w-5 h-5" />
                </button>

                {/* Mobile Button */}
                <button
                  className="md:hidden p-2 text-gray-600 hover:text-rose-600"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <FiX className="w-6 h-6" />
                  ) : (
                    <FiMenu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
              }`}
            >
              <div className="flex flex-col space-y-3 mt-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={`mobile-${link.name}`}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? 'bg-rose-50 text-rose-600'
                          : 'text-gray-600 hover:bg-gray-100'
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

      {/* ================= PAGE CONTENT ================= */}
      <div className="pt-[128px]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default Navbar;
