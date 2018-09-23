const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
            name : {
                type : String,
                required : true,
                minlength: 3,
                maxlength : 50
            },
            isGold : {
                type : Boolean,
                default : false
            },
            phone : {
                type :  String,
                required : true,
                length : 10
                }
        }),
        required : true
     },
    movie : {
        type : new mongoose.Schema(
            {
                title : {
                    type : String,
                    required : true,
                    trim : true,
                    minlength : 1,
                    maxlength : 255,
                },
                
                dailyRentalRate : {
                    type : Number,
                    min : 1,
                    max : 10,
                    required : true 
                }
        }),
        required : true,
    },
    dateOut : {
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturned : {
        type : Date
    },
    rentalFee : {
        type : Number,
        min : 0
    }
});

function validateRental(rental){
    const schema = {
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    }
    return Joi.validate(rental, schema);
}

exports.Rental = mongoose.model('Rental', rentalSchema);
exports.validate = validateRental