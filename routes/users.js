
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User, validate} = require('../models/user.model');


router.get('/', async(req, res)=>{
    console.log('inside the genres request');
    const genre = await User.find().sort({'name' : 1});
    res.send(genre);  
});

router.get('/:id', async(req, res)=>{
    console.log('inside the genres request');
    try{
        const user = await User.findById(req.params.id);
        if(!user) res.status(404).send({message: 'The genre with the requested ID is not found'});
        res.send(user);  
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
        
        console.log('inside the genres post request',req.body.name);
        let user = new User({name : req.body.name});
        user = await user.save();
        res.json(user);
    }catch(ex){
        return res.status(500).send({success: false, message: ex.message});
        console.log('error : ', ex.message);
    }
    
});

module.exports = router;