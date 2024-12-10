import React, { useState, useEffect } from 'react';
import Post from '../Buying_page/Post';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Featured = () => {

    const navigate = useNavigate();
    const [featured, setFeatured] = useState([]);
    const [error, setError] = useState(false);

    const fetchListings = async () => {
        try {
            const response = await axios.get('http://localhost:9090/buy/featured');
            console.log(response.data);
            const { success, listings } = response.data;
            if (success) {
                setFeatured(listings);
            }
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        fetchListings();
    }, []);

    if (error) {
        return (
            <div className='flex flex-col mx-auto h-[75vh] w-[100%] items-start bg-[#e2e2e2] pt-[3rem]'>
                error fetching
            </div>
        )
    }

    return (
        <div className='flex flex-col mx-auto h-[75vh] w-[100%] items-start bg-[#e2e2e2] pt-[3rem]'>
            <div className='w-[85%] h-[10%] flex items-center justify-between mx-auto'>
                <h1 className='font-extrabold text-[3.72rem] text-[#5f5f5f]'>Featured Listings</h1>
                <button className='w-[10rem] h-[3rem] bg-[#4A73A1] text-white rounded-lg' onClick={() => { navigate('/buy') }}>Show More</button>
            </div>
            <div className='w-[100%] h-[90%] flex justify-evenly items-center mx-auto'>
                {featured.length > 0 ?
                    featured.map((listing) => {
                        return <Post
                            key={listing._id}
                            id={listing._id}
                            url={listing.images[4]}
                            location={listing.location}
                            bedrooms={listing.bedrooms}
                            bathrooms={listing.bathrooms}
                            area={listing.area}
                            price={listing.price}
                            category={listing.category}
                        />
                    }) : <div className='w-[100%] h-[90%] flex justify-evenly items-center mx-auto text-blue-500 font-bold text-[3rem]'>No featured Listings</div>
                }
            </div>
        </div>
    )
}

export default Featured