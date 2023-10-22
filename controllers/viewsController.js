const express = require('express');
const User = require('./../models/userModel');
const Service = require("./../models/serviceModel")

exports.homePage = async (req, res, next) => {
    const users = await User.find();
    res.status(200).render('home', { users });
}

exports.signupPage = async (req, res, next) => {
    res.status(200).render('signup');
}

exports.loginPage = async (req, res, next) => {
    res.status(200).render('login');
}


exports.registerEventPage = async (req, res) => {
    //console.log(req.params.id);
    res.status(200).render('registerEvent');
}


exports.createEventPage = async (req, res, next) => {
    res.status(200).render('eventForm')
}

exports.reviewPage = async (req, res, next) => {
    res.status(200).render('reviewForm')
}
exports.viewEvents = async (req, res, next) => {
    const services = await Service.find()
    const id = req.params.id
    // console.log(services)
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    var date = year + '-' + month + '-' + day;
    // console.log(formattedDate);
    // console.log(id.services[0].createdBy._id)
    res.status(200).render('viewEvents', { services, id, date });

}
exports.viewAllFolks = async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    res.status(200).render('viewAllFolks', { service })
}

exports.viewAllReview = async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    res.status(200).render('viewAllReview', { service })
}