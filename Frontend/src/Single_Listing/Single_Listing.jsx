import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Buying_page/Loading'
import { FaRegBookmark } from "react-icons/fa";
import { SlTag } from "react-icons/sl";
import { IoMdContact } from "react-icons/io";
import { CiPhone } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { SlSizeFullscreen } from "react-icons/sl";
import { StoreContext } from "../context/StoreContext";

const Single_Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(4);

    const email = localStorage.getItem('user_email');

    const { addToFavorites, userEmail, setUserEmail } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleAddToFavorites = () => {
        console.log(`function called`, email, id);
        addToFavorites(email, id);
    }

    const handleContact = () => {
        setUserEmail(listing.createdBy.email);
        navigate('/contact');
    }

    // Fetch listing details
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/buy/${id}`);
            setListing(response.data.listing);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const changeIndex = (idx) => {
        setIndex(idx);
    }

    useEffect(() => {
        fetchDetails();
    }, [id]);

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

    const { location, price, bedrooms, bathrooms, area, images, createdBy, category } = listing || {};

    return (
        <div className='w-[90vw] mx-auto mt-[2.8rem] h-[75vh] flex justify-center items-center bg-slate-200'>

            {/* Left section: Property Image */}
            <div className='w-[45%] h-[100%] flex flex-col gap-2'>
                <div className="h-[75%]">
                    <img src={images[index]} className='h-[100%] w-[100%]' alt="Property" />
                </div>
                <div className="h-[23.6%] flex justify-between bg-white">
                    <div className={`w-[19%] h-[100%] ${index == 0 && 'bg-gray-100'}`} onClick={() => changeIndex(0)}>
                        <img src={images[0]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] ${index == 1 && 'bg-gray-100'}`} onClick={() => changeIndex(1)}>
                        <img src={images[1]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] ${index == 2 && 'bg-gray-100'}`} onClick={() => changeIndex(2)}>
                        <img src={images[2]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] ${index == 3 && 'bg-gray-100'}`} onClick={() => changeIndex(3)}>
                        <img src={images[3]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] ${index == 4 && 'bg-gray-100'}`} onClick={() => changeIndex(4)}>
                        <img src={images[4]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                </div>
            </div>

            {/* Right section: Property and Seller Details */}
            <div className='w-[40%] h-[100%] flex flex-col px-8 bg-white text-xl gap-6 justify-evenly'>

                {/* div-1 */}
                <div className="flex flex-col gap-2">
                    <FaRegBookmark size={40} onClick={() => handleAddToFavorites()} className="cursor-pointer active:scale-75 transition duration-100" />
                    <h1 className="text-[80px]">{location || 'N/A'}</h1>
                    <div className="flex gap-5">
                        <span className="flex w-[115px] ml-2 px-1 rounded-sm bg-slate-200 gap-2 items-center justify-start"><SlTag /><span>${price || 'N/A'}</span></span>
                        <span>category: {category || 'N/A'}</span>
                    </div>
                </div>

                {/* div-2 */}
                <div className="flex flex-col ml-2 gap-8">
                    <div className="flex items-center gap-16">
                        <div className="flex flex-col items-start">
                            <p className="m-0">BEDROOM</p>
                            <div className="flex gap-2 items-center justify-start"><IoBedOutline /><span>{bedrooms || 'N/A'}</span></div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="m-0">BATHROOM</p>
                            <div className="flex gap-2 items-center justify-start"><TbBath /><span>{bathrooms || 'N/A'}</span></div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="m-0">AREA</p>
                            <div className="flex gap-2 items-center justify-start"><SlSizeFullscreen /><span>{area || 'N/A'} sq m</span></div>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">SELLER DETAILS</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex w-[200px] gap-2 items-center justify-start"><IoMdContact />{createdBy?.username || 'N/A'}</div>
                            <div className="flex w-[200px] gap-2 items-center justify-start"><CiPhone />{createdBy?.contactNumber || 'N/A'}</div>
                            <div className="flex w-[200px] gap-2 items-center justify-start"><img className="h-[20px]" src="/mail-icon.png" /> {createdBy?.email || 'N/A'}</div>
                        </div>
                    </div>

                </div>

                <div className="ml-2">
                    <button className="bg-slate-300 px-5 py-2 rounded-sm active:bg-slate-400" onClick={handleContact}>CONTACT OWNER</button>
                </div>

            </div>
        </div>
    );
}

export default Single_Listing;
