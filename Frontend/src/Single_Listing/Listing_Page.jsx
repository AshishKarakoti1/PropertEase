import React from 'react'
import NavBar from '../LandingPage/NavBar'
import Single_Listing from './Single_Listing'

const Listing_Page = () => {
    return (
        <div className='h-[100vh] bg-slate-200'>
            <NavBar/>
            <Single_Listing/>
        </div>
    )
}

export default Listing_Page
