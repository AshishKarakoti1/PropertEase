const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data.js');

async function writeFile(obj) {
    try {
        // Read the existing data.js file as text
        let data = await fs.readFile(filePath, 'utf8');

        // Remove the last closing bracket and semicolon
        data = data.replace(/];\s*module\.exports\s*=\s*data\s*;?\s*$/, '');

        // Add the new object as a string
        const newObjectString = `, ${JSON.stringify(obj, null, 2)}\n];\nmodule.exports = data;`;

        // Update the file content with the new object
        const updatedData = `${data}${newObjectString}`;

        // Write the updated data back to the file
        await fs.writeFile(filePath, updatedData, 'utf8');

        return true;
    } catch (error) {
        console.error("Error writing file:", error);
        return false;
    }
}

const createListing = async (req, res) => {
    const { url, location, bedrooms, bathrooms, area, price } = req.body;

    if (!url || !location || !bedrooms || !bathrooms || !area || !price) {
        return res.json({ success: false, message: "Incomplete details" });
    }

    const obj = {
        id: uuidv4(),
        url,
        location,
        bedrooms,
        bathrooms,
        area,
        price
    };

    // Await the writeFile function
    const success = await writeFile(obj);

    if (success) {
        return res.json({ success: true, message: "Listing added successfully" });
    } else {
        return res.json({ success: false, message: "Listing not added" });
    }
};

module.exports = { createListing };
