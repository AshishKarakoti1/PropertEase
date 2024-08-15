import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import styles from './postlist.module.css';

const PostList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/buy');
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])


    if (loading) {
        return <div> please wait while we get the best deals for you </div>
    }
    if (error) {
        return <div> error fetching data </div>
    }
    return (
        <div className={styles.postlist}>
            {data.map((listing) => {
                return <Post key={listing.id} url={listing.url} location={listing.location} bedrooms={listing.bedrooms} bathrooms={listing.bathrooms} area={listing.area} price={listing.price} />
            })}
        </div>
    )
}

export default PostList
