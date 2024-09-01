const express = require('express');
const Router = express.Router();
const isValidUser = require('../Middlewares/validUser');

// Import Multer configuration
// const upload = require('../Controllers/multerConfig');

// Import controller
const { createListing } = require('../Controllers/sellControllers');

// Define routes
Router.route('/')
    .post(isValidUser,createListing);
module.exports = Router;
