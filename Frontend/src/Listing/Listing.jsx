import React from 'react'
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Listing = ({ id, url, location, bedrooms, bathrooms, area, price }) => {

    const { setMyListings } = useContext(StoreContext);

    const handleDeleteListing = async () => {
    try {
        const email = localStorage.getItem('user_email');
        const url = `http://localhost:9090/buy/${id}`;  // Correctly format the URL to include the ID
        const response = await axios.delete(url, {
            data: { email },  // Pass the email in the request body
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setMyListings(response.data.updatedListings);
    } catch (err) {
        console.log("error deleting listing", err);
    }
};


    return (
    <div 
            className="w-[600px] h-[400px] rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer" 
        >
            <img className="w-full h-[60%] object-cover" src={url}alt="Property Image" loading='lazy'/>
            <div className="px-6 py-4 bg-white">
                <div className="">
                    <h2 className="text-3xl font-bold text-blue-800">{location}</h2>
                </div>
                <div className="flex justify-between gap-10">
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/windows/24/null/bedroom.png" />
                        <p className="ml-2 text-lg font-medium text-gray-800">{`${bedrooms} bedrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" />
                        <p className="ml-2 text-lg font-medium text-gray-800">{`${bathrooms} bathrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" />
                        <p className="ml-2 text-lg font-medium text-gray-800">{`${area} sq m`}</p>
                    </div>
                </div>
                <div className="mt-2 flex justify-between">
                    <p className="text-2xl font-extrabold text-blue-800">{`${price} $ `}</p>
                    <img className='h-8 hover:scale-110 duration-200' src='delete-button.png' onClick={()=>handleDeleteListing()}></img>
                </div>
            </div>
        </div>
    )
}

export default Listing