import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';
import api from "../../lib/api";
import toast from 'react-hot-toast';

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        items: [],
        totalItems: 0,
        subtotal: 0,
        totalPrice: 0,
        tax: 0,
        shippingCost: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCart();
    }, []);

    const addToCart = async (productId, quantity = 1) => {
        try {
            setLoading(true);
            const res = await api.post('/cart/items',
                { productId, quantity },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            await getCart();
            toast.success('Item added to cart');
            return res.data;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setError('Failed to add item to cart');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            if (!itemId) {
                throw new Error('No item ID provided for removal');
            }

            setLoading(true);
            const res = await api.delete(`/cart/items/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            await getCart();
            toast.success('Item removed from cart');
            return res.data;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Failed to remove item from cart');
            toast.error('Failed to remove item from cart');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await api.delete('/cart', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setCart({
                items: [],
                totalItems: 0,
                subtotal: 0,
                totalPrice: 0,
                tax: 0,
                shippingCost: 0
            });
            setError(null);
        } catch (error) {
            console.error('Error clearing cart:', error);
            setError('Failed to clear cart');
            toast.error('Failed to clear cart');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getCart = async () => {
        try {
            setLoading(true);
            const res = await api.get('/cart', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setCart(prev => ({
                ...prev,
                ...res.data.data,
                items: Array.isArray(res.data.data?.items) ? res.data.data.items : []
            }));
            setError(null);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load cart');
            toast.error('Failed to load cart');
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            setLoading(true);
            const res = await api.put(`/cart/items/${productId}`, { quantity }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            await getCart();
            toast.success('Cart item updated');
            return res.data;
        } catch (error) {
            console.error('Error updating cart item:', error);
            setError('Failed to update cart item');
            toast.error('Failed to update cart item');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            error,
            addToCart,
            removeFromCart,
            clearCart,
            getCart,
            updateCartItem
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
