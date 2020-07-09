const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { users, submissions } = require('../data');

const router = express.Router();

router.post('/login', (req, res) => {
  const { name, pwd } = req.body;

  const user = users[name];

  if (user) {
    if (user.pwd === pwd) {
      const token = jwt.sign({ name: req.body.name }, 'secretkey');

      return res.send({ token });
    }
  }

  res.status(401).send('Invalid credentials');
});

router.get('/profile', auth, (req, res) => {
  res.send(req.user);
});

router.post('/profile', auth, (req, res) => {
  const updates = Object.keys(req.body);

  const newName = req.body.name || req.user.name;

  users[newName] = users[req.user.name];

  updates.forEach((update) => {
    users[newName][update] = req.body[update];
  });

  delete users[req.user.name];

  res.send(users[newName]);
});

router.get('/submissions', auth, (req, res) => {
  res.send(submissions);
});

module.exports = router;
