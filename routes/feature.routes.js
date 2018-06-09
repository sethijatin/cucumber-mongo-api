var features = require('../controller/feature.controller');
var users = require('../controller/users.controller');

module.exports = function(app){
    //Put Features In MongoDB
    app.post('/insert', users.loginRequired, features.create);

    //Get Features From MongoDB
    app.post('/get', features.findAll);

    //Create a user
    app.post('/auth/register', users.register);

    //Sign In User
    app.post('/auth/login', users.sign_in);
};