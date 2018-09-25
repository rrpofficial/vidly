const express = require('express');
const router = express.Router();
const passport = require('passport');

const {Customer, validate} = require('../models/customer.model');

router.get('/', async (req, res)=>{
    const customers = await Customer.find().sort({'name' : 1});
    res.send(customers);
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    
    const vResult = validate(req.body);
    if (vResult.error) return res.status(404).send({status : false, message : vResult.error.details[0].message});
    try{
        let customer = new Customer(req.body);
        customer = await customer.save();
        res.send(customer);
    }catch(ex){
        console.log(ex.message);
    }
    
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    const vResult = validate(req.body);
    if(vResult.error) return res.status(404).send({status : false, message : vResult.error.details[0].message});
    console.log('request data is ', req.body);
   
    try{
        const customer = await Customer.findOneAndUpdate({_id : req.params.id}, { $set : {name : req.body.name, phone : req.body.phone, isGold : req.body.isGold}}, {new : true});
        if(!customer) return res.status(404).send({success: false, message : 'Customer with the given ID is not avialable'});
        res.send(customer);
    }catch(ex){
        console.log(ex.message);
    }
});


router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    // const vResult = validateCustomer(req.body);
    // if(vResult.error) return res.status(404).send({status : false, message : vResult.error.details[0].message});
    // console.log('request data is ', req.body);
    
    try{
        // const query = {_id : req.params.id};
        const customer = await Customer.findOneAndDelete({_id : req.params.id});
        if(!customer) return res.status(404).send({success: false, message : 'Customer with the given ID is not avialable'});
        res.send(customer);
    }catch(ex){
        console.log(ex.message);
    }
});

module.exports = router;

