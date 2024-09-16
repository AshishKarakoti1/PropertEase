const userModel = require('../Models/userModel');
const listingModel = require('../Models/listingModel');

async function getAllListings(req, res) {
    try {
        const listings = await listingModel.find();
        res.status(200).json({ success: true, listings });
    } catch (error) {
        console.error('Error fetching all listings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


async function handleFilters(req, res) {
    try {
        const { price, location, area } = req.body;
        let filter = {};
        if (price) {
            const { min, max } = price;
            filter.price = { $lte: max };
        }
        if (location) {
            filter.location = location.toLowerCase();
        }
        if (area) {
            filter.area = { $lte: area };
        }

        const filteredListings = await listingModel.find(filter); // Corrected model usage

        res.status(200).json({ success: true, message: "Listings filtered successfully", filteredListings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}


async function handleDeleteListing(req, res) {
    try {
        const { id } = req.params;
        const deletedListing = await listingModel.findByIdAndDelete(id);

        if (!deletedListing) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }

        return res.status(200).json({ success: true, message: 'Listing deleted successfully', deletedListing });
    } catch (error) {
        console.error('Error deleting listing:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}

async function updateListing(req, res) {
    try {
        const { id } = req.params; 
        const { url, location, bedrooms, bathrooms, price, area } = req.body; 
        
        // Check if all required fields are provided
        if (!url || !location || bedrooms === undefined || bathrooms === undefined || price === undefined || area === undefined) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const updatedListing = await listingModel.findByIdAndUpdate(
            id, 
            { url, location, bedrooms, bathrooms, price, area },
            { new: true, runValidators: true }
        );

        if (!updatedListing) {
            return res.status(404).json({ success: false, message: "Please enter a valid ID" });
        }

        return res.status(200).json({
            success: true,
            message: `Listing with id ${id} modified`,
            updated_listing: updatedListing,
        });
    } catch (error) {
        console.error('Error updating listing:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {getAllListings,handleFilters,handleDeleteListing,updateListing};