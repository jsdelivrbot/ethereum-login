"use strict";

var express = require('express');
var expressJwt = require('express-jwt');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var sigUtil = require('eth-sig-util');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  if (!req.xhr) {
    res.status(500).send('Not AJAX');
  }
  else {
    next();
  }
});

app.get('/who', function (req, res) {
  var decoded = jwt.verify(req.cookies.token, 'shhhhh');
  console.log(decoded);
  if (decoded) {
    res.json({account: decoded.loggedInAs});
  }
  else {
    res.status(404);
  }
  res.end();
});

app.post('/sign-in', function (req, res) {
    var msgParams = {
      data: "etherlogin",
      sig: req.body.signed,
    };
    var recovered = sigUtil.recoverPersonalSignature(msgParams)  
console.log('req:', req.body);
console.log('rec:', recovered);
    if (recovered === req.body.account) {
      var token = jwt.sign({loggedInAs: req.body.account}, 'shhhhh');
console.log('token:', token);
      res.cookie('token', token);
      res.end();
    } else {
      console.log('SigUtil unable to recover the message signer');
    }  
    
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
