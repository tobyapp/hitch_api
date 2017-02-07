var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database successfully!");
});

var userSchema = mongoose.schema({
  userName: String,
  userAge: Number,
  userEducation: String,
  userGender: String,
  userEmailAddress: String,
  userId: Number,
  updatedAt: { type: Date, default: Date.now},
});

ObjectId.prototype.auto = function(turnOn) {
  if (turnOn) {
    this.default(defaultId);
    this.set(resetId);
  }
  return this;
};
