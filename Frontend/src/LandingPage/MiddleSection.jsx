import React from 'react';
import styles from './Middle.module.css';

const MiddleSection = () => {
    return (
        <div className='flex justify-center p-8 gap-5 items-start'>
            <div className='flex-1 max-w-3xl'>
                <h1 className='text-6xl font-bold leading-tight mb-4 text-white'>
                    Buying & Selling <br /> properties made easy
                </h1>
                <p className='mt-2 text-white text-xl'>
                    Now, everything you need to successfully buy or sell your home is on <br /> one platform.
                </p>
            </div>

            <div className='flex flex-col justify-between items-center space-y-4 h-80 p-5 bg-white rounded-xl w-80'>
                <h3 className='text-xl font-bold'>How can we help you?</h3>
                <div className=' flex flex-col gap-2'>
                    <button
                        type="button"
                        className={`font-bold border-2 border-blue-400 text-blue-400 rounded-lg p-2 w-72 ${styles.navBtns}`}
                    >
                        I am Buying
                    </button>
                    <button
                        type="button"
                        className={`font-bold border-2 border-blue-400 text-blue-400 rounded-lg p-2 w-72 ${styles.navBtns}`}
                    >
                        I am Selling
                    </button>
                    <button
                        type="button"
                        className={`font-bold border-2 border-blue-400 text-blue-400 rounded-lg p-2 w-72 ${styles.navBtns}`}
                    >
                        Calculate Mortage
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiddleSection;
