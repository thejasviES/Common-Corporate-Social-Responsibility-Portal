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

exports.viewEvents= async (req,res,next)=>
{   const services= await Service.find();
    const id=req.params.id
    console.log(id,services[0].createdBy._id),
    
    res.status(200).render('viewEvents',{services,id})
}