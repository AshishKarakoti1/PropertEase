import React from 'react'
import My_listings from './My_listings'
import NavBar from '../LandingPage/NavBar'
import styles from './Page.module.css'

const Page = () => {
  return (
    <div className={styles.background}>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Your Listings</h1>
        <My_listings />
      </div>
    </div>
  )
}

export default Page;