import React, { useState, useContext } from 'react';
import styles from './Selling_form.module.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Selling_form = () => {
    const [formData, setFormData] = useState({
        images: [],
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        price: ''
    });

    const navigate = useNavigate();
    const { setData } = useContext(StoreContext);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({ ...formData, [name]: files }); // For file input
        } else {
            setFormData({ ...formData, [name]: value }); // For text/number input
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { location, bedrooms, bathrooms, area, price, images } = formData;

        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        const user_email = localStorage.getItem('user_email');

        // Create a FormData object
        const formDataObj = new FormData();
        formDataObj.append('location', location);
        formDataObj.append('bedrooms', bedrooms);
        formDataObj.append('bathrooms', bathrooms);
        formDataObj.append('area', area);
        formDataObj.append('price', price);
        formDataObj.append('token', token);
        formDataObj.append('user_email', user_email);
        console.log(images);
        // Append each image to the FormData object
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formDataObj.append('images', images[i]);
            }
        }

        try {
            const URL = "http://localhost:9090/sell";
            const response = await axios.post(URL, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const { success, updatedListings } = response.data;

            if (success) {
                handleSuccess("Your property has been listed");
                setData(updatedListings); // Assuming updatedListings is the array of updated listings
                setTimeout(() => {
                    navigate('/buy');
                }, 1000);
            } else {
                handleError("Failed to add listing");
            }
        } catch (err) {
            console.error("Submit error:", err);
            handleError("Failed to add listing");
        }
    };

    return (
        <div className={styles.bg}>
            <div className={styles.container}>
                <div className={styles.heading_div}>
                    <Link className={styles.logo} to={'/home'}>
                        <IoMdArrowRoundBack className={styles.logo_img} />
                    </Link>
                    <h1 className={styles.heading}>List your Property</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* File input for multiple images */}

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="location">Location*</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="location"
                            placeholder="Enter location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="bedrooms">Bedrooms*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="bedrooms"
                                placeholder="Enter number of bedrooms"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="bathrooms">Bathrooms*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="bathrooms"
                                placeholder="Enter number of bathrooms"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="area">Area (sqft)*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="area"
                                placeholder="Enter area"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="price">Price*</label>
                            <input
                                className={styles.input}
                                type="number"
                                id="price"
                                placeholder="Enter price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="images">Property Images*</label>
                        <input
                            className={styles.input}
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Selling_form;
