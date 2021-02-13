const compression = require('compression');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database.js');

const app = express();
app.use(express.json());
app.use(compression());
app.use(cors());

app.use(express.static(path.join(__dirname, '.', 'public')));

app.get('/users/:id', (req, res) => {
  db.Login.find({_id: req.params.id})
  .then((data) => {
    let userName = data[0].userName;
    db.User.find({userName: userName})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(404).json(error);
    })

  })
  .catch((err) => {
    res.status(404).json(err);
  })
})

app.get('/groups/:id', (req, res) => {
  db.Login.find({_id: req.params.id})
  .then((data) => {
    let userName = data[0].userName;
  db.Group.find({userName: userName})
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(404).json(error);
  })
})
.catch((err) => {
  res.status(404).json(err);
})
})

app.get('/restaurants', (req, res) => {
  db.Restaurant.find({})
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(404).json(error);
  })
})

app.get('/signals/:id', (req, res) => {
  db.Login.find({_id: req.params.id})
  .then((data) => {
    let userName = data[0].userName;
  db.Signal.find({userName: userName})
  .then((users) => {
    let reverse = users.reverse();
    res.status(200).json(reverse);
  })
  .catch((error) => {
    res.status(404).json(error);
  })
})
.catch((err) => {
  res.status(404).json(err);
})
})

app.get('/logins', (req, res) => {
  db.Login.find({})
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(404).json(error);
  })
})

app.get('/notifications/:id', (req, res) => {
  db.Login.find({_id: req.params.id})
  .then((data) => {
    let userName = data[0].userName;
  db.Notification.find({toUser: userName})
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(404).json(error);
  })
})
.catch((err) => {
  res.status(404).json(err);
})
})

app.post('/notifications', (req, res) => {
  let body = req.body;
  let inviteFriends = body.inviteFriends;
  if (inviteFriends !== '') {
    inviteFriends.map((friend) => {
      db.Notification.create({recommendation: '', join: body.restaurant, toUser: friend, fromUser: body.user})
    })
  }
  let RecFriends = body.RecFriends;
  if (RecFriends !== '') {
    RecFriends.map((friend) => {
      db.Notification.create({recommendation: body.restaurant, join: '', toUser: friend, fromUser: body.user})
    })

  }
  res.status(200).json('Notifications added!');
})

app.post('/signals', (req, res) => {
  let body = req.body;
  if (body.RecFriends !== '' || body.inviteFriends !== '') {
    db.Signal.create({userName: body.user, signal: body.restaurant, recommendations: [], join: []})
    .then((data) => {
      res.status(200).json(data);
    })
 }else{
   res.status(200).json('no signal input!')
 }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log('Server is listening on: ', PORT);
});