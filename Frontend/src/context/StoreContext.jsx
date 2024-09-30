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

    const [myListings, setMyListings] = useState([]);

    const fetchMyListings = async (email) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9090/user/listings?email=${email}`);
            setMyListings(response.data.listings || []);
        } catch (err) {
            setError('Failed to fetch listings.');
            console.error('Error fetching my listings:', err);
        } finally {
            setLoading(false);
        }
    };

    // General fetch function for other listings
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
        setLoading,
        setData,
        myListings,
        fetchMyListings,
        setMyListings,
        fetchListings
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
