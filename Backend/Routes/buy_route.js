const express = require('express');
const Router = express.Router();
const data = require('../data');
const {getAllListings,handleFilters} = require('../Controllers/buy_controllers');

Router.route('/')
        .get(getAllListings)
        .post(handleFilters);

module.exports = Router;