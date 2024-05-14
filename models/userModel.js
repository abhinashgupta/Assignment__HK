var mongoose = require('mongoose');
var validator = require('validator')

var userSchema = mongoose.Schema({
  name : String,
  email : {
    type : String,
    validate: [validator.isEmail, 'email id is not valid']
  },
  mobile : {
    type : String,
    validate : [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'mobile number is not valid']
  },
})


var user = mongoose.model('user', userSchema);
module.exports = user;