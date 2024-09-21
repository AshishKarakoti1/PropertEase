import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

    const backgroundClass = location.pathname === '/buy' ? styles.bgBlue : '';

    return (
        <div className={`${styles.navbar} ${backgroundClass}`}>
            {/* Container for image and list */}
            <div className={styles.container}>
                {/* Image container */}
                <div className={styles.logo_container}>
                    <div className={styles.logo}>
                        <img src='logo.png' onClick={() => navigate('/')}></img>
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
                <span className={styles.aboutUs}>About Us</span>
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
