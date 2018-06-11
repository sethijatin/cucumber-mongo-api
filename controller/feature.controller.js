var Feature = require('../models/feature.model.schema');

//Add a feature to the DB
exports.create = function(req, res){

    if(!req.body) {
        return res.status(401).send({
            message: "Feature content can not be empty"
        });
    }

    if(req.body instanceof Array && req.body[0].elements.length > 1) {
        return res.status(401).send({
            message: "Please use maven plugin Distributed Features. \n See:  https://github.com/sethijatin/cucumber-feature-distributor"
        });
    }

    var data = (req.body instanceof Array) ? req.body[0] : req.body;

    // Create a Feature
    var feature = new Feature(data);

    //Save Feature
    feature.save()
        .then(function(data){
            res.send(data)
        })
        .catch(function(err){
            res.status(500).send({
                message: err.message
            })
        })
};

//Get all features
exports.findAll = function(req, res){

    var  query = (req.body)? req.body : { filter : {}, projection : {}};

    if(query.filter === null && query.projection === null){
        res.status(500).send({
            message : "Invalid service body!"
        });
    }

    Feature.find(query.filter, query.projection)
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            res.status(500).send({
                message : error.message || "An exception occurred!"
            });
        });

};

//Aggregration Queries
exports.aggregate = function(req, res){

    Feature.aggregate([req.body])
        .then(function(response){
            res.send(response)
        })
        .catch(function(error){
            res.status(500).send({
                message : error.message || "An exception occurred!"
            });
        });
};