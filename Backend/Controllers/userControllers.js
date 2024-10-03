const userModel = require('../Models/userModel');
const listingModel = require('../Models/listingModel');
const mongoose = require('mongoose');

async function getMyListings(req, res) {
    try {
        const { email } = req.query;
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

async function addToFavorites(req, res) {
    try {
        const { email, id } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.favorites.includes(id)) {
            user.favorites.push(id);
            await user.save();
        }

        await user.populate('favorites');

        return res.status(200).json({ 
            success: true, 
            favorites: user.favorites
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function deleteFromFavorites(req, res) {
    try {
        const { email, id } = req.query; 
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updated_favorites = user.favorites.filter(ID => ID != id);
        user.favorites = updated_favorites;
        await user.save();
        await user.populate('favorites');

        return res.status(200).json({ 
            success: true, 
            favorites: user.favorites
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}



async function getFavorites(req, res) {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email }).populate('favorites');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({
            success: true,
            favorites: user.favorites
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}



module.exports = { getMyListings , getFavorites , addToFavorites , deleteFromFavorites };
