const express = require('express');
const User = require('./../models/userModel');
const Service=require("./../models/serviceModel")

exports.homePage = async (req, res, next) => {
    const users= await User.find();
    res.status(200).render('home',{users});
}

exports.signupPage = async (req, res, next) => {
    res.status(200).render('signup');
}

exports.loginPage = async (req, res, next) => {
    res.status(200).render('login');
}