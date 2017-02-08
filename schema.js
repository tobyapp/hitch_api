#!/usr/bin/env nodejs

var mongoose = require('mongoose');
const url = 'mongodb://localhost/users';
mongoose.connect(url)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to " + url +" successfully!");
});

var userSchema = mongoose.Schema({
  userName: String,
  userAge: Number,
  userEducation: String,
  userGender: String,
  userEmailAddress: String,
  updatedAt: { type: Date, default: Date.now},
});

var User = mongoose.model('User', userSchema) ;

function createUser(userDetails, callback) {
  const user = new User({userName: userDetails.userName,
                      userAge: userDetails.userAge,
                      userEducation: userDetails.userEducation,
                      userGender: userDetails.userGender,
                      userEmailAddress: userDetails.userEmailAddress,
                    });

  saveUser(user, function(error, user) {
    if(error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
};

function saveUser(user, callback) {
  user.save(function (error, user) {
    if(error) {
      console.log("error with saving : " + error);
      callback(error);
    }
    else {
      console.log("User saved successfully!!");
      callback(null, user);
    }
  });
}

function getUsers(callback) {
  User.find(function (error, users) {
    if(error) {
      callback(error);
    }
    else {
      callback(null, users);
    }
  });
};

function updateUser(id, userDetails, callback) {
  const options = {new : true};
  var paramsDict = {};
  for(var attributeName in userDetails){
    if(attributeName != 'userId') {
      paramsDict[attributeName] = userDetails[attributeName];
    }
  };
  User.findByIdAndUpdate(id,
                        {$set:paramsDict},
                        options,
                        function(error, document) {
    if(error) {
      callback(error);
    } else {
      callback(null, document);
    }
  });
};

function findUser(id, callback) {
  User.findById(id, function(error, doc) {
    if(error) {
      callback(error);
    }
    else {
      callback(null, doc);
    }
  });
}

exports.updateUser = updateUser;
exports.getUsers = getUsers;
exports.findUser = findUser;
exports.createUser = createUser;
