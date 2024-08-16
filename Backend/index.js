const express = require('express');
const data = require('./data');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.get('/buy', (req, res) => {
    res.json(data);
})

app.post('/buy', (req, res) => {
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

});

app.listen(5555, (err) => {
    if (err) {
        console.log("error connecting to server");
    } else {
        console.log("connected to server at port 5555");
    }
})