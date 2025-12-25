import { useState } from "react";
import api from "../../lib/api";

const useArrival = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [arrivalSoon, setArrivalSoon] = useState([])

    const getArrival = async () => {
        try {
            setLoading(true);
            const response = await api.get('/arrival-soon');
            const data = response.data;
            setArrival(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const getArrivalFeature = async () => {
        try {
            setLoading(true);
            const response = await api.get('/arrival-soon/featured')
            const data = response.data;
            setArrivalSoon(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { arrival, loading, error, getArrival, arrivalSoon, getArrivalFeature };
}

export default useArrival