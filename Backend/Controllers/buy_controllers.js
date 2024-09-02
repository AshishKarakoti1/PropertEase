const data = require('../data');
const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../data.js');

async function getAllListings(req,res) {
    res.send(data);
}

async function handleFilters(req,res) {
    const { price, location, area } = req.body;
            let filteredListings = data;
            if (price) {
                filteredListings = filteredListings.filter(listing => listing.price <= price);
            }
            if (location) {
                filteredListings = filteredListings.filter(listing => listing.location.toLowerCase() == location.toLowerCase());
            }
            if (area) {
                filteredListings = filteredListings.filter(listing => listing.area <= area);
            }
            return res.json(filteredListings);
}

async function removeListing(req, res) {
    const { id } = req.params;

    // Filter the listings to remove the one with the matching id
    let updatedListings = data.filter((listing) => listing.id != id);

    // Prepare the updated content for data.js
    const updatedDataContent = `let data = ${JSON.stringify(updatedListings, null, 2)};\nmodule.exports = data;`;

    try {
        // Write the updated content back to data.js
        await fs.writeFile(filePath, updatedDataContent, 'utf8');
        res.json({ success: true, message: "Listing removed successfully" });
    } catch (error) {
        console.error("Error writing file:", error);
        res.json({ success: false, message: "Failed to remove listing" });
    }
}

async function updateListing(req,res) {
    const {id} = req.params;
    const {url,location,bedrooms,bathrooms,price,area} = req.body;
    if (!id || !url || !location || bedrooms === undefined || bathrooms === undefined || price ===          undefined || area === undefined) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const idx = data.findIndex((listing) => listing.id == id);
    if(idx == -1){
        return res.status(404).json({ success: false, message: "Please enter a valid ID" });
    }
    data[idx] = {...data[idx],url,location,bedrooms,bathrooms,price,area};
    res.status(200).json({
        success: true,
        message: `Listing with id ${id} modified`,
        updated_listing: data[idx],
    });
}

module.exports = {getAllListings,handleFilters,removeListing,updateListing};