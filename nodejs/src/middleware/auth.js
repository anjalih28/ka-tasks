const jwt = require('jsonwebtoken');
const { users } = require('../data');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');

    // const user = users.find((user) => user.name === decoded.name);

    const user = users[decoded.name];

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = { name: decoded.name, ...user };

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
