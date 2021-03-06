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
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.write(JSON.stringify(user));
      response.end()
    }
  });
});

app.get('/getUsers', function(request, response) {
  schema.getUsers(function(error, users) {
    if(error) {
      console.log("Users not found : " + error);
      response.status("400").send(error);
    } else {
      console.log("User found successfully!!");
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.write(JSON.stringify(users));
      response.end()
    }
  })
});

app.put('/findUser', function(request, response) {
  schema.findUser(request.body.userId, function(error, users) {
    if(error) {
      console.log("Users not found : " + error);
      response.status("400").send(error);
    } else {
      console.log("User found successfully!!");
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.write(JSON.stringify(users));
      response.end()
    }
  })
});

app.put('/updateUser', function(request, response) {
  schema.updateUser(request.body.userId, request.body, function(error, user) {
    if(error) {
      console.log("Error updating doc : " + error);
      response.status("400").send(error);
    } else {
      console.log("User successfully updated!");
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.write(JSON.stringify(user));
      response.end()
    }
  });
});

app.delete('/deleteUser', function(request, response) {
  schema.deleteUser(request.body.userId, function(error, user) {
    if(error) {
      console.log("Error deleting doc : " + error);
      response.status("400").send(error);
    } else {
      console.log("User successfully updated!");
      response.writeHead(200, { 'Content-Type' : 'application/json' });
      response.write(JSON.stringify(user));
      response.end("User successfully deleted!");
    }
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
