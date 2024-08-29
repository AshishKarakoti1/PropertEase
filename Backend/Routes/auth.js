const express = require('express');
const Router = express();
const {login,signUp} = require('../Controllers/authControllers');

Router.route('/login').post(login);
Router.route('/signup').post(signUp);

module.exports = Router;