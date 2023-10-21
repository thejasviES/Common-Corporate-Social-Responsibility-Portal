const express = require("express");
const Router = express.Router();
const serviceController = require("./../controllers/serviceController");
const authController = require("./../controllers/authController");


Router.post("/event", authController.protect, serviceController.createEvent);


module.exports = Router;