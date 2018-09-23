const express = require('express');
const router = express.Router();

const { Movie, validate } = require('../models/movie.model');
const  { Genre } = require('../models/genre.model');

router.get('/', async (req, res)=>{
    const movies = await Movie
    .find()
    .sort({title : 1});
    console.log(movies)
    res.send(movies);
});

router.get('/:id', async (req, res)=>{
   try{
        const movie = await Movie
        .findById(req.params.id);
        console.log(movie)
        res.send(movie);
   }catch(ex){
        console.log(ex.message);
        res.status(500).send(ex.message);
   }
});

router.post('/', async (req, res)=>{
    const result = validate(req.body);
    if(result.error) return res.status(400).send({success: false, message: result.error.details[0].message});

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send({success: false, message: 'Invalid Genre'});
    
    try{
        const movie = new Movie({
            title : req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate : req.body.dailyRentalRate,
            genre : {
                _id : genre._id,
                name : genre.name

            }

        });
        const result = await movie.save();
        res.send(result);
        console.log(result);
    }catch(ex){
       return res.status(500).send(ex.message);
    }
});

router.put('/:id', async (req, res)=>{
    // console.log('Inside Movie PUT requst');
    const result = validate(req.body);
    if(result.error) return res.status(400).send({success: false, message: result.error.details[0].message});
    try{
        // console.log('inside try block PUT')
        const movie = await Movie.findOneAndUpdate({_id : req.params.id}, { $set : {title : req.body.title, dailyRentalRate : req.body.dailyRentalRate, numberInStock : req.body.numberInStock, genreId : req.body.genreId}}, {new : true});
        // console.log('got Movies back ', movie);
        if(!movie) return res.status(404).send({success: false, message : 'Movie with the given ID does not exist'});
        res.send(movie);
    }catch(ex){
        return res.status(500).send(ex.message);
    }
});

router.delete('/:id', async (req, res)=>{
    // const result = validate(req.body);
    // if(result.error) return res.status(400).send({success: false, message: result.error.details[0].message});
    try{
        // console.log('inside try block PUT')
        const movie = await Movie.findOneAndDelete({_id : req.params.id});
        if(!movie) return res.status(404).send({success: false, message : 'Movie with the given ID does not exist'});
        res.send(movie);
    }catch(ex){
        return res.status(500).send(ex.message);
    }
});

module.exports = router;