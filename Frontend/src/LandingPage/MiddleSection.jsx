import React from 'react';
import styles from './Middle.module.css';
import Typed from 'typed.js';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MiddleSection = () => {

    const el = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Buying', 'Selling'],  // Text strings to be typed
            typeSpeed: 100,            // Speed of typing in milliseconds
            backSpeed: 100,            // Speed of backspacing
            loop: true,               // Loop the typing effect
            loopCount: Infinity,      // Repeat the loop indefinitely
            startDelay: 500,          // Delay before typing starts
            backDelay: 500,           // Delay before backspacing
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>
                    <span ref={el}></span> <br /> properties made easy
                </h1>
                <p className={styles.subText}>
                    Now, everything you need to successfully buy or sell your home is on <br /> one platform.
                </p>
            </div>

            <div className={styles.actionContainer}>
                <h3 className={styles.helpText}>How can we help you?</h3>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        className={`${styles.navBtns}`}
                        onClick={() => navigate('/buy')}
                    >
                        I am Buying
                    </button>
                    <button
                        type="button"
                        className={`${styles.navBtns}`}
                    >
                        I am Selling
                    </button>
                    <button
                        type="button"
                        className={`${styles.navBtns}`}
                    >
                        Calculate Mortage
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiddleSection;
