const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');





Router.use(authController.isLoggedIn);


 Router.route('/eventRegister').get(viewsController.createEvent)
Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
Router.route('/viewEvents/:id').get(viewsController.viewEvents);






module.exports = Router;