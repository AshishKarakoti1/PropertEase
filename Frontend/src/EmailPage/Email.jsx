import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "../context/StoreContext";
import { handleSuccess, handleError } from '../utils';

const Email = () => {

    const [emailDetails, setEmailDetails] = useState({
        subject: '',
        text: ''
    })
    const { userEmail } = useContext(StoreContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailDetails({ ...emailDetails, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/contact/sendEmail', {
                to: userEmail,
                subject: emailDetails.subject,
                text: emailDetails.text
            })
            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                // Clear form after success
                setEmailDetails({ subject: '', text: '' });
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError("failed to send email");
        }
    }

    return (
        <form className='w-[50rem] h-[33rem] mx-auto mt-[4rem] flex flex-col gap-3 border-2 border-red-500' onSubmit={handleSubmit}>

            <p className='font-semibold text-[1.1rem]'>To: {userEmail}</p>
            <div className='w-[95%] h-[20%] border-2 border-green-400 flex flex-col gap-3'>
                <label htmlFor="">What its about</label>
                <input
                    type="text"
                    className='w-[90%] h-[3rem] bg-gray-300 rounded-sm outline-none pl-2'
                    name='subject'
                    onChange={handleChange}
                    placeholder='subject'
                    value={emailDetails.subject} // Controlled input
                />
            </div>
            <div className='w-[95%] h-[55%] border-2 mt-3 border-green-400 flex flex-col gap-3'>
                <label htmlFor="">Enter Message</label>
                <textarea
                    id=""
                    className='h-[85%] w-[90%] bg-gray-300 rounded-sm resize-none outline-none pl-2 pt-2'
                    name='text'
                    onChange={handleChange}
                    placeholder='message'
                    value={emailDetails.text} // Controlled input
                ></textarea>
            </div>

            <button type='submit' className='h-[3rem] w-[10rem] bg-blue-400'>Send</button>

        </form>
    )
}

export default Email;
