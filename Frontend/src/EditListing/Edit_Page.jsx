import React from 'react';
import NavBar from '../LandingPage/NavBar';
import Edit from './Edit';
import { ToastContainer } from 'react-toastify';

const Edit_Page = () => {
    return (
        <>
            <NavBar />
            <Edit />
            <ToastContainer />
        </>
    )
}

export default Edit_Page
