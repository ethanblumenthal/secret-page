var express = require('express'),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/secret_page');

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