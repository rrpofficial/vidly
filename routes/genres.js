const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User, validate} = require('../models/genre.model');


router.get('/', async(req, res)=>{
    console.log('inside the genres request');
    const genre = await User.find().sort({'name' : 1});
    res.send(genre);  
});

router.get('/:id', async(req, res)=>{
    console.log('inside the genres request');
    try{
        const genre = await User.findById(req.params.id);
        if(!genre) res.status(404).send({message: 'The genre with the requested ID is not found'});
        res.send(genre);  
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
        let genre = new User({name : req.body.name});
        genre = await genre.save();
        res.json(genre);
    }catch(ex){
        return res.status(500).send({success: false, message: ex.message});
        console.log('error : ', ex.message);
    }
    
});

router.put('/:id', async(req, res)=>{
    const result = validate(req.body);
        // console.log('validatation errors',result);
    if(result.error) return res.status(400).send({success: false, message: result.error.details[0].message});

    console.log('inside the genres put request',req.params.id);
    const id = req.params.id;
    try{
        const genre = await User.findByIdAndUpdate(id, { name : req.body.name}, { new : true});
        if(!genre) {
           return res.status(404).send({success: false, message : 'Genre with the given ID is not avialable'});
        }
        res.send(genre);
    }catch(ex){
        console.log('error : ', ex.message);
    }
    
});

router.delete('/:id', async(req, res)=>{
    console.log('inside the genres Delete request',req.params.id);
    const id = req.params.id;
    try{
        const result = await User.findByIdAndDelete(id);
        res.send(result);
    }catch(ex){
        console.log('error : ', ex.message);
    }
    
});


module.exports = router;