/**
 * File:
 * User: dshi
 * Date: 9/22/2015 2:59 PM
 * Copyright (c) 2015 MicroStrategy Incorporated. All rights reserved.
 */
var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var fakedb = {
    users: [
        {username: 'phill', password: '1'}
    ],

    jwtSecrect: 'x12yui_[rb~!'
};

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret: fakedb.jwtSecrect}).unless({path: ['/login']}));

app.get('/random_user', echoRandomUser);
app.get('/me', echoMe);
app.post('/login', authenticate, echoLogin);

app.listen(3000, echoStartup);

function authenticate(req, res, next) {
     var body = req.body;
    if (!!body.userName === false || !!body.password === false) {
        res.status(400).end('password or username needed');
    }

    if (body.userName !== fakedb.users[0].username|| body.password !== fakedb.users[0].password) {
        res.status(401).end('password or username incorrect');
    }

    next();
}

function echoStartup() {
    console.log('server is running on port 3000');
}

function echoMe(req, res) {
    res.send(req.user);
}

function echoLogin(req, res) {
    var user = fakedb.users[0];
    var token = jwt.sign({username: user.username}, fakedb.jwtSecrect);

    res.send({token: token, user: user});
}

function echoRandomUser(req, res) {
    var user = faker.helpers.userCard();
    user.avatar = faker.image.avatar();
    res.json(user);
}




