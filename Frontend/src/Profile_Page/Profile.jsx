import React from 'react'

const Profile = () => {
    return (
        <div className='h-[100vh] w-[82%] bg-[#D9D9D9]'>

            <div className='h-[50%] flex items-center pl-24'>
                <div className='bg-black h-[300px] w-[300px] rounded-full'></div>
            </div>

            <div className='h-[50%] w-[100%] flex items-center text-2xl pl-24 font-semibold'>

                <div className='w-[50%] h-[80%] flex flex-col items-start justify-center'>
                    <div className='h-[25%] w-[40%]'>
                        <p className=' w-[100%] border-b-2 border-black pb-3'>Daksh</p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className=' w-[100%] border-b-2 border-black pb-3'>123456789</p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className=' w-[100%] border-b-2 border-black pb-3'>daksh@gmail.com</p>
                    </div>
                </div>

                <div className='w-[50%] h-[80%] flex flex-col items-start mt-[70px]'>
                    <div className='h-[25%] w-[40%]'>
                        <p className=' w-[100%] border-b-2 border-black pb-3'>My Listings : 3</p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className=' w-[100%] border-b-2 border-black pb-3'>My Favorites : 3</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile
