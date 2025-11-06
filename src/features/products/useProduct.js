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
    const navigate = useNavigate();

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get("/products");
            setProducts(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
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
    };
};

export default useProduct
