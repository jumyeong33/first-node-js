//[LOAD PACKAGE]
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodbKey = require('./dbsetting');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var router = require('./routes/index')

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
mongoose.connect(mongodbKey).then(()=>console.log('connection successful')).catch((err)=>console.error(err));
// DEFINE MODEL
app.use('/', router);

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
   });