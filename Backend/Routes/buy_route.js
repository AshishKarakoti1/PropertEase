const express = require('express');
const Router = express.Router();
const {getAllListings,handleFilters,deleteListing,updateListing,getListingById} = require('../Controllers/buy_controllers');

Router.route('/')
        .get(getAllListings)
        .post(handleFilters)
        .delete(deleteListing);

Router.route('/:id')
        .get(getListingById)
        .put(updateListing)

module.exports = Router;