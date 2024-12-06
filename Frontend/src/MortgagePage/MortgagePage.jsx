import React from 'react';
import NavBar from '../LandingPage/NavBar';
import MortgageCalculator from './MortgageCalculator';
import { ToastContainer } from 'react-toastify';

const MortgagePage = () => {
    return (
        <>
            <NavBar />
            <MortgageCalculator />
            <ToastContainer />
        </>
    )
}

export default MortgagePage
