const express = require('express');
const Router = express.Router();
const {getMyListings,getFavourites} = require('../Controllers/userControllers');

Router.route('/listings')
        .post(getMyListings);
Router.route('/favourites')
        .post(getFavourites);

module.exports = Router;