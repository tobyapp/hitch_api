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

console.log("test : " + User);

var toby = new User({userName: 'Toby Applegate',
                    userAge: 24,
                    userEducation: 'University Of Portsmouth',
                    userGender: 'Male',
                    userEmailAddress: 'up661724@myport.ac.uk',
                  });

console.log('toby : ' + toby);

toby.save(function (error, toby) {
  if (error) return console.error(error);
  else {
    console.log("saved to mongoDB successfully!")
  }
});

fucntion findUser(user) {
  user.find(function (error, users) {
    if(error) return console.error(error)
    else {
      return users;
    }
  });
};
