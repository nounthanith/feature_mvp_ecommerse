import { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => document.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const navLinks = [
        { name: 'Shop', path: '/' },
        
    ];

    return (
        <>
            <header 
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <button 
                                onClick={() => navigate('/')}
                                className="text-2xl font-bold text-indigo-600"
                            >
                                ShopEase
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-3 py-2 text-sm font-medium transition-colors ${
                                            isActive 
                                                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                                                : 'text-gray-600 hover:text-indigo-600'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Right side icons */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-600 hover:text-indigo-600">
                                <FiSearch className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-indigo-600 relative">
                                <FiShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    3
                                </span>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-indigo-600">
                                <FiUser className="w-5 h-5" />
                            </button>
                            {/* Mobile menu button */}
                            <button 
                                className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div 
                        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
                        }`}
                    >
                        <div className="flex flex-col space-y-3 mt-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={`mobile-${link.name}`}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            isActive 
                                                ? 'bg-indigo-50 text-indigo-600' 
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Add padding to account for fixed navbar */}
            <div className="h-20"></div>
            <Outlet />
        </>
    );
}

export default Navbar;