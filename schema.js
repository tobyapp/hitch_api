#!/usr/bin/env nodejs

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database successfully!");
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
  console.log("createUser");
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

}

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

function findUser(user) {
  User.find(function (error, users) {
    if(error) return console.error(error);
    else {
      return users;
    }
  });
};

exports.fundUser = findUser;
exports.createUser = createUser;
