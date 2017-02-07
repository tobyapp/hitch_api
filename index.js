#!/usr/bin/env nodejs

const http = require('http');
const express = require('express');
const path = require('path');
const assert = require('assert');
const schema = require('./schema');

var app = express();
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ //parse test as URL encoded data
    extended: true
}));

app.use(bodyParser.json());

app.post('/createUser', function(request, response){

  schema.createUser(request.body, function(error, user) {
    if(error) {
      console.log("error in creating user : " + error);
      response.status("400").send(error);
    } else {
      console.log("User created successfully!!");
      response.status("200").send("User created successfully!!");
    }
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
