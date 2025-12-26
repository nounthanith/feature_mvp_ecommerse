import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import useAuth from './useAuth';
import { toast } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to home if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            setIsLoading(true);
            await login(email, password);
            toast.success('Login successful!');

            // Redirect to the intended page or home
            const { state } = location;
            const from = state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-20 flex items-center justify-center p-4 bg-gray-50/50 min-h-[60vh]">
            <div className="w-full max-w-md">
                {/* Main Industrial Container */}
                <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="p-8">
                        {/* Header with Navigation */}
                        <div className="flex items-center mb-10">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 border border-black hover:bg-black hover:text-white transition-all mr-4 group"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                            </button>
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter italic">Auth_Access</h2>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">System_Entry_v2.0</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-black">
                                    Identification_Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-4 w-4 text-black" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-none focus:border-black focus:outline-none transition-colors font-bold text-xs uppercase"
                                        placeholder="USER@ARCHIVE.COM"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-black">
                                        Security_Key
                                    </label>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-4 w-4 text-black" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 border-2 border-gray-100 rounded-none focus:border-black focus:outline-none transition-colors font-bold text-xs"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
                                    >
                                        {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center py-4 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-[0.3em] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isLoading
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 shadow-none'
                                            : 'bg-black text-white hover:bg-rose-600 hover:border-rose-600'
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 border-2 border-white border-t-transparent animate-spin"></div>
                                            <span>Authorizing...</span>
                                        </div>
                                    ) : (
                                        'Initiate_Login'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-5 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            New_Collector?
                        </p>
                        <Link to="/register" className="text-[10px] font-black text-black uppercase tracking-widest border-b-2 border-black hover:text-rose-600 hover:border-rose-600 transition-all">
                            Create_Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;