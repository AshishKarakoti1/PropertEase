const userModel = require('../Models/userModel');
const listingModel = require('../Models/listingModel');
const mongoose = require('mongoose');

async function getMyListings(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email }).populate('listings');

        if (!user) {
            return res.status(404).json({ success:false , message: 'User not found' });
        }

        return res.status(200).json({ success:true , listings: user.listings });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success:false , message: 'Server error' });
    }
}

async function getFavourites(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email }).populate('favorites');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, favorites: user.favorites });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}


module.exports = { getMyListings , getFavourites };
