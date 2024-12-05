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
        console.log(filters);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <form onSubmit={handleSubmit} className="sticky top-10 bg-gray-700 h-[80vh] flex flex-col gap-4 w-[18vw] rounded p-4">
            <div>
                <label className='text-white' htmlFor="price">Max Price</label>
                <input
                    type="text"
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
                <label className='text-white' htmlFor="area">Max Area</label>
                <input
                    type="number"
                    name="area"
                    value={filters.area || ''}
                    onChange={handleChange}
                    className="rounded p-1"
                />
            </div>
            <div>
                <label className='text-white' htmlFor="area">Bedrooms</label>
                <input
                    type="number"
                    name="bedrooms"
                    value={filters.bedrooms || ''}
                    onChange={handleChange}
                    className="rounded p-1"
                />
            </div>
            <div>
                <label className='text-white' htmlFor="area">Bathrooms</label>
                <input
                    type="number"
                    name="bathrooms"
                    value={filters.bathrooms || ''}
                    onChange={handleChange}
                    className="rounded p-1"
                />
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="category" className='text-white'>Category :</label>
                <select
                    id="category"
                    name="category" // Bind the name to match the filters state property
                    value={filters.category || ''} // Bind the value to filters.category
                    onChange={handleChange} // Use the shared handleChange function
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="">All</option> {/* Empty value for 'All' */}
                    <option value="buying">Buying</option>
                    <option value="renting">Renting</option>
                </select>
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
