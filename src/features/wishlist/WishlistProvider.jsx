import { WishlistContext } from './WishlistContext';
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [count, setCount] = useState({ data: { count: 0 } }); // Initialize with the expected structure
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const countWishlist = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setCount({ data: { count: 0 } });
                setLoading(false);
                return;
            }
            const res = await api.get('/wishlist/count', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setCount(res.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching wishlist count:', error);
            setError('Failed to load wishlist count');
            setCount({ data: { count: 0 } }); // Reset count on error
        } finally {
            setLoading(false);
        }
    }, []);

    const getWishlist = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setWishlist([]);
                setLoading(false);
                return;
            }
            const res = await api.get('/wishlist', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setWishlist(res.data.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setError('Failed to load wishlist');
            setWishlist([]); // Reset wishlist on error
        } finally {
            setLoading(false);
        }
    }, []);

    const addToWishlist = useCallback(async (productId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to add items to your wishlist.');
                setLoading(false);
                return;
            }
            const res = await api.post('/wishlist', {
                productId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setWishlist(res.data.data);
            toast.success('Item added to wishlist!');
            countWishlist(); // Update count after adding
            setError(null);
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            setError('Failed to add item to wishlist');
            toast.error(error.response?.data?.message || 'Failed to add item to wishlist');
        } finally {
            setLoading(false);
        }
    }, [countWishlist]);

    const removeFromWishlist = useCallback(async (productId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to remove items from your wishlist.');
                setLoading(false);
                return;
            }
            await api.delete(`/wishlist/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setWishlist(prev => ({
                ...(prev || {}),
                products: Array.isArray(prev?.products)
                    ? prev.products.filter(item => (item._id ?? item.productId) !== productId)
                    : []
            }));
            toast.success('Item removed from wishlist!');
            countWishlist(); // Update count after removing
            setError(null);
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            setError('Failed to remove item from wishlist');
            toast.error(error.response?.data?.message || 'Failed to remove item from wishlist');
        } finally {
            setLoading(false);
        }
    }, [countWishlist]);

    const checkWishlistStatus = useCallback((productId) => {
        const items = wishlist?.products;
        if (!Array.isArray(items)) return false;
        return items.some(item => (item._id ?? item.productId) === productId);
    }, [wishlist]);

    const clearWishlist = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to clear your wishlist.');
                setLoading(false);
                return;
            }
            await api.delete('/wishlist', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setWishlist([]);
            toast.success('Wishlist cleared!');
            countWishlist(); // Update count after clearing
            setError(null);
        } catch (error) {
            console.error('Error clearing wishlist:', error);
            setError('Failed to clear wishlist');
            toast.error(error.response?.data?.message || 'Failed to clear wishlist');
        } finally {
            setLoading(false);
        }
    }, [countWishlist]);

    useEffect(() => {
        countWishlist();
        getWishlist();
    }, [countWishlist, getWishlist]);

    const value = {
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
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
