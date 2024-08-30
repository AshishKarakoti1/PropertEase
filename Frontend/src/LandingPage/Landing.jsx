import React from 'react'
import MiddleSection from './MiddleSection'
import NavBar from './NavBar'
import Services from './Services'
import styles from './Landing.module.css'
import Footer from './Footer'

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero_section}>
        <NavBar />
        <MiddleSection />
      </div>
      <Services />
      <Footer />
    </div>
  )
}

export default Landing