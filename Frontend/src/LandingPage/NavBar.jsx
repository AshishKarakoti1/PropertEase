import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ location }) => {
    const [activeItem, setActiveItem] = useState('/'); // Default active item

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    const backgroundClass = location.pathname === '/buy' ? 'bg-blue-400' : '';

    return (
        <div className={`h-24 flex items-center justify-center pl-9 pr-9 mb-16 ${backgroundClass}`}>
            {/* Container for image and list */}
            <div className='flex items-center justify-between w-3/5'>
                {/* Image container */}
                <div className='flex-shrink-0'>
                    <img
                        src="SmallSquareLogoJpg-removebg-preview.png"
                        alt="Logo"
                        className='h-15'
                    />
                </div>

                {/* List container */}
                <ul className='flex space-x-9'>
                    <li
                        className={`flex items-center ${activeItem === '/buy' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleItemClick('/buy')}
                    >
                        <Link to='/buy' className='no-underline font-bold text-white text-2xl'>Buy</Link>
                    </li>
                    <li
                        className={`flex items-center ${activeItem === '/sell' ? 'border-b-2 border-white pb-2' : ''}`}
                        onClick={() => handleItemClick('/sell')}
                    >
                        <Link to='/' className='no-underline font-bold text-white text-2xl'>Sell</Link>
                    </li>
                    <li
                        className={`flex items-center ${activeItem === '/calculate-mortgage' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleItemClick('/calculate-mortgage')}
                    >
                        <Link to='/' className='no-underline font-bold text-white text-2xl'>Calculate Mortgage</Link>
                    </li>
                </ul>
            </div>

            {/* Second inner div with About Us and button */}
            <div className='flex items-center ml-auto space-x-7'>
                <span className='font-bold text-white text-lg'>About Us</span>
                <button type="button" className={`border-2 p-2 w-22 rounded-lg border-white text-white ${styles.navBtns}`}>
                    <Link to='/login' className='no-underline text-white'>Sign in</Link>
                </button>
            </div>
        </div>
    );
}

export default NavBar;
