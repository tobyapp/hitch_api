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

function findUser(callback) {
  User.find(function (error, users) {
    if(error) {
      console.log("Users not found : " + error);
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
  console.log("FOR LOOP FOR ATTRIBUTES");
  for(var attributeName in userDetails){
    if(attributeName != "id") {
      paramsDict[attributeName] = userDetails[attributeName];
      console.log(paramsDict);
        //console.log(attributename+": "+request.body[attributename]);
    }

  }

  User.findByIdAndUpdate(id,
                        {$set:{userName: userDetails.userName}},
                        options,
                        function(error, document) {
    if(error) {
      callback(error);
    } else {
      console.log("");
      console.log("id : " + id);
      console.log("userDetails : " + userDetails);
      console.log("options : " + options);
      console.log("document : " + document);
      console.log("");
      callback(null, document);
    }
  });
};

exports.updateUser = updateUser;
exports.findUser = findUser;
exports.createUser = createUser;
