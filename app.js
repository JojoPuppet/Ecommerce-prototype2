'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

const { User } = require('./server/models/user');
const { mongoose } = require('./server/db/mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, "./public/javascripts/Login.html"));

}, err => res.status(400).send(err));

app.get('/myAccount', (req, res) => {

    res.sendFile(path.join(__dirname, "./public/javascripts/myAccount.html"));

}, err => res.status(400).send(err));

app.post('/AccInfo', (req, res) => {

    let password = req.body.password;
    let userInfo = User.findOne({ password }).then(info => {

        res.render('index', { info });
    });
});



app.post('/Login', (req, res) => {

    console.log(req.body);
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(doc => {

        res.sendFile(path.join(__dirname, "./public/javascripts/Home(Logout).html"));


    }, err => {
        res.status(400).send(err);

    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});