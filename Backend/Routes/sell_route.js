const express = require('express');
const Router = express.Router();

// Import Multer configuration
const upload = require('./multerConfig');

// Import controller
const { createListing } = require('./listingController');

// Define routes
Router.route('/')
    .post(upload.single('avatar'), createListing);

module.exports = Router;
