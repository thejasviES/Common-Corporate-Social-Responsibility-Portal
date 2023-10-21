const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');





Router.use(authController.isLoggedIn);

Router.route('/eventRegister').get(viewsController.eventRegisterPage);
Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);






module.exports = Router;