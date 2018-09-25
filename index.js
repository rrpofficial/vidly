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



app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);
require('./routes/routes')(app);


// console.log('secret key is ', config.get('jwtPrivateKey'));
// Genre.create(new Genre({
//     name : 'Romance'
// }));
app.listen(3000, ()=>{console.log('Server has started')});
