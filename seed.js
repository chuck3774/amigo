const db = require('./database.js');

const groups = [
  {userName: 'chuck3774', groupName: 'Boulder Bandits', friends: ['Sunny', 'Hunterontherun']}
];

const users = [
  {userName: 'chuck3774', firstName: 'Chuck', lastName: 'Vaughan', password: 'turkey', friends: ['Sunny', 'Hunterontherun', 'captainZhenya', 'NickShips'], restaurantsHasBeenTo: []},
  {userName: 'Sunny', firstName: 'Kevin', lastName: 'Quinn', password: 'turkey', friends: ['chuck3774', 'Hunterontherun', 'captainZhenya', 'NickShips'], restaurantsHasBeenTo: ['Sherpas', 'The Bumbling Bee']},
  {userName: 'Hunterontherun', firstName: 'Hunter', lastName: 'Schroer', password: 'turkey', friends: ['Sunny', 'chuck3774', 'captainZhenya', 'NickShips'], restaurantsHasBeenTo: ['Sherpas', 'The Bumbling Bee']},
  {userName: 'captainZhenya', firstName: 'Zhenya', lastName: 'Cotita', password: 'turkey', friends: ['Sunny', 'chuck3774', 'Hunterontherun', 'NickShips'], restaurantsHasBeenTo: ['Sherpas', 'The Bumbling Bee', 'Mountain Sun']},
  {userName: 'NickShips', firstName: 'Nick', lastName: 'Barcos', password: 'turkey', friends: ['Sunny', 'chuck3774', 'Hunterontherun', 'captainZhenya'], restaurantsHasBeenTo: ['Sherpas', 'The Bumbling Bee', 'Mountain Sun']},
  {userName: 'IamtheWalrus', firstName: 'John', lastName: 'Lennon', password: 'turkey', friends: ['Sunny', 'chuck3774', 'Hunterontherun', 'captainZhenya'], restaurantsHasBeenTo: ['Sherpas', 'The Bumbling Bee', 'Mountain Sun']},
  {userName: 'weirDancing', firstName: 'Bob', lastName: 'Weir', password: 'turkey', friends: ['Sunny', 'chuck3774', 'Hunterontherun', 'captainZhenya'], restaurantsHasBeenTo: ['Sherpas', 'The Bumbling Bee', 'Mountain Sun']}
];

const restaurants = [
  {name: 'Sherpas', city: 'Boulder', state: 'Colorado' },
  {name: 'The Bumbling Bee', city: 'Boulder', state: 'Colorado' },
  {name: 'Mountain Sun', city: 'Boulder', state: 'Colorado' }
];

const signals = {
  userName: 'chuck3774', signal: 'Sherpas', recommendations: ['The Tofu Aloo is amazing!', 'Get the Sherpa Chai!'], join: ['captainZhenya', 'Sunny']
};

const logins = {
  isLoggedIn: true, userName: 'chuck3774'
};

const notifications = [{
   recommendation: 'Mountain Sun', join: '', toUser: 'chuck3774', fromUser: 'Sunny'
},
{
  recommendation: '', join: 'The Bumbling Bee', toUser: 'chuck3774', fromUser: 'captainZhenya'
}];

db.Group.create(groups)
.then(() => {
  console.log('groups complete!');
})
.catch((error) => {
  console.log(error);
})
db.User.create(users)
.then(() => {
  console.log('users complete!');
})
.catch((error) => {
  console.log(error);
})
db.Restaurant.create(restaurants)
.then(() => {
  console.log('restaurants complete!');
})
.catch((error) => {
  console.log(error);
})
db.Signal.create(signals)
.then(() => {
  console.log('signals complete!');
})
.catch((error) => {
  console.log(error);
})
db.Login.create(logins)
.then(() => {
  console.log('logins complete!');
})
.catch((error) => {
  console.log(error);
})
db.Notification.create(notifications)
.then(() => {
  console.log('users complete!');
  process.exit(0);
})
.catch((error) => {
  console.log(error);
})