var mongoose = require('mongoose');

var tagSchema;
tagSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    line: mongoose.Schema.Types.String
});

var scenarioSchema = mongoose.Schema({
    before : mongoose.Schema.Types.Mixed,
    line : mongoose.Schema.Types.String,
    description : mongoose.Schema.Types.String,
    id : mongoose.Schema.Types.String,
    after : mongoose.Schema.Types.Mixed,
    type : mongoose.Schema.Types.String,
    keyword : mongoose.Schema.Types.String,
    steps : mongoose.Schema.Types.Mixed,
    tags : [tagSchema]
});

var featureSchema = mongoose.Schema(
    {
        line : {type: mongoose.Schema.Types.Number, required: true},
        name : {type: mongoose.Schema.Types.String, required: true},
        description : {type: mongoose.Schema.Types.String},
        id : {type: mongoose.Schema.Types.String, required: true},
        keyword : {type: mongoose.Schema.Types.String, required: true},
        uri : {type: mongoose.Schema.Types.String, required: true},
        tags : {type: [tagSchema], required : true},
        elements : {type: [scenarioSchema], required : true},
        insertedOn : {type: mongoose.Schema.Types.Date, default: Date.now()}
    }
);

module.exports = mongoose.model('Feature', featureSchema);