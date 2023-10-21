const express = require("express");
const pug = require("pug");
const cookieParser = require('cookie-parser')
const path = require('path');




const viewsRoutes = require("./routes/viewsRoutes");
const userRoutes = require("./routes/userRoutes")

const app = express();


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', viewsRoutes)
app.use("/api/v1/user", userRoutes);

module.exports = app;
