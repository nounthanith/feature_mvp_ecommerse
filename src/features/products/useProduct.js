import { useState } from "react";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
const useProduct = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0, limit: 0 });
    const navigate = useNavigate();

    const getProducts = async (page = 1) => {
        const start = Date.now();
        setLoading(true);
        try {
            const response = await api.get(`/products`, { params: { page } });
            const body = response?.data ?? {};

            // Extract items from common shapes
            let items = [];
            if (Array.isArray(body?.data)) items = body.data;
            else if (Array.isArray(body)) items = body;
            else if (Array.isArray(body?.data?.docs)) items = body.data.docs;
            else if (Array.isArray(body?.data?.items)) items = body.data.items;
            else if (Array.isArray(body?.docs)) items = body.docs;
            else if (Array.isArray(body?.items)) items = body.items;

            // For classic pagination: always replace list with current page items
            setProducts(items);

            // Extract pagination from common locations
            const meta = body?.pagination || body?.meta || body?.data || body;
            const currentPage = meta?.page ?? body?.page ?? page ?? 1;
            const limit = meta?.limit ?? body?.limit ?? items.length ?? 0;
            const totalItems = meta?.total ?? body?.total ?? meta?.totalDocs ?? 0;
            let totalPages = meta?.totalPages ?? body?.totalPages;

            if (!totalPages && totalItems && limit) {
                totalPages = Math.max(1, Math.ceil(totalItems / limit));
            }

            setPagination({ page: currentPage, totalPages: totalPages || 1, totalItems: totalItems || 0, limit: limit || 0 });
        } catch (error) {
            setError(error);
        } finally {
            const elapsed = Date.now() - start;
            const remaining = 1000 - elapsed;
            if (remaining > 0) {
                await new Promise((resolve) => setTimeout(resolve, remaining));
            }
            setLoading(false);
        }
    };

    const getProductById = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data.data);
            navigate(`/product/${id}`);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getProductsByCategory = async (categoryId) => {
        if (!categoryId) return;

        setLoading(true);
        try {
            const response = await api.get(`/products?category=${categoryId}`);
            setProducts(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getRelatedProducts = async (productId) => {
        if (!productId) return;

        setLoading(true);
        try {
            const response = await api.get(`/products/${productId}/related`);
            setRelatedProducts(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getFeaturedProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get("/products/featured");
            setFeaturedProducts(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };




    return {
        products,
        loading,
        error,
        getProducts,
        getProductById,
        product,
        getProductsByCategory,
        featuredProducts,
        getFeaturedProducts,
        getRelatedProducts,
        relatedProducts,
        pagination,
    };
};

export default useProduct
