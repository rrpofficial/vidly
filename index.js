const config = require('config');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

if(!config.get('jwtPrivateKey')){
    console.log ('Fatal error. Privatekey env is not defined');
    process.exit(1);
}
// const Genre = require('./models/genre.model');

mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser : true})
.then(()=>{ console.log('DB connection established')})
.catch((err)=>{ console.log('Unable to connect to database', err)});

const Auth = require('./routes/auth');
const Users = require('./routes/users');
const Rentals = require('./routes/rentals');
const Movies = require('./routes/movies');
const Customers = require('./routes/customers');
const Genres = require('./routes/genres');
const Home = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

//************ Routes */
app.use('/api/auth', Auth);
app.use('/api/users', Users);
app.use('/api/rentals', Rentals);
app.use('/api/movies', Movies);
app.use('/api/customers', Customers);
app.use('/api/genres', Genres);
app.use('/', Home);
// console.log('secret key is ', config.get('jwtPrivateKey'));
// Genre.create(new Genre({
//     name : 'Romance'
// }));
app.listen(3000, ()=>{console.log('Server has started')});
