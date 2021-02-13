const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amigo', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);

const Group = mongoose.model('Group', {
  userName: String, groupName: String, friends: Array
});
const User = mongoose.model('User', {
  userName: String, firstName: String, lastName: String, password: String, friends: Array, restaurantsHasBeenTo: Array
});
const Restaurant = mongoose.model('Restaurant', {
  name: String, city: String, state: String
});
const Signal = mongoose.model('Signal', {
  userName: String, signal: String, recommendations: Array, join: Array
});
const Login = mongoose.model('Login', {
  isLoggedIn: Boolean, userName: String
});
const Notification = mongoose.model('Notification', {
  recommendation: String, join: String, toUser: String, fromUser: String
});

module.exports = {Group, User, Restaurant, Signal, Login, Notification};