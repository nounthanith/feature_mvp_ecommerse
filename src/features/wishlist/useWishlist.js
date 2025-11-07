import { useState } from "react";
import api from "../../lib/api";
import toast from 'react-hot-toast';

const useWishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getWishlist = async () => {
        try {
            setLoading(true);
            const res = await api.get('/wishlist', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setWishlist(res.data.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setError('Failed to load wishlist');
        } finally {
            setLoading(false);
        }
    }

    const addToWishlist = async () => {

    }

    const countWishlist = async () => {
        try {
            setLoading(true);
            const res = await api.get('/wishlist/count', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setCount(res);
            setError(null);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setError('Failed to load wishlist');
        } finally {
            setLoading(false);
        }
    }

    const checkWishlistStatus = async () => {

    }

    const removeFromWishlist = async () => {

    }

    const clearWishlist = async () => {

    }

    return {
        wishlist,
        count,
        loading,
        error,
        getWishlist,
        addToWishlist,
        countWishlist,
        checkWishlistStatus,
        removeFromWishlist,
        clearWishlist
    }
}

export default useWishlist;