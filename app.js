var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    User = require('./models/user'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/secret_page', {useMongoClient: true});
mongoose.Promise = global.Promise;

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'Ethan rocks!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SHOW - home
app.get('/', function(req, res) {
    res.render('home');
});

// SHOW - secret
app.get('/secret', isLoggedIn, function(req,res) {
    res.render('secret');
});

// SHOW - register
app.get('/register', function(req, res) {
    res.render('register');
});

// CREATE - register
app.post('/register', function(req, res) {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.render('secret');
        });
    });
});

// SHOW - login
app.get('/login', function(req, res) {
    res.render('login');
});

// CREATE - login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function(req, res) {
});

// logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// secret middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('login');
};

app.listen(3000, function() {
    console.log('Serving on localhost:3000');
});