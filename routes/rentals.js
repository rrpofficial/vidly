const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');


const { Rental, validate } = require('../models/rental.model');
const { Customer } = require('../models/customer.model');
const { Movie } = require('../models/movie.model');

Fawn.init(mongoose);

router.get('/', async (req, res)=> {
    
    try {
        const rentals = await Rental
    .find()
    .sort({ dateOut : -1});
    res.send(rentals);

    }catch(ex){ 
        res.status(500).send(ex.message);
    }
});

router.get('/:id', async (req, res)=> {
    try {
        const rentals = await Rental.findById(req.params.id);
        if(!rentals) return res.status(404).send({success : false, message : 'No rental found with this ID'});
        res.send(rentals);
    }catch(ex){ 
        res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res)=> {
    const result = validate(req.body);
    if(result.error) return res.status(400).send({success : false, message : 'Invalid Request'});
    try {
        const customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(404).send({success : false, message : 'No customer found with this ID'});
        
        const movie = await Movie.findById(req.body.movieId);
        if(!movie) return res.status(404).send({success : false, message : 'No Movie found with this ID'});
        // console.log(movie);
        const rental = new Rental({
            customer : {
                _id : customer.id,
                name : customer.name,
                phone : customer.phone,
                isGold : customer.isGold
            },
            movie : {
                _id : movie.id,
                title : movie.title,
                dailyRentalRate : movie.dailyRentalRate
            },

        });
        // movie.numberInStock--;
        try{
            new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {$inc : {numberInStock : -1}})
            .run();
        }
        catch(ex){
            return res.status(500).send({success : fales, message : ex.message});
        }
        
        // movie.save();
        // rental.save();

        res.send(rental);
        // const rentals = await Rental.findById(req.params.id);
        // if(!rentals) return res.status(404).send({success : false, message : 'No rental found with this ID'});
        // res.send(rentals);
    }catch(ex){ 
        // console.log(ex.message);
        res.status(500).send(ex.message);
    }
});

router.put('/:id', async (req, res)=> {

});

module.exports = router;