import { useEffect, useState, useCallback } from "react";
import api from "../../lib/api";

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    const getCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const getCategoryProducts = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/categories/${id}/products`);
            setProducts(response.data.data.products);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);



    useEffect(() => {
        getCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        products,
        getCategories,
        getCategoryProducts
    }
}

export default useCategory
