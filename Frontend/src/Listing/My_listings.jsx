import React, { useContext, useEffect } from 'react';
import Listing from './Listing';
import styles from './My_listings.module.css';
import { StoreContext } from '../context/StoreContext';

const My_listings = () => {
    const { myListings, fetchMyListings } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');

    useEffect(() => {
        fetchMyListings(email);
    }, [fetchMyListings]);

    return (
        <div className={styles.container}>
            {myListings.map((listing) => (
                <Listing
                    key={listing._id}
                    id={listing._id}
                    url={listing.images[0]}
                    location={listing.location}
                    bedrooms={listing.bedrooms}
                    bathrooms={listing.bathrooms}
                    area={listing.area}
                    price={listing.price}
                />
            ))}
        </div>
    );
}

export default My_listings;
