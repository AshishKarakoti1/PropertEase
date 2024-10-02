import React from 'react'
import styles from './FavoritePage.module.css'
import NavBar from '../LandingPage/NavBar'
import MyFavorites from './MyFavorites'
import { ToastContainer } from 'react-toastify'

const FavoritePage = () => {
    return (
        <div className={styles.background}>
            <NavBar />
            <div className={styles.container}>
                <h1 className={styles.heading}>Your Favorites</h1>
                <MyFavorites />
            </div>
            <ToastContainer/>
        </div>
    )
}

export default FavoritePage
