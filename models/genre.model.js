const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            minlength: 5,
            maxlength : 50,
            unique : true
        }
    }
   
);
function validateGenre(genre){
    const schema = {        
        name : Joi.string().min(5).max(50).required()
    };
    return Joi.validate(genre, schema);
}

exports.Genre = mongoose.model('Genre', genreSchema);
exports.validate = validateGenre;