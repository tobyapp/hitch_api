#!/usr/bin/env nodejs

const http = require('http');
const express = require('express');
const path = require('path');
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
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

var mongoHost = 'localHost';
var database = 'test';
var mongoPort = 27017;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort)); //B
var url = 'mongodb://' + mongoHost + ':' + mongoPort

mongoClient.connect(url, function(err, db) {
	if (err) {
		(console.error("Cannot connect for some reason"));
		process.exit(1);
	}
	assert.equal(null, err);
	console.log("Conncected correctly to server");
});

app.post('/createUser', function(request, response){
  console.log("");
  console.log("request : " + request)
  console.log("url : " + request.url)
  console.log("request.headers : " + request.headers)
  console.log("request.params : " + request.params);
  console.log('body : ' + request.body);
  console.log('userName : ' + request.body.userName);
  console.log("");


  schema.createUser(request.body, function(error, user) {
    if(error) {
      response.status("400").send(error);
      console.log("error in creating user : " + error);
    } else {
      response.status("200").send("User created successfully!!");
      console.log("User created successfully!!");
      console.log(user);
    }
  });
  // schema.findUser(request.)

  // var body = [];
  // request.on('data', function(chunk) {
  //   body.push(chunk);
  // }).on('end', function() {
  //   body = Buffer.concat(body).toString();
  //   console.log("body : " + body);
  // });



  console.log("POST called woo!");
  response.send("POST called woo!");

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
