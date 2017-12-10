const jwt = require('jwt-simple');
const User = require('./model');
const config = require('../config');

function token(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
}

exports.fetchUser = function(req, res, next) {
  res.send({
    user: {
      id: req.user._id,
      username:req.user.email
    }
  });
}

exports.signin = function(req, res, next) {
  res.send({
    token: token(req.user),
    user: {
      id: req.user._id,
      username:req.user.email
    }
  });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password'
    })
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
       return next(err);
    }

    if (existingUser) {
      return res.status(422).send({
        error: 'Email is already in use'
      });
    }

    const user = new User({ email: email, password: password });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token: token(user) });
    });
  });
}
