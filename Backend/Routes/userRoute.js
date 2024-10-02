const express = require('express');
const Router = express.Router();
const {getMyListings,getFavorites,addToFavorites,deleteFromFavorites} = require('../Controllers/userControllers');

Router.route('/listings')
        .get(getMyListings);
Router.route('/favorites')
        .get(getFavorites)
        .post(addToFavorites)
        .delete(deleteFromFavorites);

module.exports = Router;