import { useState } from "react";
import api from "../../lib/api"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();
    const checkEmailVerification = async (userId, maxAttempts = 25) => {
        return new Promise((resolve) => {
            let attempts = 0;

            const checkInterval = setInterval(async () => {
                try {
                    attempts++;
                    const res = await api.get(`/auth/check-verification/${userId}`);

                    if (res.data?.data?.isEmailVerified) {
                        clearInterval(checkInterval);
                        resolve({ isVerified: true, user: res.data?.data });
                    } else if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                        resolve({ isVerified: false, user: null });
                    }
                } catch (error) {
                    // console.error('Verification check error:', error);
                    clearInterval(checkInterval);
                    resolve({ isVerified: false, user: null });
                }
            }, 1200); // Check every 1.2 seconds
        });
    };

    const register = async (userData) => {
        try {
            const res = await api.post("/auth/register", userData);
            // console.log('Registration response:', res.data);

            if (res.data?.data?.user) {
                const { user } = res.data.data;

                if (user.isEmailVerified) {
                    navigate('/login');
                } else {
                    // Start polling for verification
                    const { isVerified } = await checkEmailVerification(user._id);

                    if (isVerified) {
                        navigate('/login', {
                            state: {
                                message: 'Email verified successfully!',
                                email: user.email
                            }
                        });
                    } else {
                        navigate('/login', {
                            state: {
                                message: 'Please verify your email to continue',
                                email: user.email
                            }
                        });
                    }
                }
            }

            return res.data;
        } catch (error) {
            // console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            throw error;
        }
    }
    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password })
        localStorage.setItem("token", res.data.data.token)
        return res.data
    }

    const getProfile = async () => {
        const res = await api.get("/auth/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setProfile(res.data.data.user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        toast.success('Logout successful!')
        navigate('/login')
    }
    const resetPassword = () => {

    }

    return {
        register,
        login,
        logout,
        resetPassword,
        checkEmailVerification,
        getProfile,
        profile
    }
}
export default useAuth