var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    User = require('./models/user'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/secret_page', {useMongoClient: true});

var app = express();
app.set('view engine', 'ejs');

app.use(require('express-session')({
    secret: 'Ethan rocks!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/secret', function(req,res) {
    res.render('secret');
});

// SHOW signup form
app.get('/register', function(rqq, res) {
    res.render('register');
});

// CREATE user signup
app.post('/register', function(req, res) {
    res.send('register post route');
});

app.listen(3000, function() {
    console.log('Serving on localhost:3000');
});