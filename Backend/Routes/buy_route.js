const express = require('express');
const Router = express.Router();
const data = require('../data');
const {getAllListings,handleFilters,removeListing} = require('../Controllers/buy_controllers');

Router.route('/')
        .get(getAllListings)
        .post(handleFilters);

Router.route('/:id')
        .delete(removeListing);

module.exports = Router;