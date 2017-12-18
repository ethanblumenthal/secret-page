var express = require('express'),
    app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000, function() {
    console.log('Serving on localhost:3000');
});