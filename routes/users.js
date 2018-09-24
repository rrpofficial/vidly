const bcrypt  = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User, validate} = require('../models/user.model');


router.get('/', async(req, res)=>{
    // console.log('inside the users request');
    const users = await User.find().sort({'name' : 1}).select({'_id' : 1, 'name' : 1, 'email' : 1});
    res.send(users);
});

router.get('/:id', async(req, res)=>{
    // console.log('inside the get request by email request');
    try{
        const user = await User.findById(req.params.id);
        if(!user) res.status(404).send({message: 'The user with this ID does not exist'});
        res.send(_.pick(user, ['_id', 'name', 'email']));  
    }catch(ex){
        console.log(ex.message);
    }
    
});

router.post('/', async(req, res)=>{
        const result = validate(req.body);
        // console.log('validatation errors',result);
        if(result.error){
            // console.log('validatation errors : ', result.error.details[0].message);
            return res.status(400).send({success: false, message: result.error.details[0].message});
        }

    try{
        
        console.log('inside the Users post request',req.body.name);
        let user = await User.findOne({email : req.body.email});
        if(user) return res.status(400).send({success : false, message : 'A user is already registered with this email'});

        user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
      
        res.json(_.pick(user, ['_id', 'name','email']));
    }catch(ex){
        return res.status(500).send({success: false, message: ex.message});
        console.log('error : ', ex.message);
    }
    
});

module.exports = router;