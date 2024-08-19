const data = require('../data');

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
                filteredListings = filteredListings.filter(listing => listing.location == location);
            }
            if (area) {
                filteredListings = filteredListings.filter(listing => listing.area <= area);
            }
            return res.json(filteredListings);
}

module.exports = {getAllListings,handleFilters};