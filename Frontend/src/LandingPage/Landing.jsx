import React from 'react'
import MiddleSection from './MiddleSection'
import NavBar from './NavBar'
import Services from './Services'
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <div className={styles.container}> 
        <div className={styles.hero_section}>
        <NavBar />
        <MiddleSection />
        </div>
        <Services/>
    </div>
  )
}

export default Landing