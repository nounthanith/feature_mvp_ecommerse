import { useState } from "react";
import api from "../../lib/api"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();

    // Check email verification status 2 minutes
    const checkEmailVerification = async (userId, maxAttempts = 200) => {
        return new Promise((resolve) => {
            let attempts = 0;

            const checkInterval = setInterval(async () => {
                try {
                    attempts++;
                    const res = await api.get(`/auth/check-verification/${userId}`);
                    const verified = (res.data?.data?.isEmailVerified ?? res.data?.data?.user?.isEmailVerified) === true;

                    if (verified) {
                        clearInterval(checkInterval);
                        resolve({ isVerified: true, user: res.data?.data });
                    } else if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                        resolve({ isVerified: false, user: null });
                    }
                } catch (error) {
                    // On transient errors, keep polling until maxAttempts is reached
                    if (attempts >= maxAttempts) {
                        clearInterval(checkInterval);
                        resolve({ isVerified: false, user: null });
                    }
                }
            }, 1200); // Check every 1.2 seconds (~6 minutes total)
        });
    };

    const register = async (userData) => {
        try {
            const res = await api.post("/auth/register", userData);

            if (res.data?.data?.user) {
                const { user } = res.data.data;

                if (user.isEmailVerified) {
                    navigate('/login');
                    return res.data;
                }

                // Start polling for verification
                const pollUserId = user?._id ?? user?.id ?? user?.userId;
                const { isVerified } = await checkEmailVerification(pollUserId);

                if (isVerified) {
                    navigate('/login', {
                        state: {
                            message: 'Email verified successfully!',
                            email: user.email
                        }
                    });
                } else {
                    toast('Please verify your email to continue');
                }
            }

            return res.data;
        } catch (error) {
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

    const resendVerification = async (email) => {
        try {
            const res = await api.post("/auth/resend", { email });
            
            return res.data;
        } catch (error) {
            throw error.response?.data || {
                success: false,
                message: error.message || 'Failed to resend verification email'
            };
        }
    };


    return {
        register,
        login,
        logout,
        checkEmailVerification,
        getProfile,
        profile,
        resendVerification
    }
}
export default useAuth