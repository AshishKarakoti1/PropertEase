import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Buying_page/Loading'

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
        return <div className="flex items-center justify-center h-screen">
            <div className=''>
                <Loading />
            </div>
        </div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Destructure the listing data
    const { location, price, bedrooms, bathrooms, area, images, createdBy } = listing || {};

    return (
        <div className='w-[90vw] m-auto h-[75vh] flex justify-evenly items-center rounded-3xl bg-slate-200'>

            {/* Left section: Property Image */}
            <div className='w-[45%] h-[90%]'>
                {/* Conditional rendering to check if images exist */}
                {images && images.length > 0 ? (
                    <img src={images[0]} className='h-[100%] w-[100%] rounded-3xl' alt="Property" />
                ) : (
                    <p>No image available</p>
                )}
            </div>

            {/* Right section: Property and Seller Details */}
            <div className='w-[40%] h-[90%] flex flex-col items-center rounded-3xl bg-white text-xl justify-evenly gap-3'>

                {/* Property details */}
                <div className='w-[100%] h-[40%] px-4 flex flex-col'>
                    <h3 className="text-decoration-line: underline">Property Details</h3>
                    <p><strong>Location:</strong> {location || 'N/A'}</p>
                    <p><strong>Price:</strong> ${price || 'N/A'}</p>
                    <p><strong>Bedrooms:</strong> {bedrooms || 'N/A'}</p>
                    <p><strong>Bathrooms:</strong> {bathrooms || 'N/A'}</p>
                    <p><strong>Area:</strong> {area || 'N/A'} sq ft</p>
                </div>

                {/* Seller details */}
                <div className='w-[100%] h-[40%] px-4 py-4 flex flex-col justify-start'>
                    <h3 className="text-decoration-line: underline">Seller Details</h3>
                    <p><strong>Seller Name:</strong> {createdBy?.username || 'N/A'}</p>
                    <p><strong>Contact Number:</strong> {createdBy?.contactNumber || 'N/A'}</p>
                    <p><strong>Email:</strong> {createdBy?.email || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Single_Listing;
