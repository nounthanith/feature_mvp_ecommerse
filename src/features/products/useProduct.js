import { useState } from "react";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";
const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
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

    return {
        products,
        loading,
        error,
        getProducts,
        getProductById,
        product,
    };
};

export default useProduct
