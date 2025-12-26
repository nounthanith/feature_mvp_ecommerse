import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import useAuth from './useAuth';
import { toast } from 'react-hot-toast';
import Dialog from '../../components/Dialog';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { register, resendVerification } = useAuth();
    const navigate = useNavigate();

    const handleResendVerification = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await resendVerification(formData.email);
            if (response.success) {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.message || 'Failed to resend verification email');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-20 flex flex-col items-center justify-center p-4 bg-gray-50/50 min-h-[60vh]">
            {/* Industrial Loading Dialog */}
            <Dialog
                open={isLoading}
                title="SYSTEM_REGISTRATION"
                description="Establishing secure archive credentials"
                hideActions={true}
                onClose={() => { }}
            >
                <div className="flex flex-col items-center py-6 gap-4">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-2 border-gray-100"></div>
                        <div className="absolute inset-0 border-t-2 border-black animate-spin"></div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                            Processing_Verification_Data
                        </span>
                        <p className="text-[9px] text-gray-400 mt-2">Checking node availability...</p>
                    </div>
                    <button
                        onClick={handleResendVerification}
                        className="mt-2 text-[10px] font-black uppercase tracking-widest text-rose-600 border border-rose-600 px-3 py-1 hover:bg-rose-600 hover:text-white transition-all"
                    >
                        Resend_Code
                    </button>
                </div>
            </Dialog>

            <div className="w-full max-w-md">
                {/* Registration Card */}
                <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="p-8">
                        {/* Header */}
                        <div className="flex items-center mb-10">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 border border-black hover:bg-black hover:text-white transition-all mr-4"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                            </button>
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter italic">Create_Archive</h2>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">New_User_Registration_v2</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-black">Collector_Identity</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-4 w-4 text-black" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-none focus:border-black focus:outline-none transition-colors font-bold text-xs uppercase"
                                        placeholder="FULL NAME"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-black">Electronic_Mail</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-4 w-4 text-black" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-none focus:border-black focus:outline-none transition-colors font-bold text-xs uppercase"
                                        placeholder="USER@ARCHIVE.COM"
                                    />
                                </div>
                            </div>

                            {/* Password Fields */}
                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black">Security_Key</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock className="h-4 w-4 text-black" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
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

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black">Confirm_Key</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-3 border-2 border-gray-100 rounded-none focus:border-black focus:outline-none transition-colors font-bold text-xs"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center items-center py-4 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase tracking-[0.3em] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isLoading
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed border-gray-200 shadow-none'
                                        : 'bg-black text-white hover:bg-rose-600 hover:border-rose-600'
                                        }`}
                                >
                                    {isLoading ? 'Establishing_Node...' : 'Initialize_Account'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bottom Panel */}
                    <div className="bg-gray-50 px-8 py-5 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Existing_Collector?
                        </p>
                        <Link to="/login" className="text-[10px] font-black text-black uppercase tracking-widest border-b-2 border-black hover:text-rose-600 hover:border-rose-600 transition-all">
                            Access_Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;