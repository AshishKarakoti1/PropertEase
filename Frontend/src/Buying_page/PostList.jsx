import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import Post from './Post';
import Loading from './Loading';
import Error from './Error';
import styles from './postlist.module.css';

const PostList = () => {
    const { data, loading, error } = useContext(StoreContext);

    if (loading) {
        return <div className='flex items-center justify-center'><Loading /></div>;
    }

    if (error) {
        return <Error />;
    }

    return (
        <div className={styles.postlist}>
            {data.map((listing) => (
                <Post
                    key={listing._id}
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

export default PostList;
