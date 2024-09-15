import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        price: '',
        location: '',
        area: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9090/buy');
                // Ensure the response contains an array
                setData(response.data.listings || []);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const applyFilters = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:9090/buy', filters);
            // Ensure the response contains an array
            setData(response.data.filteredListings || []);
            console.log('Filtered Data:', response.data.filteredListings);
        } catch (err) {
            setError('Error filtering data.');
            console.error('Error filtering data:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = async () => {
        setFilters({
            price: '',
            location: '',
            area: '',
        });
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:9090/buy');
            // Ensure the response contains an array
            setData(response.data.listings || []);
            console.log('All Listings:', response.data.listings);
        } catch (err) {
            setError('Error fetching all listings.');
            console.error('Error fetching all listings:', err);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        data,
        loading,
        error,
        filters,
        setFilters,
        applyFilters,
        clearFilters,
        setData,
        setError,
        setLoading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
