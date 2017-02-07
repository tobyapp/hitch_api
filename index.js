#!/usr/bin/env nodejs

const http = require('http');
const express = require('express');
const path = require('path');
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const Schema = require('./schema');

var app = express();
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var bodyParser = require('body-parser')
app.use(bodyParser.json());

var mongoHost = 'localHost';
var database = 'test';
var mongoPort = 27017;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort)); //B
var url = 'mongodb://' + mongoHost + '/' + database + ':' + mongoPort

mongoClient.connect(url, function(err, db) {
	if (err) {
		(console.error("Cannot connect for some reason"));
		process.exit(1);
	}
	assert.equal(null, err);
	console.log("Conncected correctly to server");
});

app.get('/', function(request, response){
  console.log("request.params : " + request.params)
  // Schema.findUser(request.)
  res.send("GET called")

});
