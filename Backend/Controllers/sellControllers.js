const mongoose = require('mongoose');
const listingModel = require('../Models/listingModel');
const User = require('../Models/userModel'); // Assuming you have a User model

const createListing = async (req, res) => {
    const { url, location, bedrooms, bathrooms, area, price, user_email } = req.body;

    if (!url || !location || !bedrooms || !bathrooms || !area || !price || !user_email) {
        return res.json({ success: false, message: "Incomplete details" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: user_email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Create a new listing
        const newListing = new listingModel({
            location,
            bedrooms,
            bathrooms,
            area,
            price,
            images: [url],
            createdBy: user._id // Use the user's ObjectId
        });

        await newListing.save();

        const updatedListings = await listingModel.find({});

        console.log({ success: true, message: "Listing added successfully", updatedListings });
        return res.json({ success: true, message: "Listing added successfully", updatedListings });
    } catch (err) {
        console.error("Error adding listing:", err);
        return res.json({ success: false, message: "Listing not added" });
    }
};

module.exports = { createListing };
