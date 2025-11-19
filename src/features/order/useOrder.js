import { useState } from 'react';
import api from '../../lib/api';
import { toast } from 'react-hot-toast';

const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const token = localStorage.getItem('token');

    const getOrders = async (page = 1, limit = 6) => {
        try {
            setLoading(true);
            const res = await api.get(`/orders/my-orders?page=${page} &limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setOrders(res.data);
            setPagination(res.data.pagination);
            setError(null);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const CreateOrder = async (order) => {
        try {
            setLoading(true);
            const res = await api.post('/orders', order, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setOrders(res.data);
            setError(null);
            toast.success('Order created successfully');
            return res.data;
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Failed to create order');
            toast.error('Failed to create order');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        orders,
        loading,
        error,
        pagination,
        getOrders,
        CreateOrder
    };
}

export default useOrder
