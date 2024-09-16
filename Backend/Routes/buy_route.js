const express = require('express');
const Router = express.Router();
const {getAllListings,handleFilters,handleDeleteListing,updateListing} = require('../Controllers/buy_controllers');

Router.route('/')
        .get(getAllListings)
        .post(handleFilters);

Router.route('/:id')
        .put(updateListing)
        .delete(handleDeleteListing);

module.exports = Router;