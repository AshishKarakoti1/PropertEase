import React from 'react';
import Email from './Email';
import NavBar from '../LandingPage/NavBar';
import { ToastContainer } from 'react-toastify';

const Email_Page = () => {
    return (
        <>
            <NavBar />
            <Email />
            <ToastContainer />
        </>
    )
}

export default Email_Page
