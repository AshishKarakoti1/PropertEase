import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Filters = () => {
    const { filters, setFilters, applyFilters, clearFilters } = useContext(StoreContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <form onSubmit={handleSubmit} className="sticky top-10 bg-gray-700 h-[75vh] flex flex-col gap-4 w-[18vw] rounded p-4">
            <div>
                <label className='text-white' htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    value={filters.price || ''} // Ensure it works for falsy values
                    onChange={handleChange}
                    className="rounded p-1"
                />
            </div>
            <div>
                <label className='text-white' htmlFor="location">Location</label>
                <input
                    type="text"
                    name="location"
                    value={filters.location || ''}
                    onChange={handleChange}
                    className="rounded p-1"
                />
            </div>
            <div>
                <label className='text-white' htmlFor="area">Area</label>
                <input
                    type="number"
                    name="area"
                    value={filters.area || ''}
                    onChange={handleChange}
                    className="rounded p-1"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-200"
            >
                Filter
            </button>
            <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-500 text-white px-2 py-2 rounded  hover:bg-gray-600 duration-200"
            >
                Clear Filters
            </button>
        </form>
    );
};

export default Filters;
