#!/usr/bin/env nodejs

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test')
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("connected to database successfully!");
// });

var userSchema = mongoose.Schema({
  userName: String,
  userAge: Number,
  userEducation: String,
  userGender: String,
  userEmailAddress: String,
  updatedAt: { type: Date, default: Date.now},
});

var User = mongoose.model('User', userSchema) ;

// console.log("test : " + User);

// console.log('toby : ' + toby);

// toby.save(function (error, toby) {
//   if (error) return console.error(error);
//   else {
//     console.log("saved to mongoDB successfully!")
//   }
// });

function createUser(userDetails, callback) {
  console.log("createUser");
  const user = new User({userName: userDetails.userName,
                      userAge: userDetails.userAge,
                      userEducation: userDetails.userEducation,
                      userGender: userDetails.userGender,
                      userEmailAddress: userDetails.userEmailAddress,
                    });

  saveUser(user, function(error, user) {
    console.console.log("in saveUser fuction call from createUser");
    if(error) {
      callback(error);
    } else {
      callback(null, user);
    }

  });

}

function saveUser(user, callback) {
  console.log("saveUser");
  user.save(function (error, user) {
    if(error) {
      console.log("error with saving : " + error);
      callback(error);
    }
    else {
      callback(null, user);
      console.log("user saved successfully!!!");
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
