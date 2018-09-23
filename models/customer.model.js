const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema(
    {
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
    }
   
);

function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        phone : Joi.string().length(10),
        isGold : Joi.boolean()

    };
    return Joi.validate(customer, schema);
}

// module.exports = mongoose.model('Customer', customerSchema);
const Customer = mongoose.model('Customer', customerSchema);
exports.Customer = Customer;
exports.validate = validateCustomer;