var User = require('../models/user.model.schema');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../configs/app.config');

exports.register = function(req, res) {
    var user = new User(req.body);
    user.hash_password = bcrypt.hashSync(req.body.password, 10);
    user.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
};

exports.sign_in = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. Username or Password is incorrect.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Username or Password is incorrect.' });
            } else {
                return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, config.server.key, {expiresIn: 30 * 60})});
            }
        }
    });
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};