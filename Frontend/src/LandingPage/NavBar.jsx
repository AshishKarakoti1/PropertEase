import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

    // Check if current path is /buy, /details/*, /myListings, or /favourites
    const isDetailsPage = location.pathname.startsWith('/details/');
    const backgroundClass = 
        location.pathname === '/buy' || 
        location.pathname === '/myListings' || 
        location.pathname === '/favourites' || 
        isDetailsPage 
        ? styles.bgBlue 
        : '';

    return (
        <div className={`${styles.navbar} ${backgroundClass}`}>
            {/* Container for image and list */}
            <div className={styles.container}>
                {/* Image container */}
                <div className={styles.logo_container}>
                    <div className={styles.logo}>
                        <img src='/logo.png' onClick={() => navigate('/')}></img>
                    </div>
                </div>

                {/* List container */}
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to='/buy' className={styles.navLink}>Buy</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to='/sell' className={styles.navLink}>Sell</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to='/' className={styles.navLink}>Calculate Mortgage</Link>
                    </li>
                </ul>
            </div>

            {/* Second inner div with About Us and button */}
            <div className={styles.rightContainer}>
                <span className={styles.aboutUs} onClick={()=>navigate('/myListings')}>My Listings</span>
                {
                    token ? (
                        <button type="button" className={styles.LogOutBtn} onClick={handleLogout}>
                            Log out
                        </button>
                    ) : (
                        <button type="button" className={styles.LogOutBtn} onClick={() => navigate('/login')}>
                            Log In
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default NavBar;
