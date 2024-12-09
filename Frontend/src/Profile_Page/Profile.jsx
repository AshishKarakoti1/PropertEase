import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
    const { user, getUserData, setUser } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token');

    const [selectedFile, setSelectedFile] = useState(null);
    const [userDetails, setUserDetails] = useState({
        username: '',
        contactNumber: ''
    })
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
        console.log(userDetails)
    }

    useEffect(() => {
        if (token) {
            getUserData(email);
        }
    }, [token]);


    const handleUpload = async () => {
        if (!selectedFile) {
            handleError("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('email', email);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        try {
            const response = await axios.post('http://localhost:9090/user/setPhoto', formData);

            if (response.data.success) {
                console.log(response.data.profilePhotoUrl);
                setUser(response.data.updatedUser)
                handleSuccess('profile photo updated');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            handleError('Error uploading photo');
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:9090/user/?email=${email}`,
                {
                    username: userDetails.username,
                    contactNumber: userDetails.contactNumber,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.success) {
                setUser(response.data.user);
                handleSuccess(response.data.message || 'User details updated successfully');
            } else {
                handleError(response.data.message || 'Failed to update user details');
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Error updating details';
            handleError(errorMessage);
        }
    };




    return (
        <div className='h-[100vh] flex-grow bg-indigo-100'>
            <div className='h-[50%] flex items-center pl-24'>
                <img className='h-[300px] w-[300px] rounded-full' src={user?.URL || '/no_photo.webp'} />
                <div className='flex flex-col'>
                    <input type="file" className='ml-5 w-[60%] hover:cursor-pointer' onChange={handleFileChange} />
                    <button className='bg-orange-400 w-36 ml-5 mt-3' onClick={() => handleUpload()}>Change photo</button>
                </div>
            </div>

            <div className='h-[50%] w-[100%] flex items-center text-2xl pl-24 font-semibold'>
                <div className='w-[50%] h-[80%] flex flex-col items-start justify-center'>
                    <div className='h-[25%] w-[40%]'>
                        <input className='w-[100%] border border-black h-[3.5rem] rounded-sm pt- pl-2 bg-gray-300 placeholder:text-gray-400 outline-none' placeholder={user?.username || "Username not available"} name='username' onChange={handleChange}></input>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <input className='w-[100%] border border-black h-[3.5rem] rounded-sm pt- pl-2 bg-gray-300 placeholder:text-gray-400 outline-none' placeholder={user?.contactNumber || "Contact not available"} name='contactNumber' onChange={handleChange}></input>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>{user?.email || "Email not available"}</p>
                    </div>
                    <button className='h-[3rem] w-[10rem] text-white rounded-md bg-orange-500' onClick={handleUpdate}>Save</button>
                </div>

                <div className='w-[50%] h-[80%] flex flex-col items-start mt-[70px]'>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>
                            My Listings: {user?.listings?.length || 0}
                        </p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>
                            My Favorites: {user?.favorites?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
