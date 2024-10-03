import React from 'react'
import { useNavigate } from 'react-router-dom'

const Side_Bar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

  return (
    <div className='bg-[#212121] h-[100vh] w-[18%] flex flex-col pt-10 justify-between'>

        <div className='flex flex-col h-[40%] gap-5 px-5 text-2xl text-white'>
            <div className='h-[25%] w-[80%] border-b-2 pl-3' onClick={()=>navigate('/')}>
                <p className='h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 cursor-pointer'>Home</p>
            </div>
            <div className='h-[25%] w-[80%] border-b-2 pl-3' onClick={()=>navigate('/profile')}>
                <p className='h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 cursor-pointer'>Profile</p>
            </div>
            <div className='h-[25%] w-[80%] border-b-2 pl-3' onClick={()=>navigate('/myListings')}>
                <p className='h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 cursor-pointer'>My Listings</p>
            </div>
            <div className='h-[25%] w-[80%] pl-3' onClick={()=>navigate('/myFavorites')}>
                <p className='h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 cursor-pointer'>My Favorites</p>
            </div>
        </div>

        <div className='self-center w-[100%] h-16 flex justify-center' onClick={()=>handleLogout()}>
            <button className='text-white bg-red-600 w-[100%] h-[100%] flex justify-center items-center text-2xl hover:bg-red-700 transition-all duration-150'>Log out</button>
        </div>

    </div>
  )
}

export default Side_Bar
