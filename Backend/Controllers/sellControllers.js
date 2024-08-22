const path = require('path');
const data = require('../data');

const uploadPath = path.join(__dirname, '../uploads');

const createListing = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded or invalid file type' });
        }

        const { location, bedrooms, bathrooms, area, price } = req.body;
        const ID = data.length + 1;
        const fileName = req.file.filename;
        const filePath = path.join(uploadPath, fileName);

        const newListing = {
            id: ID,
            url: filePath,
            location,
            bedrooms,
            bathrooms,
            area,
            price
        };

        data.push(newListing);
        res.status(200).json({ success: "Data saved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createListing };
