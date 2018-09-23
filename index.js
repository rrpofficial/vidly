const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


// const Genre = require('./models/genre.model');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser : true})
.then(()=>{ console.log('DB connection established')})
.catch((err)=>{ console.log('Unable to connect to database', err)});

const Rentals = require('./routes/rentals');
const Movies = require('./routes/movies');
const Customers = require('./routes/customers');
const Genres = require('./routes/genres');
const Home = require('./routes/home');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//************ Routes */
app.use('/api/rentals', Rentals);
app.use('/api/movies', Movies);
app.use('/api/customers', Customers);
app.use('/api/genres', Genres);
app.use('/', Home);

// Genre.create(new Genre({
//     name : 'Romance'
// }));
app.listen(3000, ()=>{console.log('Server has started')});
