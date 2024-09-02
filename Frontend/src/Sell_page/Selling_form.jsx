import React, { useState , useContext } from 'react';
import styles from './Selling_form.module.css';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { handleError , handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Selling_form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        url: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        price: ''
    });

    const navigate = useNavigate();

    const { setData} = useContext(StoreContext);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({ ...formData, [name]:value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        const { firstName, lastName, email, phoneNumber, url, location, bedrooms, bathrooms, area, price } = formData;
    
        try {
            const URL = "http://localhost:9090/sell";
            const user_email = localStorage.getItem('user_email');
            const response = await axios.post(URL, { firstName, lastName, email, user_email, phoneNumber, url, location, bedrooms, bathrooms, area, price }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Response data:', response.data);
    
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
                <Link className={styles.logo} to={'/home'}><IoMdArrowRoundBack className={styles.logo_img} />
                </Link>
               <h1 className={styles.heading}>List your Property</h1>
               </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="firstName">First Name*</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="firstName"
                                placeholder="Enter first name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="lastName">Last Name*</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="lastName"
                                placeholder="Enter last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email*</label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            placeholder="Enter your Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="phoneNumber">Phone Number*</label>
                        <input
                            className={styles.input}
                            type="number"
                            id="phoneNumber"
                            placeholder="Enter your Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="url">Property URL*</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="url"
                            placeholder="Enter property URL"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                        />
                    </div>

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

                    <button type="submit" className={styles.button}>Submit</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Selling_form;
