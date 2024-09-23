import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        price: '',
        location: '',
        area: '',
    });

    // Reusable fetch function
    const fetchListings = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:9090/buy');
            setData(response.data.listings || []);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const applyFilters = async () => {
        console.log(filters);   
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:9090/buy', filters);
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
        await fetchListings(); // Reuse fetch function
    };

    const contextValue = {
        data,
        loading,
        error,
        filters,
        setFilters,
        applyFilters,
        clearFilters,
        setLoading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
