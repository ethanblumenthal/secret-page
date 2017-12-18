var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/secret_page', {useMongoClient: true});

var app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req,res) {
    res.render('secret');
});

app.listen(3000, function() {
    console.log('Serving on localhost:3000');
});