const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data.js');

async function writeFile(obj) {
    try {
        // Read the existing data.js file as text
        let data = await fs.readFile(filePath, 'utf8');

        // Extract the array part from the file content
        let arrayContentMatch = data.match(/let\s+data\s*=\s*(\[.*\]);/s);

        if (!arrayContentMatch) {
            console.error("Could not find valid data array in file.");
            return false;
        }

        // Extract the array string from the match
        let arrayContent = arrayContentMatch[1];

        // Parse the extracted array content to a JavaScript array
        let parsedData;
        try {
            parsedData = JSON.parse(arrayContent);
        } catch (parseError) {
            console.error("Error parsing data array:", parseError);
            return false;
        }

        // Add the new object to the beginning of the array
        parsedData.unshift(obj);

        // Convert the updated array back to a string
        const updatedDataString = `let data = ${JSON.stringify(parsedData, null, 2)};\nmodule.exports = data;`;

        // Write the updated data back to the file
        await fs.writeFile(filePath, updatedDataString, 'utf8');

        return true;
    } catch (error) {
        console.error("Error writing file:", error);
        return false;
    }
}

const createListing = async (req, res) => {
    const {firstName,lastName,email,phoneNumber,url,location,bedrooms,bathrooms,area,price} = req.body;

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
        delete require.cache[require.resolve('../data')];
        const updatedListings = require('../data');
        console.log({ success: true, message: "Listing added successfully", updatedListings });
        return res.json({ success: true, message: "Listing added successfully", updatedListings });
    } else {
        return res.json({ success: false, message: "Listing not added" });
    }
};

module.exports = { createListing };
