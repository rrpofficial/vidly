const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 3,
        maxlength : 50,
        required: true
    }
});

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 255,
        trim : true,
        unique : true
    },
    numberInStock : {
        type : Number,
        min : 0,
        required : true
    },
    dailyRentalRate : {
        type : Number,
        min : 1,
        max : 10,
        required : true 
    },
    genre : {
        type : genreSchema,
        required : true
    }
});

function validateMovie(movie){
    const schema = {
        title : Joi.string().min(1).max(255).required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(1).max(10).required(),
        genreId : Joi.objectId().required()
     
    };

    return Joi.validate(movie, schema);
}
exports.Movie = mongoose.model('Movie', movieSchema);
exports.validate = validateMovie