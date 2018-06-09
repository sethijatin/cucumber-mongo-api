var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({

    fullName: {
        type: mongoose.Schema.Types.String,
        trim: true,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    created: {
        type: mongoose.Schema.Types.Date,
        default : Date.now()
    }

});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('User', userSchema);