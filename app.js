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
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
console.log(mongodbKey);
mongoose.connect(mongodbKey)
.then(()=>console.log('connection successful'))
.catch((err)=>console.error(err));

// DEFINE MODEL
app.use('/', router);

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
   });