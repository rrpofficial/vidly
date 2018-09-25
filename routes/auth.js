const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt  = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User } = require('../models/user.model');

router.post('/', async(req, res)=>{
        const { error } = validate(req.body);
        // console.log('validatation errors',result);
        if(error){
            // console.log('validatation errors : ', result.error.details[0].message);
            return res.status(400).send({success: false, message: error.details[0].message});
        }

    try{
        console.log('inside the Authenticate post request',req.body.name);
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.status(400).send({success : false, message : 'Invalid email or password'});

        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send({success : false, message : 'Invalid email or password'});
        
        const token = jwt.sign(_.pick(user, ['_id', 'name','email']), config.get('jwtPrivateKey'), {
            expiresIn : 86400 //valid for one day
        });
        res.header('x-auth-token', 'JWT '+token);
        res.send({isAuthenticated : true});
    }catch(ex){
        return res.status(500).send({success: false, message: ex.message});
        console.log('error : ', ex.message);
    }
    
});

function validate(req){
    const schema = {        
        email : Joi.string().required().email(),
        password : Joi.string().min(8).max(255).required()
    };
    return Joi.validate(req, schema);
}
module.exports = router;