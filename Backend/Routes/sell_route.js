const express = require('express');
const Router = express.Router();

// Import Multer configuration
const upload = require('../Controllers/multerConfig');

// Import controller
const { createListing } = require('../Controllers/sellControllers');

// Define routes
Router.route('/')
    .post(upload.single('avatar'), createListing);

module.exports = Router;
