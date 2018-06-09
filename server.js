var express = require('express');
var bodyParser = require('body-parser');
var config = require("./configs/app.config");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

// create express app
var app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '1mb', extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '100mb'}));

app.use(function(req ,res, next){
   if (req.headers && req.headers.authorization) {
       jwt.verify(req.headers.authorization, config.server.key, function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
       })
   }
   else {
       req.user = undefined;
       next();
   }
});

mongoose.Promise = global.Promise;
mongoose.connect(((config.mongo.url.toString().endsWith("/"))? config.mongo.url : config.mongo.url + "/") + config.mongo.db)
    .then(function(){
       console.log("Connected to Database ...");
    })
    .catch(function(){
        console.log("Could not connect to DB @ " + config.mongo.url);
    });

// define a simple route
app.get('/', function(req, res) {
    res.json({"message": "Call made to mongo service"});
});

//Adding routes
require('./routes/feature.routes')(app);

// listen for requests
app.listen(config.server.port, function(){
    console.log("Server is listening on port " + config.server.port);
});