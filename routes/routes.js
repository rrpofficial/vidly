const express = require('express');
const Auth = require('./auth');
const Users = require('./users');
const Rentals = require('./rentals');
const Movies = require('./movies');
const Customers = require('./customers');
const Genres = require('./genres');
const Home = require('./home');

module.exports = function (app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    //************ Routes */
    app.use('/api/auth', Auth);
    app.use('/api/users', Users);
    app.use('/api/rentals', Rentals);
    app.use('/api/movies', Movies);
    app.use('/api/customers', Customers);
    app.use('/api/genres', Genres);
    app.use('/', Home);
}