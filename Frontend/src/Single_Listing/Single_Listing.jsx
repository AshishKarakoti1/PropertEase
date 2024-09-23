import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Single_Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null); // State to hold listing data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors

    // Fetch listing details
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/buy/${id}`);
            setListing(response.data.listing); // Store the listing details
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    // Display loading or error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Destructure the listing data
    const { location, price, bedrooms, bathrooms, area, images, createdBy } = listing || {};

    return (
        <div className='w-[80vw] border-2 border-red-600 m-auto h-[75vh] flex p-2 justify-center items-center gap-2'>

            {/* Left section: Property Image */}
            <div className='w-[60%] h-[80%] border-2 border-red-600'>
                {/* Conditional rendering to check if images exist */}
                {images && images.length > 0 ? (
                    <img src={images[0]} className='h-[100%] w-[100%]' alt="Property" loading="lazy"/>
                ) : (
                    <p>No image available</p>
                )}
            </div>

            {/* Right section: Property and Seller Details */}
            <div className='w-[50%] h-[80%] border-2 border-red-600 flex flex-col gap-3 justify-center items-center p-3'>

                {/* Property details */}
                <div className='border-2 border-red-600 w-[100%] h-[50%] p-2 flex flex-col'>
                    <p><strong>Location:</strong> {location || 'N/A'}</p>
                    <p><strong>Price:</strong> ${price || 'N/A'}</p>
                    <p><strong>Bedrooms:</strong> {bedrooms || 'N/A'}</p>
                    <p><strong>Bathrooms:</strong> {bathrooms || 'N/A'}</p>
                    <p><strong>Area:</strong> {area || 'N/A'} sq ft</p>
                </div>

                {/* Seller details */}
                <div className='border-2 border-red-600 w-[100%] h-[40%] p-2 flex flex-col justify-start'>
                    <p><strong>Seller Name:</strong> {createdBy?.username || 'N/A'}</p>
                    <p><strong>Contact Number:</strong> {createdBy?.contactNumber || 'N/A'}</p>
                    <p><strong>Email:</strong> {createdBy?.email || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Single_Listing;
