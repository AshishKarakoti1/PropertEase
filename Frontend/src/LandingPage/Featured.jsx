import React from 'react';
import Post from '../Buying_page/Post';
import { useNavigate } from 'react-router-dom';

const Featured = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col mx-auto h-[75vh] w-[100%] items-start bg-[#e2e2e2] pt-[3rem]'>
            <div className='w-[85%] h-[10%] flex items-center justify-between mx-auto'>
                <h1 className='font-extrabold text-[3.72rem] text-[#5f5f5f]'>Featured Listings</h1>
                <button className='w-[10rem] h-[3rem] bg-[#4A73A1] text-white rounded-lg' onClick={()=>{navigate('/buy')}}>Show More</button>
            </div>
            <div className='w-[100%] h-[90%] flex justify-evenly items-center mx-auto'>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default Featured