import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import Post from './Post';
import Loading from './Loading';
import Error from './Error';
import styles from './postlist.module.css';

const PostList = () => {
    const { data, loading, error, fetchListings } = useContext(StoreContext);
    useEffect(() => {
        fetchListings();
    }, []);

    if (loading) {
        return <div className='flex items-center justify-center'><Loading /></div>;
    }

    if (error) {
        return <Error />;
    }

    if (data.length == 0) {
        return <div className='h-[40rem] w-[70rem] flex items-center justify-center'><p className='font-bold text-[3rem] text-blue-400'>No listings Found</p></div>
    }

    return (
        <div className={styles.postlist}>
            {data.map((listing) => (
                <Post
                    key={listing._id}
                    id={listing._id}
                    url={listing.images[4]}
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

export default PostList;
