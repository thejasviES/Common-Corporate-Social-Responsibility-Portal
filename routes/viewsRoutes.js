const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');





Router.use(authController.isLoggedIn);

// Router.route('/eventRegister').get(viewsController.eventRegisterPage);
Router.route('/register/:id').get(viewsController.registerEventPage);

Router.route('/createEvent').get(viewsController.createEventPage);

Router.route('/review/:id').get(viewsController.reviewPage)

Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
Router.route('/viewEvents/:id').get(viewsController.viewEvents);
Router.route("/viewAllFolks/:id").get(viewsController.viewAllFolks);
Router.route("/viewAllReview/:id").get(viewsController.viewAllReview);







module.exports = Router;